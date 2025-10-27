using Server.Domain.Entities;
using Server.Application.DTOs;

namespace Server.Application.Interfaces
{
    public interface IProductService
    {
        public Task<Product> FindProduct(SpreadsheetRowDto row);
    }
}
