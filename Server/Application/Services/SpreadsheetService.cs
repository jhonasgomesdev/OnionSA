using Server.Application.DTOs;
using Server.Infrastructure.Data;

namespace Server.Application.Services
{
    public class SpreadsheetService
    {
        private readonly AppDbContext _dbContext;
        public SpreadsheetService(AppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task UploadSpreadsheet(IFormFile spreadsheetDto)
        {

            // Implement the logic to process and store the spreadsheet data
            await Task.CompletedTask;
        }
    }
}
