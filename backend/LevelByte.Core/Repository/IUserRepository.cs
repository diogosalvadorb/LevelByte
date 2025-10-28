using LevelByte.Core.Entities;

namespace LevelByte.Core.Repository
{
    public interface IUserRepository
    {
        Task<User?> GetUserByIdAsync(Guid id);
        Task CreateUserAsync(User entity);
    }
}
