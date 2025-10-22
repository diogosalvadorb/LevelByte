using LevelByte.Application.ViewModels;
using MediatR;

namespace LevelByte.Application.Queries.ArticleQueries.GetArticleById
{
    public class GetArticleByIdQuery : IRequest<ArticleViewModel?>
    {
        public GetArticleByIdQuery(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
    }
}
