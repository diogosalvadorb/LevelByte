using LevelByte.Core.Repository;
using MediatR;

namespace LevelByte.Application.Commands.ArticleCommands.DeleteArticle
{
    public class DeleteArticleCommandHandler : IRequestHandler<DeleteArticleCommand, bool>
    {
        private readonly IArticleRepository _repository;

        public DeleteArticleCommandHandler(IArticleRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteArticleCommand request, CancellationToken cancellationToken)
        {
            var article = await _repository.GetArticleByIdAsync(request.Id);

            if (article == null)
                return false;

            return await _repository.DeleteArticleAsync(request.Id);
        }
    }
}