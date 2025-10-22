using LevelByte.Application.ViewModels;
using MediatR;

namespace LevelByte.Application.Queries.ArticleQueries.GetAllArticles
{
    public class GetAllArticlesQuery : IRequest<List<ArticleViewModel>>
    {
    }
}
