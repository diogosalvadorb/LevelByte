namespace LevelByte.Core.Services
{
    public interface IAiService
    {
        Task<string> GenerateAiArticleTextAsync(string content, int level);
        Task<string> GenerateAudioAsync(string text, string articleTitle, int level, string voice = "onyx");
        Task<string> UploadImageAsync(Stream imageStream, string fileName, string contentType, string articleTitle);
    }
}
