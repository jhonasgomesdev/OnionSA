using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Application.DTOs;
using Server.Application.Interfaces;
using Server.Infrastructure.Interfaces;

namespace Server.Application.Services
{
    public class SaleOrderService : ISaleOrderService
    {
        private readonly IAddressService _addressService;
        private readonly IProductService _productService;
        private readonly IAppDbContext _dbContext;
        private readonly IMapper _mapper;
        public SaleOrderService(IAddressService addressService, IProductService productService, IAppDbContext dbContext, IMapper mapper)
        {
            _addressService = addressService;
            _productService = productService;
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<SaleOrderDto>> GetSaleOrder()
        {
            var lastSpreadsheet = await _dbContext.LastSpreadsheets.ToListAsync();

            if (!lastSpreadsheet.Any())
                throw new Exception("Erro ao obter lista de vendas.");

            var orderSales = new List<SaleOrderDto>();
            
            foreach (var order in lastSpreadsheet)
            {
                var orderMap = _mapper.Map<SpreadsheetRowDto>(order);
                var product = await _productService.FindProduct(orderMap);

                var productContent = await GetProductContent(orderMap, product.Price);

                orderSales.Add(productContent);
            }

            return orderSales;
        }

        private async Task<SaleOrderDto> GetProductContent(SpreadsheetRowDto order, decimal price)
        {
            var adress = await _addressService.GetAddress(order.CEP);
            var region = await _addressService.GetRegion(order.CEP);

            return new SaleOrderDto
            {
                ClientName = order.CorporateReason,
                ProductName = order.ProductName,
                Price = price,
                DeliveryDate = await _addressService.GetDeliveryDate(order.CEP),
                Region = await _addressService.GetRegion(order.CEP)
            };
        }
    }
}
