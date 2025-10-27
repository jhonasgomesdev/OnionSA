using Server.Application.DTOs;

namespace Server.Application.Interfaces
{
    public interface ISpreadsheetService
    {
        Task<SpreadsheetProcessingResult> ProcessSpreadsheetAsync(Stream fileStream);
    }
}
