using LevelByte.Application.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace LevelByte.Application.Commands.ArticleCommands.UpdateArticle
{
    public class UpdateArticleCommand : IRequest<ArticleViewModel>
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public IFormFile? Image { get; set; }
        public bool RemoveImage { get; set; }
    }
}
