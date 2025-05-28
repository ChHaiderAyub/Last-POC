using Core.Application.Users.UserDtos;
using Core.Data;
using Core.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static Core.Data.Enums.Enums;

namespace Core.Application.Users
{
    internal class UserRepository : IUserRepository
    {
        RepositoryContext _repositoryContext;
        private readonly IConfiguration _configuration;

        public UserRepository(RepositoryContext repositoryContext, IConfiguration configuration)
        {
            _repositoryContext = repositoryContext;
            _configuration = configuration;

        }






        public PayloadCustom<User> RegisterUser(User user)
        {
            try
            {
                var users = _repositoryContext.Users.FirstOrDefault(u=>u.Email==user.Email || u.PhoneNumber==user.PhoneNumber);
                if (users != null)
                {
                    return new PayloadCustom<User>
                    {
                        Entity = user,
                        Status = (int)HttpStatusCode.Conflict,
                        Message = "User with this email or phone number already exists.",
                    };
                }
               
                user.CreatedAt = DateTime.UtcNow; 
            
                _repositoryContext.Users.Add(user);
                _repositoryContext.SaveChanges();
                return new PayloadCustom<User>
                {
                    Entity = user,
                    Status = (int)HttpStatusCode.Created,
                    Message = "User registered successfully."
                };

            }
            catch (Exception ex)
            {
                return new PayloadCustom<User>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "An error occurred: " + (ex.InnerException?.Message ?? ex.Message)
                };


            }


        }



        public PayloadCustom<User> LogIn(LoginDto loginRequest)
        {
            try
            {
                var user = _repositoryContext.Users
                    .FirstOrDefault(u => u.Email == loginRequest.Email);

                if (user == null)
                {
                    return new PayloadCustom<User>
                    {
                        Entity = null,
                        Status = (int)HttpStatusCode.NotFound,
                        Message = "Email does not exist"
                    };
                }

                if (user.Password != loginRequest.Password)
                {
                    return new PayloadCustom<User>
                    {
                        Entity = null,
                        Status = (int)HttpStatusCode.Unauthorized,
                        Message = "Incorrect password"
                    };
                }

                return new PayloadCustom<User>
                {
                    Entity = user,
                    Status = (int)HttpStatusCode.OK,
                    Message = $"Login successful. Role: {user.Role}"
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<User>
                {
                    Entity = null,
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "An error occurred: " + (ex.InnerException?.Message ?? ex.Message)
                };
            }
        }



        public PayloadCustom<List<AllUsers>> GetAllUsers()
        {
            try
            {
                var users = _repositoryContext.Users.Select(u=>new AllUsers
                {   Id = u.Id,
                    Name = u.Name,
                   Role = u.Role,
                }).ToList();
                return new PayloadCustom<List<AllUsers>>
                {
                    Entity = users,
                    Status = (int)HttpStatusCode.OK,
                    Message = "All users fetched successfully.",

                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<List<AllUsers>>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "An error occurred: " + (ex.InnerException?.Message ?? ex.Message)
                };
            }
      



        }

        public PayloadCustom<User> UserDetails(Guid Id)
        {
            try
            {
                var users = _repositoryContext.Users.FirstOrDefault(u => u.Id == Id);
                return new PayloadCustom<User>
                {
                    Entity = users,
                    Status = (int)HttpStatusCode.OK,
                    Message = "Details ",
                };
            }
            catch(Exception ex )
            {
                return new PayloadCustom<User>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "An error occurred: " + (ex.InnerException?.Message ?? ex.Message)

                };
            }
        }



        public PayloadCustom<User> DeleteUser(Guid id)
        {
            var user = _repositoryContext.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
            {
                return new PayloadCustom<User>
                {
                    Success = false,
                    Message = "User not found"
                };
            }

            _repositoryContext.Users.Remove(user);
            _repositoryContext.SaveChanges();

            return new PayloadCustom<User>
            {
                Success = true,
                Message = "User deleted successfully",
                Entity = user
            };
        }


        public PayloadCustom<List<UsersRole>> GetUsersByRole(string role)
        {
            try
            {
                var users = _repositoryContext.Users
                    .AsEnumerable()
                    .Where(u => u.Role.ToString().ToLower() == role.ToLower())
                    .Select(u => new UsersRole
                    {
                        Id = u.Id,
                        Name = u.Name,
                        Email = u.Email,
                        PhoneNumber = u.PhoneNumber
                    })
                    .ToList();

                return new PayloadCustom<List<UsersRole>> // ✅ now types match
                {
                    Entity = users,
                    Status = (int)HttpStatusCode.OK,
                    Message = "Users fetched successfully."
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<List<UsersRole>>
                {
                    Status = (int)HttpStatusCode.InternalServerError,
                    Message = "An error occurred: " + (ex.InnerException?.Message ?? ex.Message)
                };
            }
        }







    }
}
