using System.Collections.Generic;
using Tabloid.Models;
﻿using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        public void Add(Category category);
        List<Category> GetAll();
    }
}