using Microsoft.EntityFrameworkCore;
using Prometheus;

namespace WeatherApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            // Matches env var ConnectionStrings__DefaultConnection from docker-compose
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Run migrations automatically (creates/updates DB)
            using (var scope = app.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                db.Database.Migrate();
            }

            // Prometheus HTTP metrics for every request
            app.UseHttpMetrics();

            app.UseRouting();

            // Swagger (nice for quick testing)
            app.UseSwagger();
            app.UseSwaggerUI();

            // Do NOT force HTTPS inside the container since we only bind http://+:8080
            // app.UseHttpsRedirection();

            app.UseAuthorization();

            // Simple health endpoint
            app.MapGet("/health", () => Results.Ok("Healthy"));

            app.MapControllers();

            // <-- missing semicolon was here
            app.MapMetrics();

            app.Run();
        }
    }
}
