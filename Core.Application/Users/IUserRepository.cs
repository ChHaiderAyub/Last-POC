using Core.Application.Users.UserDtos;
using Core.Data.Entities;

namespace Core.Application.Users
{
    public interface IUserRepository
    {
        PayloadCustom<User> RegisterUser(User user);
        PayloadCustom<User> LogIn(LoginDto loginRequest);
      PayloadCustom<List<AllUsers>> GetAllUsers();

    }
}
