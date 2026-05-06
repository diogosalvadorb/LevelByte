using LevelByte.Application.Mappings;
using LevelByte.Application.ViewModels;
using LevelByte.Core.Repository;
using MediatR;

namespace LevelByte.Application.Queries.ArticleQueries.GetArticleById
{
    public class GetArticleByIdQueryHandler : IRequestHandler<GetArticleByIdQuery, ArticleViewModel?>
    {
        private readonly IArticleRepository _articleRepository;
        public GetArticleByIdQueryHandler(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<ArticleViewModel?> Handle(GetArticleByIdQuery request, CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetArticleByIdAsync(request.Id);

            if (article == null)
                return null;

            return article.ToViewModel();
        }
    }
}
