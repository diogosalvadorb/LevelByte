using LevelByte.Application.ViewModels;
using LevelByte.Core.Entities;

namespace LevelByte.Application.Mappings
{
    public static class ArticleMappingExtensions
    {
        public static ArticleViewModel ToViewModel(this Article article)
        {
            return new ArticleViewModel
            {
                Id = article.Id,
                Title = article.Title,
                ImageUrl = article.ImageUrl,
                CreatedAt = article.CreatedAt,
                Levels = article.Levels.Select(level => level.ToViewModel()).ToList()
            };
        }

        public static ArticleLevelViewModel ToViewModel(this ArticleLevel level)
        {
            return new ArticleLevelViewModel
            {
                Id = level.Id,
                Level = level.Level,
                Text = level.Text,
                AudioUrl = level.AudioUrl,
                WordCount = level.WordCount
            };
        }
    }
}
