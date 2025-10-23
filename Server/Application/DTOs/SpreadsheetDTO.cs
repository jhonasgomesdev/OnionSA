using Server.Domain.Entities;

namespace Server.Application.DTOs
{
    public class SpreadsheetDTO
    {
        public string Document { get; set; }
        public string CorporateReason { get; set; }
        public string CEP { get; set; }
        public string Product { get; set; }
        public int OrderNumber { get; set; }
        public DateOnly Date { get; set; }
    }
}
