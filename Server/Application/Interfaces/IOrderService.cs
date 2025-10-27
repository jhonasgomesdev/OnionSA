using Server.Application.DTOs;
using Server.Domain.Entities;

namespace Server.Application.Interfaces
{
    public interface IOrderService
    {
        public Task<Order> RegisterOrder(SpreadsheetRowDto row);
    }
}
