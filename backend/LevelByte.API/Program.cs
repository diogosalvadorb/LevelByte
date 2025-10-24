using LevelByte.Application.Commands.ArticleCommands.CreateArticle;
using LevelByte.Core.Repository;
using LevelByte.Infrastructure.Persistence;
using LevelByte.Infrastructure.Persistence.Repository;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";

builder.Services.AddDbContext<LevelByteDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Neon")));

builder.Services.AddControllers();
builder.Services.AddScoped<IArticleRepository, ArticleRepository>();
builder.Services.AddMediatR(typeof(CreateArticleCommand));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFront", policy =>
        policy.WithOrigins("https://meu-dominio-front")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFront");
app.UseAuthorization();

app.Urls.Add($"http://*:{port}");

app.MapControllers();

app.Run();