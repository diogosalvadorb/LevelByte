using LevelByte.Core.Entities;

namespace LevelByte.Core.Repository
{
    public interface IArticleRepository
    {
        Task<Article?> GetArticleByIdAsync(Guid id);
        Task<List<Article>> GetAllAsync();
        Task<Article> CreateArticleAsync(Article entity);
        Task<Article> UpdateArticleAsync(Article entity);
        Task<bool> DeleteArticleAsync(Guid id);
    }
}
