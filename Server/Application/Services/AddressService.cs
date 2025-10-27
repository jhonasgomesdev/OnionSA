using Microsoft.EntityFrameworkCore.Storage.Json;
using Server.Application.Interfaces;
using Server.Domain.Entities;
using System.Text.Json;

namespace Server.Application.Services
{
    public class AddressService : IAddressService
    {
        private readonly string URL = "https://viacep.com.br/ws/";
        private readonly HttpClient _httpClient;
        public AddressService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<Address> GetAddress(string cep)
        {
            var response = await _httpClient.GetAsync($"{URL}{cep}/json/");
            
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Erro ao consultar o CEP. {response.StatusCode}");
            }

            var stream = await response.Content.ReadAsStreamAsync();
            var result = await JsonSerializer.DeserializeAsync<Address>(stream);

            return result;
        }
    }
}
