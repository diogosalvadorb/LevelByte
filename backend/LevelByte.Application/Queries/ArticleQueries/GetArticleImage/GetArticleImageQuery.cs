using LevelByte.Application.Queries.ArticleQueries.GetArticleById;
using MediatR;

namespace LevelByte.Application.Queries.ArticleQueries.GetArticleImage
{
    public class GetArticleImageQuery : IRequest<ArticleImageResult?>
    {
        public GetArticleImageQuery(Guid articleId)
        {
            ArticleId = articleId;
        }

        public Guid ArticleId { get; set; }
    }

    public class ArticleImageResult
    {
        public byte[] ImageData { get; set; } = Array.Empty<byte>();
        public string ContentType { get; set; } = string.Empty;
    }
}
