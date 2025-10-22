using LevelByte.Application.ViewModels;
using LevelByte.Core.Entities;
using LevelByte.Core.Repository;
using MediatR;

namespace LevelByte.Application.Commands.ArticleCommands.CreateArticle
{
    public class CreateArticleCommandHandler : IRequestHandler<CreateArticleCommand, ArticleViewModel>
    {
        private readonly IArticleRepository _repository;
        public CreateArticleCommandHandler(IArticleRepository repository)
        {
            _repository = repository;
        }
        public async Task<ArticleViewModel> Handle(CreateArticleCommand request, CancellationToken cancellationToken)
        {
            var article = new Article(request.Title);

            var basicLevel = new ArticleLevel(
                article.Id,
                1,
                GenerateOpenAIBasicText(request.Theme),
                $"/audio/{article.Id}_basic.mp3",
                150
            );

            var advancedLevel = new ArticleLevel(
                article.Id,
                2,
                GenerateOpenAIAdvancedText(request.Theme),
                $"/audio/{article.Id}_advanced.mp3",
                350
            );

            article.AddLevel(basicLevel);
            article.AddLevel(advancedLevel);

            var created = await _repository.CreateArticleAsync(article);

            return new ArticleViewModel
            {
                Id = article.Id,
                Title = article.Title,
                CreatedAt = article.CreatedAt,
                Levels = article.Levels.Select(l => new ArticleLevelViewModel
                {
                    Id = l.Id,
                    Level = l.Level,
                    Text = l.Text,
                    AudioUrl = l.AudioUrl,
                    WordCount = l.WordCount
                }).ToList()
            };
        }

        private string GenerateOpenAIBasicText(string theme)
        {
            return $"This is a basic level article about {theme}. " +
                   $"It uses simple words and short sentences. " +
                   $"The vocabulary is easy to understand. " +
                   $"This level is perfect for beginners learning English.";
        }

        private string GenerateOpenAIAdvancedText(string theme)
        {
            return $"This comprehensive article delves into the intricacies of {theme}. " +
                   $"It employs sophisticated vocabulary and complex sentence structures. " +
                   $"The content explores nuanced perspectives and demonstrates advanced linguistic patterns. " +
                   $"This level challenges proficient English speakers to expand their understanding.";
        }
    }
}

