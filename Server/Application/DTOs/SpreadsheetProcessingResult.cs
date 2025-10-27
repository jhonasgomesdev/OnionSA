namespace Server.Application.DTOs
{
    public class SpreadsheetProcessingResult
    {
        public List<SpreadsheetRowDto> ValidRows { get; set; } = new();
        public List<SpreadsheetRowErrorDto> InvalidRows { get; set; } = new();
    }
}
