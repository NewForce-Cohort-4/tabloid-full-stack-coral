using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
								void Delete(int id);
								List<Post> GetAllApprovedPosts();
								Post GetById(int id);
				}
}