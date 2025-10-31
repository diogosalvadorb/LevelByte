namespace LevelByte.Core.Services
{
    public interface IAiService
    {
        Task<string> GenerateAiArticleTextAsync(string content, int level);
        Task<string> GenerateAudioAsync(string text, string voice = "onyx");
    }
}
