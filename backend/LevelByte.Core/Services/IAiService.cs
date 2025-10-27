namespace LevelByte.Core.Services
{
    public interface IAiService
    {
        Task<string> GenerateAiArticleTextAsync(string content, int level);
    }
}
