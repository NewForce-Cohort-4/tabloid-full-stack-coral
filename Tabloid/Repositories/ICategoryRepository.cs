using System.Collections.Generic;
using Tabloid.Models;
﻿using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        void AddCategory(Category category);
        void DeleteCategory(int Id);
        List<Category> GetAllCategories();
        Category GetCategorygById(int id);
        void UpdateCategory(Category category);
    }
}