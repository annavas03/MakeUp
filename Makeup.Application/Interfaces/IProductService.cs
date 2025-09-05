using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Makeup.Application.DTOs.Product;

namespace Makeup.Application.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductListDTO>> GetAllAsync();          
        Task<ProductDetailsDTO?> GetByIdAsync(int id);   
    }
}
