using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Makeup.Infrastructure;
using Makeup.Domain.Entities;
using Makeup.Api.DTOs;

namespace Makeup.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;
        public UsersController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _db.Users
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var u = await _db.Users
                .Where(u => u.Id == id)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email
                })
                .FirstOrDefaultAsync();

            return u is null ? NotFound() : Ok(u);
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserDto dto)
        {
            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            dto.Id = user.Id;
            return CreatedAtAction(nameof(Get), new { id = user.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UserDto dto)
        {
            if (id != dto.Id) return BadRequest();

            var user = await _db.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.Username = dto.Username;
            user.Email = dto.Email;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var u = await _db.Users.FindAsync(id);
            if (u == null) return NotFound();

            _db.Users.Remove(u);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class BrandsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public BrandsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var brands = await _db.Brands
                .Select(b => new BrandDto
                {
                    Id = b.Id,
                    Name = b.Name,
                    Description = b.Description
                })
                .ToListAsync();

            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var b = await _db.Brands
                .Where(b => b.Id == id)
                .Select(b => new BrandDto
                {
                    Id = b.Id,
                    Name = b.Name,
                    Description = b.Description
                })
                .FirstOrDefaultAsync();

            return b is null ? NotFound() : Ok(b);
        }

        [HttpPost]
        public async Task<IActionResult> Post(BrandDto dto)
        {
            var brand = new Brand
            {
                Name = dto.Name,
                Description = dto.Description
            };

            _db.Brands.Add(brand);
            await _db.SaveChangesAsync();

            dto.Id = brand.Id;
            return CreatedAtAction(nameof(Get), new { id = brand.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, BrandDto dto)
        {
            if (id != dto.Id) return BadRequest();

            var brand = await _db.Brands.FindAsync(id);
            if (brand == null) return NotFound();

            brand.Name = dto.Name;
            brand.Description = dto.Description;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var b = await _db.Brands.FindAsync(id);
            if (b == null) return NotFound();

            _db.Brands.Remove(b);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly AppDbContext _db;
        public CategoriesController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categories = await _db.Categories
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .ToListAsync();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var c = await _db.Categories
                .Where(c => c.Id == id)
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .FirstOrDefaultAsync();

            return c is null ? NotFound() : Ok(c);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CategoryDto dto)
        {
            var category = new Category
            {
                Name = dto.Name
            };

            _db.Categories.Add(category);
            await _db.SaveChangesAsync();

            dto.Id = category.Id;
            return CreatedAtAction(nameof(Get), new { id = category.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, CategoryDto dto)
        {
            if (id != dto.Id) return BadRequest();

            var category = await _db.Categories.FindAsync(id);
            if (category == null) return NotFound();

            category.Name = dto.Name;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var c = await _db.Categories.FindAsync(id);
            if (c == null) return NotFound();

            _db.Categories.Remove(c);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ProductsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] int? categoryId, [FromQuery] int? brandId)
        {
            var q = _db.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .AsQueryable();

            if (categoryId.HasValue) q = q.Where(p => p.CategoryId == categoryId.Value);
            if (brandId.HasValue) q = q.Where(p => p.BrandId == brandId.Value);

            var products = await q
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl,
                    BrandId = p.BrandId,
                    BrandName = p.Brand.Name,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name
                })
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var p = await _db.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .Where(p => p.Id == id)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    ImageUrl = p.ImageUrl,
                    BrandId = p.BrandId,
                    BrandName = p.Brand.Name,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name
                })
                .FirstOrDefaultAsync();

            return p is null ? NotFound() : Ok(p);
        }

        [HttpPost]
        public async Task<IActionResult> Post(ProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                ImageUrl = dto.ImageUrl,
                BrandId = dto.BrandId,
                CategoryId = dto.CategoryId
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            dto.Id = product.Id;
            return CreatedAtAction(nameof(Get), new { id = product.Id }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ProductDto dto)
        {
            if (id != dto.Id) return BadRequest();

            var product = await _db.Products.FindAsync(id);
            if (product == null) return NotFound();

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.ImageUrl = dto.ImageUrl;
            product.BrandId = dto.BrandId;
            product.CategoryId = dto.CategoryId;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var p = await _db.Products.FindAsync(id);
            if (p == null) return NotFound();

            _db.Products.Remove(p);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _db;
        public OrdersController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var orders = await _db.Orders
                .Include(o => o.User)
                .Include(o => o.Items).ThenInclude(i => i.Product)
                .Select(o => new OrderDto
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    Username = o.User.Username,
                    OrderDate = o.OrderDate,
                    Status = o.Status.ToString(),
                    TotalPrice = o.TotalPrice,
                    Items = o.Items.Select(i => new OrderItemDto
                    {
                        Id = i.Id,
                        ProductId = i.ProductId,
                        ProductName = i.Product.Name,
                        Price = i.Price,
                        Quantity = i.Quantity
                    }).ToList()
                })
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var o = await _db.Orders
                .Include(o => o.User)
                .Include(o => o.Items).ThenInclude(i => i.Product)
                .Where(o => o.Id == id)
                .Select(o => new OrderDto
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    Username = o.User.Username,
                    OrderDate = o.OrderDate,
                    Status = o.Status.ToString(),
                    TotalPrice = o.TotalPrice,
                    Items = o.Items.Select(i => new OrderItemDto
                    {
                        Id = i.Id,
                        ProductId = i.ProductId,
                        ProductName = i.Product.Name,
                        Price = i.Price,
                        Quantity = i.Quantity
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            return o is null ? NotFound() : Ok(o);
        }

        public record CreateOrderItemDto(int ProductId, int Quantity, decimal? Price);
        public record CreateOrderDto(int UserId, List<CreateOrderItemDto> Items);

        [HttpPost]
        public async Task<IActionResult> Post(CreateOrderDto dto)
        {
            if (!await _db.Users.AnyAsync(u => u.Id == dto.UserId))
                return BadRequest("User does not exist");

            if (dto.Items == null || dto.Items.Count == 0)
                return BadRequest("Order must contain at least one item");

            var productIds = dto.Items.Select(i => i.ProductId).Distinct().ToList();
            var products = await _db.Products
                .Where(p => productIds.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id);

            if (products.Count != productIds.Count)
                return BadRequest("Some products do not exist");

            var order = new Order
            {
                UserId = dto.UserId,
                OrderDate = DateTime.UtcNow,
                Status = Status.Pending,
                Items = new List<OrderItem>()
            };

            foreach (var i in dto.Items)
            {
                var product = products[i.ProductId];
                var unitPrice = i.Price ?? product.Price;
                if (unitPrice < 0 || i.Quantity <= 0)
                    return BadRequest("Invalid item price/quantity");

                order.Items.Add(new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    Price = unitPrice
                });
            }

            order.TotalPrice = order.Items.Sum(it => it.Price * it.Quantity);

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = order.Id }, order.Id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var o = await _db.Orders.FindAsync(id);
            if (o == null) return NotFound();

            _db.Orders.Remove(o);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
