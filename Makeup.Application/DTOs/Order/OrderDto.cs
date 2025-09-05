using Makeup.Domain.Entities;

public class OrderDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } 
    public DateTime OrderDate { get; set; }
    public decimal TotalPrice { get; set; }
    public Status Status { get; set; }
    public List<OrderItemDto> Items { get; set; } = new();
}