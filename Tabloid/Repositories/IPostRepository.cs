using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        Post GetById(int id);
        Post Add(Post post);
        List<Post> GetAllApprovedPosts();
        void UpdatePost(Post post);
    }
}