using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Application.DTOs;
using Server.Application.Interfaces;
using Server.Application.Utils;
using Server.Domain.DTOs;
using Server.Infrastructure.Interfaces;
using System.Runtime.ConstrainedExecution;

namespace Server.Application.Services
{
    public class SaleOrderService : ISaleOrderService
    {
        private readonly IAddressService _addressService;
        private readonly IProductService _productService;
        private readonly IAppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger<SaleOrderService> _logger;
        public SaleOrderService(IAddressService addressService, IProductService productService, IAppDbContext dbContext, IMapper mapper, ILogger<SaleOrderService> logger)
        {
            _addressService = addressService;
            _productService = productService;
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<List<SaleOrderDto>> GetSaleOrder()
        {
            var lastSpreadsheet = await _dbContext.LastSpreadsheets.ToListAsync();

            if (!lastSpreadsheet.Any())
                throw new Exception("Erro ao obter lista de vendas.");

            var orderSales = new List<SaleOrderDto>();
            var addresses = new List<AddressDto>();

            foreach (var order in lastSpreadsheet)
            {
                var orderMap = _mapper.Map<SpreadsheetRowDto>(order);
                var product = await _productService.FindProduct(orderMap);

                var productContent = await GetProductContent(orderMap, product.Price);

                if (productContent == null) continue;

                orderSales.Add(productContent);
            }

            return orderSales;
        }

        private async Task<SaleOrderDto> GetProductContent(SpreadsheetRowDto order, decimal productPrice)
        {
            try 
            {
                var address = await _addressService.GetAddress(order.CEP);
                
                if (address.UF == null) return null;
                
                var region = address.Regiao;
                var deliveryCost = RegionProcessor.GetDeliveryCost(region, address.Locality);
                var deliveryTime = RegionProcessor.GetDeliveryTime(region, address.Locality);

                var totalPrice = productPrice + (productPrice * deliveryCost);

                var deliveryDate = DateOnly.FromDateTime(order.Date).AddDays(deliveryTime);

                return new SaleOrderDto
                {
                    Document = order.Document,
                    ClientName = order.CorporateReason,
                    ProductName = order.ProductName,
                    Price = totalPrice,
                    DeliveryDate = deliveryDate,
                    Region = region
                };
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Erro ao consumir api ViaCep");
                return null;
            }
        }
    }
}
