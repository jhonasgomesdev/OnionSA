using Server.Application.DTOs;

namespace Server.Application.Interfaces
{
    public interface ILastSpreadsheetService
    {
        Task RegisterLastSpreadsheet(IEnumerable<SpreadsheetRowDto> rows);
    }
}
