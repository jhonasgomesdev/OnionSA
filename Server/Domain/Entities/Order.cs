namespace Server.Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateOnly Data { get; set; }
        public string ClientId { get; set; }
        public Client Client { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }
}
