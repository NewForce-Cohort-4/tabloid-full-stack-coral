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
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

								public List<Post> GetAllApprovedPosts()
								{
												using (SqlConnection conn = Connection)
												{
																conn.Open();
																using (SqlCommand cmd = conn.CreateCommand())
																{
																				cmd.CommandText = @"
																							SELECT p.Id AS PostId, 
																														p.Title, p.Content, 
																														p.ImageLocation AS HeaderImage,
																														p.CreateDateTime, p.PublishDateTime, p.IsApproved,
																														p.CategoryId AS PostCategoryId, 
																														p.UserProfileId,
																														c.[Name] AS CategoryName,
																														u.FirstName, u.LastName, u.DisplayName, 
																														u.Email, 
																														u.CreateDateTime AS UserProfileDateCreated,
																														u.ImageLocation AS AvatarImage,
																														u.UserTypeId, 
																														ut.[Name] AS UserTypeName
																									FROM Post p
																														LEFT JOIN Category c ON p.CategoryId = c.id
																														LEFT JOIN UserProfile u ON p.UserProfileId = u.id
																														LEFT JOIN UserType ut ON u.UserTypeId = ut.id
																								WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
																								ORDER BY p.PublishDateTime DESC";

																				SqlDataReader reader = cmd.ExecuteReader();

																				List<Post> posts = new List<Post>();

																				while (reader.Read())
																				{
																								posts.Add(new Post()
																								{
																												Id = DbUtils.GetInt(reader, "PostId"),
																												Title = DbUtils.GetString(reader, "Title"),
																												Content = DbUtils.GetString(reader, "Content"),
																												ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
																												CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
																												CategoryId = DbUtils.GetInt(reader, "PostCategoryId"),
																												Category = new Category()
																												{
																																Name = DbUtils.GetString(reader, "CategoryName")
																												},
																												UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
																												UserProfile = new UserProfile()
																												{
																																Id = DbUtils.GetInt(reader, "UserProfileId"),
																																FirstName = DbUtils.GetString(reader, "FirstName"),
																																LastName = DbUtils.GetString(reader, "LastName"),
																																DisplayName = DbUtils.GetString(reader, "DisplayName"),
																																Email = DbUtils.GetString(reader, "Email"),
																																CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
																																ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
																																UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
																																UserType = new UserType()
																																{
																																				Name = DbUtils.GetString(reader, "UserTypeName")
																																}
																												}
																												
																								});
																				}

																				reader.Close();

																				return posts;
																}
												}
								}
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
