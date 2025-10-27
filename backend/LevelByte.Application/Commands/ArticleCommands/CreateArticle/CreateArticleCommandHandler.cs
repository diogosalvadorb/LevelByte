using LevelByte.Application.ViewModels;
using LevelByte.Core.Entities;
using LevelByte.Core.Repository;
using LevelByte.Core.Services;
using MediatR;

namespace LevelByte.Application.Commands.ArticleCommands.CreateArticle
{
    public class CreateArticleCommandHandler : IRequestHandler<CreateArticleCommand, ArticleViewModel>
    {
        private readonly IArticleRepository _repository;
        private readonly IAiService _aiService;

        public CreateArticleCommandHandler(IArticleRepository repository, IAiService aiService)
        {
            _repository = repository;
            _aiService = aiService;
        }

        public async Task<ArticleViewModel> Handle(CreateArticleCommand request, CancellationToken cancellationToken)
        {
            var article = new Article(request.Title);

            var basicText = await _aiService.GenerateAiArticleTextAsync(request.Theme, 1);
            var basicWordCount = CountWords(basicText);

            var basicLevel = new ArticleLevel(
                article.Id,
                1,
                basicText,
                $"/audio/{article.Id}_basic.mp3",
                basicWordCount
            );

            var advancedText = await _aiService.GenerateAiArticleTextAsync(request.Theme, 2);
            var advancedWordCount = CountWords(advancedText);

            var advancedLevel = new ArticleLevel(
                article.Id,
                2,
                advancedText,
                $"/audio/{article.Id}_advanced.mp3",
                advancedWordCount
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

        private int CountWords(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return 0;

            return text.Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries).Length;
        }
    }
}