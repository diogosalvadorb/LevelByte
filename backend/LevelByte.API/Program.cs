using LevelByte.Application.Commands.ArticleCommands.CreateArticle;
using LevelByte.Application.Services;
using LevelByte.Core.Repository;
using LevelByte.Core.Services;
using LevelByte.Infrastructure.Persistence;
using LevelByte.Infrastructure.Persistence.Repository;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<LevelByteDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Neon")));

builder.Services.AddControllers();
builder.Services.AddHttpClient<IAiService, AiService>();
builder.Services.AddScoped<IArticleRepository, ArticleRepository>();

builder.Services.AddMediatR(typeof(CreateArticleCommand));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFront", policy =>
        policy.WithOrigins(
            "http://localhost:3000",
            "https://level-byte.vercel.app")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseSwagger();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "LevelByte API v1");
    c.RoutePrefix = "swagger";
});

app.UseCors("AllowFront");
app.UseAuthorization();

if (!app.Environment.IsDevelopment())
{
    var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
    app.Urls.Add($"http://*:{port}");
}

app.MapControllers();

app.Run();