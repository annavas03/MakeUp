using Microsoft.EntityFrameworkCore;

namespace Makeup.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // тут буде dbset 
    }
}
