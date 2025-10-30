using LevelByte.Application.ViewModels;
using LevelByte.Core.Repository;
using MediatR;

namespace LevelByte.Application.Commands.ArticleCommands.UpdateArticleLevel
{
    public class UpdateArticleLevelCommandHandler : IRequestHandler<UpdateArticleLevelCommand, ArticleLevelViewModel?>
    {
        private readonly IArticleRepository _repository;

        public UpdateArticleLevelCommandHandler(IArticleRepository repository)
        {
            _repository = repository;
        }

        public async Task<ArticleLevelViewModel?> Handle(UpdateArticleLevelCommand request, CancellationToken cancellationToken)
        {
            var article = await _repository.GetArticleByIdAsync(request.ArticleId);

            if (article == null)
                return null;

            var level = article.Levels.FirstOrDefault(l => l.Id == request.LevelId);

            if (level == null)
                return null;

            var wordCount = CountWords(request.Text);

            level.UpdateContent(request.Text, request.AudioUrl, wordCount);

            await _repository.UpdateArticleAsync(article);

            return new ArticleLevelViewModel
            {
                Id = level.Id,
                Level = level.Level,
                Text = level.Text,
                AudioUrl = level.AudioUrl,
                WordCount = level.WordCount
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