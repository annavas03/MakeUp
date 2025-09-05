using Makeup.Application.Interfaces;
using Makeup.Domain.Entities;
using Makeup.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Makeup.Application.Services
{
    public class BrandService : IBrandService
    {
        private readonly AppDbContext _context;

        public BrandService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Brand>> GetAllAsync()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<Brand?> GetByIdAsync(int id)
        {
            return await _context.Brands
                                 .Include(b => b.Products)
                                 .ThenInclude(p => p.Category)
                                 .FirstOrDefaultAsync(b => b.Id == id);
        }
    }
}
