namespace LevelByte.Core.Entities
{
    public class ArticleLevel
    {
        public ArticleLevel(Guid articleId, int level, string text, string audioUrl, int wordCount)
        {
            Id = Guid.NewGuid();
            ArticleId = articleId;
            Level = ValidateLevel(level);
            Text = ValidateText(text);
            AudioUrl = audioUrl;
            WordCount = wordCount;
        }

        public Guid Id { get; private set; }
        public Guid ArticleId { get; private set; }
        public Article? Article { get; private set; }

        public int Level { get; private set; }
        public string Text { get; private set; } = string.Empty;
        public string AudioUrl { get; private set; } = string.Empty;
        public int WordCount { get; private set; }

        public static ArticleLevel CreateBasic(Guid articleId, string text, string audioUrl)
        {
            return Create(articleId, ArticleGenerationRules.BasicLevel, text, audioUrl);
        }

        public static ArticleLevel CreateAdvanced(Guid articleId, string text, string audioUrl)
        {
            return Create(articleId, ArticleGenerationRules.AdvancedLevel, text, audioUrl);
        }

        public static ArticleLevel Create(Guid articleId, int level, string text, string audioUrl)
        {
            return new ArticleLevel(
                articleId,
                level,
                text,
                audioUrl,
                ArticleGenerationRules.CountWords(text));
        }

        public void UpdateContent(string text, string audioUrl)
        {
            Text = ValidateText(text);
            AudioUrl = audioUrl;
            WordCount = ArticleGenerationRules.CountWords(text);
        }

        private static int ValidateLevel(int level)
        {
            if (!ArticleGenerationRules.IsSupportedLevel(level))
                throw new ArgumentOutOfRangeException(nameof(level), "Unsupported article level.");

            return level;
        }

        private static string ValidateText(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                throw new ArgumentException("Article level text is required.", nameof(text));

            return text.Trim();
        }
    }
}
