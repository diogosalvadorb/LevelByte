namespace LevelByte.Core.Entities
{
    public class ArticleLevel 
    {
        public ArticleLevel(Guid articleId, int level, string text, string audioUrl, int wordCount)
        {
            Id = Guid.NewGuid();
            ArticleId = articleId;
            Level = level;
            Text = text;
            AudioUrl = audioUrl;
            WordCount = wordCount;
        }

        public Guid Id { get; private set; }
        public Guid ArticleId { get; set; }
        public Article? Article { get; set; }

        public int Level { get; private set; }
        public string Text { get; private set; } = string.Empty;
        public string AudioUrl { get; private set; } = string.Empty;
        public int WordCount { get; private set; }

        public void UpdateContent(string text, string audioUrl, int wordCount)
        {
            Text = text;
            AudioUrl = audioUrl;
            WordCount = wordCount;
        }
    }
}
