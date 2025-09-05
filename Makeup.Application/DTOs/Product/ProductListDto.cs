﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Makeup.Application.DTOs.Product
{
    public class ProductListDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string BrandName { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
    }

}
