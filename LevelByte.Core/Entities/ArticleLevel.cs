namespace LevelByte.Core.Entities
{
    public class ArticleLevel 
    {
        public Guid Id { get; private set; }
        public Guid ArticleId { get; private set; }
        public Article? Article { get; private set; }

        public int Level { get; private set; }
        public string Text { get; private set; } = string.Empty;
        public string AudioUrl { get; private set; } = string.Empty;
        public int WordCount { get; private set; }
    }
}
