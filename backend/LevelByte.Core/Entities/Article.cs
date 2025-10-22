namespace LevelByte.Core.Entities
{
    public class Article
    {
        public Article(string title)
        {
            Id = Guid.NewGuid();
            Title = title;
            CreatedAt = DateTime.UtcNow;
            Levels = new List<ArticleLevel>();
        }

        public Guid Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public DateTime CreatedAt { get; private set; }

        public List<ArticleLevel> Levels { get; set; } = new();

        public void AddLevel(ArticleLevel level)
        {
            Levels.Add(level);
        }
    }
}
