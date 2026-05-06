namespace LevelByte.Core.Entities
{
    public class Article
    {
        private readonly List<ArticleLevel> _levels = new();
        public Article(string title, string? imageUrl = null)
        {
            Id = Guid.NewGuid();
            Title = ValidateTitle(title);
            ImageUrl = imageUrl;
            CreatedAt = DateTime.UtcNow;
        }

        public Guid Id { get; private set; }
        public string Title { get; private set; } = string.Empty;
        public string? ImageUrl { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public IReadOnlyCollection<ArticleLevel> Levels => _levels.AsReadOnly();

        public static Article CreateWithGeneratedLevels(
            string title,
            string? imageUrl,
            string basicText,
            string advancedText,
            string basicAudioUrl,
            string advancedAudioUrl)
        {
            var article = new Article(title, imageUrl);

            article.AddLevel(ArticleLevel.CreateBasic(article.Id, basicText, basicAudioUrl));
            article.AddLevel(ArticleLevel.CreateAdvanced(article.Id, advancedText, advancedAudioUrl));

            return article;
        }

        public void AddLevel(ArticleLevel level)
        {
            if (_levels.Any(existingLevel => existingLevel.Level == level.Level))
                throw new InvalidOperationException($"Article already has level {level.Level}.");

            _levels.Add(level);
        }

        public ArticleLevel? GetLevel(Guid levelId)
        {
            return _levels.FirstOrDefault(level => level.Id == levelId);
        }

        public void UpdateLevel(Guid levelId, string text, string audioUrl)
        {
            var level = GetLevel(levelId)
                ?? throw new InvalidOperationException("Article level not found.");

            level.UpdateContent(text, audioUrl);
        }

        public void UpdateTitle(string title)
        {
            Title = ValidateTitle(title);
        }

        public void UpdateImage(string? imageUrl)
        {
            ImageUrl = imageUrl;
        }

        private static string ValidateTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Article title is required.", nameof(title));

            return title.Trim();
        }
    }
}
