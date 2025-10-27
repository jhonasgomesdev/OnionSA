using Server.Domain.Entities;
using Server.Application.DTOs;

namespace Server.Application.Interfaces
{
    public interface IClientService
    {
        public Task<Client> RegisterClient(SpreadsheetRowDto row);
    }
}
