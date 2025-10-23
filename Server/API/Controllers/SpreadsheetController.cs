using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpreadsheetController : ControllerBase
    {
        private readonly ILogger<SpreadsheetController> _logger;
        private readonly SpreadsheetService _spreadsheetService;
        public SpreadsheetController(ILogger<SpreadsheetController> logger, SpreadsheetService spreadsheetService)
        {
            _logger = logger;
            _spreadsheetService = spreadsheetService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            _logger.LogInformation("GET request received for PlanilhaController");
            return Ok("SpreadsheetController is working!");
        }

        [HttpPost]
        public async Task<IActionResult> UploadSpreadsheet(IFormFile spreadsheetDto)
        {
            await _spreadsheetService.UploadSpreadsheet(spreadsheetDto);
            _logger.LogInformation("POST request received for PlanilhaController");
            return Ok("POST request to SpreadsheetController received!");
        }
    }
}
