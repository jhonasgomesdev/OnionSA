using Server.Application.DTOs;

namespace Server.Application.Interfaces
{
    public interface ISaleOrderService
    {
        Task<SaleOrderDto> GetSaleOrder();
        Task<SaleOrderDto> GetProductContent(SpreadsheetRowDto order, decimal price);


    }
}
