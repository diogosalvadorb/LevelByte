namespace LevelByte.Core.Entities
{
    public class Article
    {
        public Article(string title, byte[]? imageData = null, string? imageContentType = null)
        {
            Id = Guid.NewGuid();
            Title = title;
            ImageData = imageData;
            ImageContentType = imageContentType;
            CreatedAt = DateTime.UtcNow;
            Levels = new List<ArticleLevel>();
        }

        public Guid Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public byte[]? ImageData { get; private set; }
        public string? ImageContentType { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public List<ArticleLevel> Levels { get; set; } = new();

        public void AddLevel(ArticleLevel level)
        {
            Levels.Add(level);
        }

        public void UpdateTitle(string title)
        {
            Title = title;
        }

        public void UpdateImage(byte[]? imageData, string? imageContentType)
        {
            ImageData = imageData;
            ImageContentType = imageContentType;
        }
    }
}
