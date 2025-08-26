using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum Role
{
    Admin,
    Customer,
    MakeUpArtist
}

public class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(15)]
    public string Username { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MaxLength(255)]
    public string PasswordHash { get; set; }

    [Required]
    public Role Role { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

[Table("Products")]
public class Product
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; }

    [Required]
    public decimal Price { get; set; }

    [MaxLength(500)]
    public string Description { get; set; }

    [MaxLength(255)]
    public string ImageUrl { get; set; }

    [Required]
    public int BrandId { get; set; }
    public Brand Brand { get; set; }

    [Required]
    public int CategoryId { get; set; }
    public Category Category { get; set; }

    public ICollection<OrderItem> OrderItems { get; set; }
}

[Table("Categories")]
public class Category
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(50)]
    public string Name { get; set; }

    [MaxLength(200)]
    public string Description { get; set; }

    public ICollection<Product> Products { get; set; }
}

public enum Status
{
    Pending, 
    Paid, Shipped, 
    Delivered, 
    Cancelled
}

[Table("Orders")]
public class Order
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }
    public User User { get; set; }

    [Required]
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    [Required]
    public decimal TotalPrice { get; set; }

    public Status Status { get; set; } = Status.Pending;

    public ICollection<OrderItem> Items { get; set; }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Reviews")]
public class Review
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int ProductId { get; set; }
    public Product Product { get; set; }

    [Required]
    public int UserId { get; set; }
    public User User { get; set; }

    [Required]
    [Range(1, 5)]
    public int Rating { get; set; }

    [MaxLength(500)]
    public string Comment { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

[Table("OrderItems")]
public class OrderItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int OrderId { get; set; }
    public Order Order { get; set; }

    [Required]
    public int ProductId { get; set; }
    public Product Product { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public decimal Price { get; set; }
}




