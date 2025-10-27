using Server.Domain.Entities;
using Server.Application.DTOs;
using Microsoft.EntityFrameworkCore;
using Server.Application.Interfaces;
using Server.Infrastructure.Interfaces;

namespace Server.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IAppDbContext _dbContext;
        public ProductService(IAppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<Product> FindProduct(SpreadsheetRowDto row) 
        {
            var product = await _dbContext.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Name == row.ProductName);

            if (product is null) throw new Exception($"Produto '{row.ProductName}' não encontrado.");

            return product;

        }
    }
}
