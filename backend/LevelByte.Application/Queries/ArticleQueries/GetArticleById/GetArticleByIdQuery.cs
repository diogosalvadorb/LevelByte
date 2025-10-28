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

    public class ArticleImageResult
    {
        public byte[] ImageData { get; set; } = Array.Empty<byte>();
        public string ContentType { get; set; } = string.Empty;
    }
}
