using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        List<Tag> GetPostTagsByPostId(int postId);
        void PostAddTag(PostTag postTag);
    }
}