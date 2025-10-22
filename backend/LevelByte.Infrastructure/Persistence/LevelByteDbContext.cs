using LevelByte.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace LevelByte.Infrastructure.Persistence
{
    public class LevelByteDbContext : DbContext
    {
        public LevelByteDbContext(DbContextOptions<LevelByteDbContext> options) : base(options) { }

        public DbSet<Article> Articles { get; set; }
        public DbSet<ArticleLevel> ArticleLevels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
