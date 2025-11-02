using LevelByte.Application.ViewModels;
using LevelByte.Core.Repository;
using MediatR;

namespace LevelByte.Application.Queries.ArticleQueries.GetAllArticles
{
    public class GetAllArticlesQueryHandler : IRequestHandler<GetAllArticlesQuery, List<ArticleViewModel>>
    {
        private readonly IArticleRepository _articleRepository;
        public GetAllArticlesQueryHandler(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public async Task<List<ArticleViewModel>> Handle(GetAllArticlesQuery request, CancellationToken cancellationToken)
        {
            var articles = await _articleRepository.GetAllAsync();

            if (!string.IsNullOrWhiteSpace(request.SearchTerm)) 
            {  
                articles = articles.Where(a => a.Title.Contains(request.SearchTerm, StringComparison.OrdinalIgnoreCase)).ToList();
            }

            return articles.Select(article => new ArticleViewModel
            {
                Id = article.Id,
                Title = article.Title,
                HasImage = article.ImageData != null,
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
        }
    }
}
