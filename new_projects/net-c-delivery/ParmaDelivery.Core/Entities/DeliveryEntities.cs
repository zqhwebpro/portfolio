namespace ParmaDelivery.Core.Entities;

public class MenuItem
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public List<string> Modifiers { get; set; } = new();
}

public class OrderItem
{
    public string MenuItemId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; } = 1;
    public decimal UnitPrice { get; set; }
    public List<string> SelectedModifiers { get; set; } = new();
}

public class DeliveryOrder
{
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string DeliveryAddress { get; set; } = string.Empty;
    public string SpecialInstructions { get; set; } = string.Empty;
    public List<OrderItem> Items { get; set; } = new();
    public decimal Subtotal { get; set; }
    public decimal DeliveryFee { get; set; } = 3.99m;
    public decimal Tip { get; set; }
    public decimal TotalAmount => Subtotal + DeliveryFee + Tip;
    public string Status { get; set; } = "Received";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
