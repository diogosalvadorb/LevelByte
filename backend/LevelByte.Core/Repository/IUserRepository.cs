using LevelByte.Core.Entities;

namespace LevelByte.Core.Repository
{
    public interface IUserRepository
    {
        Task<User?> GetUserByIdAsync(Guid id);
        Task<User?> GetUserByEmailAndPasswordAsync(string email, string password);
        Task CreateUserAsync(User entity);
    }
}
