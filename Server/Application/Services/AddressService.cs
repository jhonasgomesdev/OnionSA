using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Server.Application.Interfaces;
using Server.Domain.DTOs;
using System.Text.Json;

namespace Server.Application.Services
{
    public class AddressService : IAddressService
    {
        private readonly string URL = "https://viacep.com.br/ws/";
        private readonly HttpClient _httpClient;
        private readonly ILogger<AddressService> _logger;
        private readonly IMemoryCache _cache;
        private static readonly SemaphoreSlim _semaphore = new SemaphoreSlim(1, 1);
        private static DateTime _lastRequestTime = DateTime.MinValue;
        private readonly TimeSpan _cacheExpiration = TimeSpan.FromHours(24);
        private readonly TimeSpan _rateLimitDelay = TimeSpan.FromMilliseconds(1000);

        public AddressService(HttpClient httpClient, ILogger<AddressService> logger, IMemoryCache cache)
        {
            _httpClient = httpClient;
            _logger = logger;
            _cache = cache;

            _httpClient.Timeout = TimeSpan.FromSeconds(10);
        }

        public async Task<AddressDto?> GetAddress(string cep)
        {
            var cacheKey = $"cep_{cep}";

            if (_cache.TryGetValue(cacheKey, out AddressDto? cachedAddress))
            {
                _logger.LogDebug("CEP {CEP} encontrado no cache", cep);

                return cachedAddress;
            }

            await _semaphore.WaitAsync();

            try
            {
                var timeSinceLastRequest = DateTime.UtcNow - _lastRequestTime;

                await ApplyRateLimit();

                _logger.LogInformation("Consultando ViaCEP para CEP: {CEP}", cep);

                using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
                var response = await _httpClient.GetAsync($"{URL}{cep}/json/", cts.Token);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning("ViaCEP retornou status {StatusCode} para CEP {CEP}", response.StatusCode, cep);
                    return null;
                }

                var content = await response.Content.ReadAsStringAsync(cts.Token);

                if (content.Contains("\"erro\": true"))
                {
                    _logger.LogWarning("CEP {CEP} não encontrado no ViaCEP", cep);
                    return null;
                }

                var result = JsonSerializer.Deserialize<AddressDto>(content, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (result == null)
                {
                    _logger.LogWarning("Falha ao desserializar resposta do ViaCEP para CEP {CEP}", cep);
                    return null;
                }

                if (string.IsNullOrWhiteSpace(result.UF))
                {
                    _logger.LogWarning("ViaCEP retornou dados incompletos para CEP {CEP}", cep);
                    return null;
                }

                _cache.Set(cacheKey, result, _cacheExpiration);
                _logger.LogInformation("CEP {CEP} processado com sucesso: {Cidade}/{UF}", cep, result.Locality, result.UF);

                return result;
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Erro de conexão com ViaCEP para CEP {CEP}", cep);
                return null;
            }
            catch (TaskCanceledException ex)
            {
                _logger.LogError(ex, "Timeout na consulta do ViaCEP para CEP {CEP}", cep);
                return null;
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Erro ao desserializar resposta do ViaCEP para CEP {CEP}", cep);
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro inesperado ao consultar CEP {CEP}", cep);
                return null;
            }
            finally
            {
                _semaphore.Release();
            }
        }

        private async Task ApplyRateLimit()
        {
            var timeSinceLastRequest = DateTime.UtcNow - _lastRequestTime;
            if (timeSinceLastRequest < _rateLimitDelay)
            {
                var delay = _rateLimitDelay - timeSinceLastRequest;
                _logger.LogDebug("Aguardando {Delay}ms devido ao rate limiting", delay.TotalMilliseconds);
                await Task.Delay(delay);
            }
            _lastRequestTime = DateTime.UtcNow;
        }
    }
}
