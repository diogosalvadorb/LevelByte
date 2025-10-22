using LevelByte.Core.Entities;
using LevelByte.Core.Repository;
using Microsoft.EntityFrameworkCore;

namespace LevelByte.Infrastructure.Persistence.Repository
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly LevelByteDbContext _context;
        public ArticleRepository(LevelByteDbContext context)
        {
            _context = context;
        }

        public async Task<List<Article>> GetAllAsync()
        {
            return await _context.Articles
                .Include(a => a.Levels)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();
        }

        public async Task<Article?> GetArticleByIdAsync(Guid id)
        {
            return await _context.Articles
                .Include(a => a.Levels)
                .SingleOrDefaultAsync(a => a.Id == id);
        }

        public async Task<Article> CreateArticleAsync(Article entity)
        {
            await _context.Articles.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }
    }
}
