using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        Post GetById(int id);
        public List<Post> GetUserPosts(int id);
        List<Post> GetAllApprovedPosts();
    }
								
}
