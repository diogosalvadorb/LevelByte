# Build da aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia os arquivos da solução e projetos
COPY LevelByte.sln ./
COPY LevelByte.API/*.csproj LevelByte.API/
COPY LevelByte.Application/*.csproj LevelByte.Application/
COPY LevelByte.Core/*.csproj LevelByte.Core/
COPY LevelByte.Infrastructure/*.csproj LevelByte.Infrastructure/

RUN dotnet restore LevelByte.API/LevelByte.API.csproj

COPY . .

# Publica a API
WORKDIR /src/LevelByte.API
RUN dotnet publish -c Release -o /app

# Etapa 2 — Execução
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Configura porta do render
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "LevelByte.API.dll"]
