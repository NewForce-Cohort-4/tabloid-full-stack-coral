using Tabloid.Models;
using System.Collections.Generic;
namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        Post GetById(int id);
        public List<Post> GetUserPosts(int id);
    }
}