using LevelByte.Application.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace LevelByte.Application.Commands.ArticleCommands.CreateArticle
{
    public class CreateArticleCommand : IRequest<ArticleViewModel>
    {
        public string Title { get; set; } = string.Empty;
        public string Theme { get; set; } = string.Empty;
        public IFormFile? Image { get; set; }
        public bool GenerateAudio { get; set; } = true;
    }
}
