using LevelByte.Application.ViewModels;
using LevelByte.Core.Repository;
using MediatR;

namespace LevelByte.Application.Queries.ArticleQueries.GetAllArticles
{
    public class GetAllArticlesQueryHandler : IRequestHandler<GetAllArticlesQuery, PaginatedResult<ArticleViewModel>>
    {
        private readonly IArticleRepository _articleRepository;

        public GetAllArticlesQueryHandler(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<PaginatedResult<ArticleViewModel>> Handle(GetAllArticlesQuery request, CancellationToken cancellationToken)
        {
            if (request.PageNumber < 1)
                request.PageNumber = 1;

            if (request.PageSize < 1)
                request.PageSize = 8;

            if (request.PageSize > 100)
                request.PageSize = 100;

            var allArticles = await _articleRepository.GetAllAsync();

            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                allArticles = allArticles
                    .Where(a => a.Title.Contains(request.SearchTerm, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            allArticles = allArticles
                .OrderByDescending(a => a.CreatedAt)
                .ToList();

            var totalCount = allArticles.Count;

            var paginatedArticles = allArticles
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var articleViewModels = paginatedArticles.Select(article => new ArticleViewModel
            {
                Id = article.Id,
                Title = article.Title,
                ImageUrl = article.ImageUrl,
                CreatedAt = article.CreatedAt,
                Levels = article.Levels.Select(level => new ArticleLevelViewModel
                {
                    Id = level.Id,
                    Level = level.Level,
                    Text = level.Text,
                    AudioUrl = level.AudioUrl,
                    WordCount = level.WordCount
                }).ToList()
            }).ToList();

            return new PaginatedResult<ArticleViewModel>
            {
                Items = articleViewModels,
                TotalCount = totalCount,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };
        }
    }
}