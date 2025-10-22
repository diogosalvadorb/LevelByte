using LevelByte.Application.Commands.ArticleCommands.CreateArticle;
using LevelByte.Core.Repository;
using LevelByte.Infrastructure.Persistence;
using LevelByte.Infrastructure.Persistence.Repository;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<LevelByteDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Neon")));

builder.Services.AddControllers();
builder.Services.AddScoped<IArticleRepository, ArticleRepository>();
builder.Services.AddMediatR(typeof(CreateArticleCommand));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
