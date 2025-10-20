using Microsoft.EntityFrameworkCore;

namespace WeatherApp
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options)
        {
        }

        // Register your model
        public DbSet<Weather> Weathers { get; set; }

    }
}
