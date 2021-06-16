using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        List<Tag> GetAll();
        public void Delete(int id);
        public void Update(Tag tag);
        public Tag GetById(int id);
    }
}