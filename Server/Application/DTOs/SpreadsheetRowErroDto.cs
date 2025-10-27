namespace Server.Application.DTOs
{
    public class SpreadsheetRowErrorDto
    {
        public int RowNumber { get; set; }
        public SpreadsheetRowDto Row { get; set; }
        public List<string> Errors { get; set; } = new();
    }
}
