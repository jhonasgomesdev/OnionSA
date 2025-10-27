using Server.Domain.Entities;

namespace Server.Application.Interfaces
{
    public interface IOrderProductService
    {
        public Task<OrderProduct> RegisterOrderProduct(int orderId, int productId);
    }
}
