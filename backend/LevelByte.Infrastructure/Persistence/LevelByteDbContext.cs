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
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            // Cria um usuario inicial
            var adminUser = new User(
                fullName: "Administrador",
                email: "admin@levelsbyte.com",
                passwordHash: "e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7",
                role: "Admin",
                id: new Guid("b77d51d8-ab9f-49af-9a48-57f710077696")
            );

            modelBuilder.Entity<User>().HasData(adminUser);
        }
    }
}
