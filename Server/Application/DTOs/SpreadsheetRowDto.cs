using MiniExcelLibs.Attributes;

namespace Server.Application.DTOs
{
    public class SpreadsheetRowDto
    {
        [ExcelColumn(Name = "Documento")]
        public string Document { get; set; }

        [ExcelColumn(Name = "Razão Social")]
        public string CorporateReason { get; set; }
        
        [ExcelColumn(Name = "CEP")]
        public string CEP { get; set; }

        [ExcelColumn(Name = "Produto")]
        public string ProductName { get; set; }

        [ExcelColumn(Name = "Número do pedido")]
        public int OrderNumber { get; set; }

        [ExcelColumn(Name = "Data")]
        public DateTime Date { get; set; }
    }
}
