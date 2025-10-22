namespace LevelByte.Core.Entities
{
    public class Article
    {
        public Guid Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public DateTime CreatedAt { get; private set; }

        public List<ArticleLevel> Levels { get; set; } = new();
    }
}
