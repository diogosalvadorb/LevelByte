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
                .AsNoTracking()
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

        public async Task<Article> UpdateArticleAsync(Article entity)
        {
            _context.Articles.Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<bool> DeleteArticleAsync(Guid id)
        {
            var article = await GetArticleByIdAsync(id);

            if (article == null)
                return false;

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
