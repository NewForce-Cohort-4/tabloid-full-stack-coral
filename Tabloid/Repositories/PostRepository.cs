using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }
        public Post GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT p.Id as p.PostId, p.Title, p.Content, p.CreateDateTime as PostCreateDate, p.PublishDateTime as PostPublishDate, p.IsApproved, p.ImageLocation as PostImageLocation, u.Id as UserId, FireBaseUserId, DisplayName, FirstName, LastName, Email, u.CreateDateTime as UserCreateDateTime, u.ImageLocation as UserImageLocation, UserTypeId, c.Id as CategoryId, Name
                    FROM Post p JOIN Category c on p.CategoryId = c.Id
                    JOIN UserProfile u on p.UserProfileId = u.Id
                    WHERE UserProfileId = @Id
                    ORDER BY p.CreateDateTime";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    while (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "PostCreateDate"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PostPublishDate"),
                            ImageLocation = DbUtils.GetString(reader, "PostImageLocation"),
                            Author = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "UserImageLocation"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Name = DbUtils.GetString(reader, "UserProfileId"),
                            }
                        };
                    }

                    reader.Close();

                    return post;
                }
            }

        }
    }
}
