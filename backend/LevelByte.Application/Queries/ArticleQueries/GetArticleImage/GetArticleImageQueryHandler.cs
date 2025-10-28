using LevelByte.Core.Repository;
using MediatR;

namespace LevelByte.Application.Queries.ArticleQueries.GetArticleImage
{
    public class GetArticleImageQueryHandler : IRequestHandler<GetArticleImageQuery, ArticleImageResult?>
    {
        private readonly IArticleRepository _articleRepository;

        public GetArticleImageQueryHandler(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<ArticleImageResult?> Handle(GetArticleImageQuery request, CancellationToken cancellationToken)
        {
            var article = await _articleRepository.GetArticleByIdAsync(request.ArticleId);

            if (article == null || article.ImageData == null)
                return null;

            return new ArticleImageResult
            {
                ImageData = article.ImageData,
                ContentType = article.ImageContentType ?? "image/jpeg"
            };
        }
    }
}