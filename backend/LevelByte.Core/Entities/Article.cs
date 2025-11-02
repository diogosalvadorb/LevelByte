namespace LevelByte.Core.Entities
{
    public class Article
    {
        public Article(string title, string? imageUrl = null)
        {
            Id = Guid.NewGuid();
            Title = title;
            ImageUrl = imageUrl;
            CreatedAt = DateTime.UtcNow;
            Levels = new List<ArticleLevel>();
        }

        public Guid Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public string? ImageUrl { get; private set; }
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

        public void UpdateImage(string? imageUrl)
        {
            ImageUrl = imageUrl;
        }
    }
}