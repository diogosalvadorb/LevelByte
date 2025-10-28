using LevelByte.Application.Commands.ArticleCommands.CreateArticle;
using LevelByte.Application.Queries.ArticleQueries.GetAllArticles;
using LevelByte.Application.Queries.ArticleQueries.GetArticleById;
using LevelByte.Application.Queries.ArticleQueries.GetArticleImage;
using LevelByte.Application.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LevelByte.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ArticlesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateArticleCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<List<ArticleViewModel>>> GetAll()
        {
            var query = new GetAllArticlesQuery();
            var result = await _mediator.Send(query);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ArticleViewModel>> GetById(Guid id)
        {
            var query = new GetArticleByIdQuery(id);
            var result = await _mediator.Send(query);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetImage(Guid id)
        {
            var query = new GetArticleImageQuery(id);
            var result = await _mediator.Send(query);

            if (result == null)
                return NotFound("Image not found");

            return File(result.ImageData, result.ContentType);
        }
    }
}
