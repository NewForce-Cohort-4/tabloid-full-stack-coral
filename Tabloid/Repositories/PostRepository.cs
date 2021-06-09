using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Utils;
using Tabloid.Models;
using Microsoft.Extensions.Configuration;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }
        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT p.Id as PostId, p.Title, p.Content, p.CreateDateTime as PostCreateDate, p.PublishDateTime as PostPublishDate, p.IsApproved, p.ImageLocation as PostImageLocation, u.Id as UserId, FireBaseUserId, DisplayName, FirstName, LastName, Email, u.CreateDateTime as UserCreateDateTime, u.ImageLocation as UserImageLocation, UserTypeId, c.Id as CategoryId, Name
                    FROM Post p JOIN Category c on p.CategoryId = c.Id
                    JOIN UserProfile u on p.UserProfileId = u.Id
                    WHERE p.Id = @Id
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
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "UserImageLocation"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            }
                        };
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        public List<Post> GetUserPosts(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT p.Id as PostId, p.Title, p.Content, p.CreateDateTime as PostCreateDate, p.PublishDateTime as PostPublishDate, p.IsApproved, p.ImageLocation as PostImageLocation, u.Id as UserId, FireBaseUserId, DisplayName, FirstName, LastName, Email, u.CreateDateTime as UserCreateDateTime, u.ImageLocation as UserImageLocation, UserTypeId, c.Id as CategoryId, Name
                    FROM Post p JOIN Category c on p.CategoryId = c.Id
                    JOIN UserProfile u on p.UserProfileId = u.Id
                    WHERE UserProfileId = @Id
                    ORDER BY p.CreateDateTime";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "PostId"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "PostCreateDate"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PostPublishDate"),
                            ImageLocation = DbUtils.GetString(reader, "PostImageLocation"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserCreateDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "UserImageLocation"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            },
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "Name"),
                            }
                        }
                        );
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
    }
}
