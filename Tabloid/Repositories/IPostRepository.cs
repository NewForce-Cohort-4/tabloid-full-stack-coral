using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        Post GetById(int id);
        Post Add(Post post);
        List<Post> GetAllApprovedPosts();
        Post UpdatePost(Post post);
        void Delete(int id);
        List<Post> GetUserPosts(int id);
        int PostAddTag(List<int>tagIds, int postId);
    }
}
