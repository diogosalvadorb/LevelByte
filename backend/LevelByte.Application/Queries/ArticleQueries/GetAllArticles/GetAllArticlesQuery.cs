using LevelByte.Application.ViewModels;
using MediatR;

namespace LevelByte.Application.Queries.ArticleQueries.GetAllArticles
{
    public class GetAllArticlesQuery : IRequest<PaginatedResult<ArticleViewModel>>
    {
        public string? SearchTerm { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 8;
    }
}
