using MediatR;

namespace LevelByte.Application.Commands.ArticleCommands.DeleteArticle
{
    public class DeleteArticleCommand : IRequest<bool>
    {
        public DeleteArticleCommand(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
    }
}
