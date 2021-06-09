using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        Post GetById(int id);
        void Add(Post post);
    }
}