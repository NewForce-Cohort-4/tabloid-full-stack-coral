using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Utils;
using Tabloid.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  Id,
                                [Name]
                        FROM Category
                    ";
                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Category> categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }
                    reader.Close();
                    return categories;
                }
            }
        }

        public void Add(Category category)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Category (Name)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name)";
                    DbUtils.AddParameter(cmd, "@Name", category.Name);

                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        //Changes any tag's category associated with the targeted category to avoid deleting posts
        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Post 
                                        SET CategoryId = 22 
                                        WHERE CategoryId = @Id
                                        DELETE FROM Category
                                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Category category)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Category
                        SET [Name] = @name
                        WHERE Id = @Id
                    ";
                    DbUtils.AddParameter(cmd, "@Id", category.Id);
                    DbUtils.AddParameter(cmd, "@name", category.Name);

                    cmd.ExecuteNonQuery();
                }
               
            }
        }
    }
}
