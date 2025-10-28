namespace LevelByte.Core.Services
{
    public interface IAuthService
    {
        string GenerateTokenJwt(string email, string role);
        string ComputerSha256Hash(string password);
    }
}
