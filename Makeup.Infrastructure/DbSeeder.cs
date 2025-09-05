using System.Text.Json;
using Makeup.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Makeup.Infrastructure
{
    // DTO
    public class ProductJsonDto
    {
        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }

    public static class DbSeeder
    {
        public static void SeedFromJson(AppDbContext db, string filePath)
        {
            if (!File.Exists(filePath)) return;

            var json = File.ReadAllText(filePath);
            var rows = JsonSerializer.Deserialize<List<ProductJsonDto>>(json);
            if (rows == null || rows.Count == 0) return;

            var brandNames = rows.Select(r => r.Brand.Trim()).Where(s => s != "").Distinct(StringComparer.OrdinalIgnoreCase).ToList();
            var catNames = rows.Select(r => r.Category.Trim()).Where(s => s != "").Distinct(StringComparer.OrdinalIgnoreCase).ToList();

            var existingBrands = db.Brands.AsNoTracking().ToDictionary(b => b.Name, StringComparer.OrdinalIgnoreCase);
            var existingCats = db.Categories.AsNoTracking().ToDictionary(c => c.Name, StringComparer.OrdinalIgnoreCase);

            var newBrands = brandNames.Where(n => !existingBrands.ContainsKey(n)).Select(n => new Brand { Name = n }).ToList();
            var newCats = catNames.Where(n => !existingCats.ContainsKey(n)).Select(n => new Category { Name = n }).ToList();

            if (newBrands.Count > 0) db.Brands.AddRange(newBrands);
            if (newCats.Count > 0) db.Categories.AddRange(newCats);
            db.SaveChanges();

            var brands = db.Brands.AsNoTracking().ToDictionary(b => b.Name, b => b.Id, StringComparer.OrdinalIgnoreCase);
            var cats = db.Categories.AsNoTracking().ToDictionary(c => c.Name, c => c.Id, StringComparer.OrdinalIgnoreCase);

            var existingProductNames = new HashSet<string>(
                db.Products.AsNoTracking().Select(p => p.Name),
                StringComparer.OrdinalIgnoreCase
            );

            const int maxLengthName = 255;
            const int maxLengthDescription = 500;
            const int maxLengthImageUrl = 500;

            var newProducts = new List<Product>();
            foreach (var r in rows)
            {
                if (existingProductNames.Contains(r.Name)) continue;
                if (!brands.TryGetValue(r.Brand, out var brandId)) continue;
                if (!cats.TryGetValue(r.Category, out var catId)) continue;

                newProducts.Add(new Product
                {
                    Name = string.IsNullOrWhiteSpace(r.Name) ? "Unnamed Product" :
                           (r.Name.Length > maxLengthName ? r.Name[..maxLengthName] : r.Name),
                    Price = 0m,
                    BrandId = brandId,
                    CategoryId = catId,
                    Description = string.IsNullOrWhiteSpace(r.Description) ? "No description" :
                                  (r.Description.Length > maxLengthDescription ? r.Description[..maxLengthDescription] : r.Description),
                    ImageUrl = string.IsNullOrWhiteSpace(r.ImageUrl) ? "" :
                               (r.ImageUrl.Length > maxLengthImageUrl ? r.ImageUrl[..maxLengthImageUrl] : r.ImageUrl)
                });
            }

            if (newProducts.Count > 0)
            {
                db.Products.AddRange(newProducts);
                db.SaveChanges();
            }
        }
    }
}
