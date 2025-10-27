using Server.Application.DTOs;

namespace Server.Application.Interfaces
{
    public interface ISaleOrderService
    {
        Task<List<SaleOrderDto>> GetSaleOrder();

    }
}
