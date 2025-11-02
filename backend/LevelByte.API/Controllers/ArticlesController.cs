using LevelByte.Application.Commands.ArticleCommands.CreateArticle;
using LevelByte.Application.Commands.ArticleCommands.DeleteArticle;
using LevelByte.Application.Commands.ArticleCommands.UpdateArticle;
using LevelByte.Application.Commands.ArticleCommands.UpdateArticleLevel;
using LevelByte.Application.Queries.ArticleQueries.GetAllArticles;
using LevelByte.Application.Queries.ArticleQueries.GetArticleById;
using LevelByte.Application.ViewModels;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet]
        public async Task<ActionResult<List<ArticleViewModel>>> GetAll([FromQuery] string? search)
        {
            var query = new GetAllArticlesQuery
            {
                SearchTerm = search
            };

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

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm] CreateArticleCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(Guid id, [FromForm] UpdateArticleCommand command)
        {
            command.Id = id;
            var result = await _mediator.Send(command);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPut("{articleId}/levels/{levelId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateLevel(Guid articleId, Guid levelId, [FromBody] UpdateArticleLevelCommand command)
        {
            command.ArticleId = articleId;
            command.LevelId = levelId;

            var result = await _mediator.Send(command);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var command = new DeleteArticleCommand(id);
            var result = await _mediator.Send(command);

            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}