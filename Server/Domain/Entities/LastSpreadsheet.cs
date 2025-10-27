using MiniExcelLibs.Attributes;

namespace Server.Domain.Entities
{
    public class LastSpreadsheet
    {
        public int Id { get; set; }
        public string Document { get; set; }
        public string CorporateReason { get; set; }
        public string CEP { get; set; }
        public string ProductName { get; set; }
        public int OrderNumber { get; set; }
        public DateOnly Date { get; set; }
    }
}
