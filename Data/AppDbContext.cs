using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Text.Json;
using StarWarsMinimalApi.Models; 

namespace StarWarsMinimalApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Starship> Starships { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var stringArrayConverter = new ValueConverter<string[], string>(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<string[]>(v, (JsonSerializerOptions?)null) ?? Array.Empty<string>());

            var stringArrayComparer = new ValueComparer<string[]>(
                (c1, c2) => (c1 ?? Array.Empty<string>()).SequenceEqual(c2 ?? Array.Empty<string>()),
                c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v != null ? v.GetHashCode() : 0)),
                c => c.ToArray()
            );

            modelBuilder.Entity<Starship>()
                .Property(s => s.Films)
                .HasConversion(stringArrayConverter)
                .Metadata.SetValueComparer(stringArrayComparer);

            modelBuilder.Entity<Starship>()
                .Property(s => s.HyperdriveRating)
                .HasPrecision(5, 2);

        }
    }
}
