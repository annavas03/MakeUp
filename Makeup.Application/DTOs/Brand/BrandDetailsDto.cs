using Makeup.Application.DTOs.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Makeup.Application.DTOs.Brand
{
    public class BrandDetailsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<ProductListDTO> Products { get; set; } = new List<ProductListDTO>();
    }

}
