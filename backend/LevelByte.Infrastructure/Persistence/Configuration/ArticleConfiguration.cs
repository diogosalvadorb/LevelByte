using LevelByte.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LevelByte.Infrastructure.Persistence.Configuration
{
    public class ArticleConfiguration : IEntityTypeConfiguration<Article>
    {
        public void Configure(EntityTypeBuilder<Article> builder)
        {
            builder.Property(a => a.Title)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(a => a.ImageData)
                   .HasColumnType("bytea");

            builder.Property(a => a.ImageContentType)
                   .HasMaxLength(100);

            builder.HasMany(a => a.Levels)
                .WithOne(l => l.Article!)
                .HasForeignKey(l => l.ArticleId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
