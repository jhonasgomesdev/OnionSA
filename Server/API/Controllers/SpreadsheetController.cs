using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;
using Server.Application.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpreadsheetController : ControllerBase
    {
        private readonly ILogger<SpreadsheetController> _logger;
        private readonly ISpreadsheetService _spreadsheetService;
        private readonly ISaleOrderService _saleOrderService;
        public SpreadsheetController(ILogger<SpreadsheetController> logger, ISpreadsheetService spreadsheetService, ISaleOrderService saleOrderService)
        {
            _logger = logger;
            _spreadsheetService = spreadsheetService;
            _saleOrderService = saleOrderService;
        }

        [HttpGet("download-model")]
        public IActionResult DownloadModeloPlanilha()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Api", "Files", "PlanilhaModelo.xlsx");

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Arquivo não encontrado.");
            }

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

            return new FileStreamResult(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
            {
                FileDownloadName = Path.GetFileName(filePath)
            };
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadSpreadsheet(IFormFile spreadsheet)
        {
            if (spreadsheet == null || spreadsheet.Length == 0)
                return BadRequest("Nenhum arquivo importado.");

            var extension = Path.GetExtension(spreadsheet.FileName).ToLower();

            if (extension != ".xlsx")
                return BadRequest("Formato invalido. Favor importar um arquivo Excel.");

            try
            {
                _logger.LogInformation("Importando spreadsheet: {FileName}", spreadsheet.FileName);
                using var stream = spreadsheet.OpenReadStream();
                var result = await _spreadsheetService.ProcessSpreadsheetAsync(stream);

                return Ok(new
                {
                    message = "Planilha processada com Sucesso!",
                    validCount = result.ValidRows.Count,
                    invalidCount = result.InvalidRows.Count,
                    errors = result.InvalidRows
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao processar planilha: {FileName}", spreadsheet.FileName);
                return StatusCode(500, "Um erro ocorreu enquanto processava a planilha.");
            }
        }

        [HttpGet("sale-list")]
        public async Task<IActionResult> GetSaleList()
        {
            _logger.LogInformation("Gerando lista de vendas.");
            try
            {
                var orderList = _saleOrderService.GetSaleOrder();
                return Ok(orderList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao gerar lista de vendas.");
                return StatusCode(500, "Um erro ocorreu enquanto gerava a lista de vendas.");
            }
        }
    }
}
