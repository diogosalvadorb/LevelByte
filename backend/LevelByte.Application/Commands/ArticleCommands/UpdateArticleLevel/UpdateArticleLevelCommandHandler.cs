using LevelByte.Application.Mappings;
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

            if (article.GetLevel(request.LevelId) == null)
                return null;

            article.UpdateLevel(request.LevelId, request.Text, request.AudioUrl);

            await _repository.UpdateArticleAsync(article);

            return article.GetLevel(request.LevelId)!.ToViewModel();
        }
    }
}
