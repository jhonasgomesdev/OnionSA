namespace Server.Application.DTOs
{
    public class SaleOrderDto
    {
        public string Document { get; set; }
        public string ClientName { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public DateOnly DeliveryDate { get; set; }
        public string Region { get; set; }
    }
}
