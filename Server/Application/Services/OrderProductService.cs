using Microsoft.EntityFrameworkCore;
using Server.Domain.Entities;
using Server.Application.Interfaces;
using Server.Infrastructure.Interfaces;

namespace Server.Application.Services
{
    public class OrderProductService : IOrderProductService
    {
        private readonly IAppDbContext _dbContext;
        public OrderProductService(IAppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<OrderProduct> RegisterOrderProduct(int orderId, int productId) 
        {
            var orderProduct = await _dbContext.OrderProducts.AsNoTracking()
                .FirstOrDefaultAsync(op => op.OrderId == orderId && op.ProductId == productId);

            if (orderProduct == null) 
            {
                orderProduct = new OrderProduct 
                {
                    OrderId = orderId,
                    ProductId = productId
                };

                _dbContext.OrderProducts.Add(orderProduct);
                await _dbContext.SaveChangesAsync();
            }

            return orderProduct;
        }
    }
}
