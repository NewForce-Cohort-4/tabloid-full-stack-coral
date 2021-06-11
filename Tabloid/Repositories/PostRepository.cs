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
                SELECT p.Id AS PostId, p.Title, p.Content, 
                       p.ImageLocation AS PostImageLocation,  p.CreateDateTime AS PostDateCreated, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId,
                       up.FirstName, up.LastName, up.Email, up.DisplayName, 
                       up.ImageLocation AS UserProfileImageUrl
                FROM Post p 
                       LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                    WHERE p.Id = @Id
                    ORDER BY PostDateCreated";

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
                            ImageLocation = DbUtils.GetString(reader, "PostImageLocation"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "PostDateCreated"),
                            PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                            IsApproved = reader.GetBoolean(reader.GetOrdinal("IsApproved")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
								DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),                                
                            },
                        };
                    }
                    reader.Close();

					return post;
				}
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (Title, ImageLocation, Content, CreateDateTime, PublishDateTime, IsApproved, CategoryId, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @ImageLocation, @Content, @CreateDateTime, @PublishDateTime, @IsApproved, @CategoryId, @UserProfileId)";

                    DbUtils.AddParameter(cmd, "@Title", post.Title);
                    DbUtils.AddParameter(cmd, "@ImageLocation", post.ImageLocation);
                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@PublishDateTime", post.PublishDateTime);
                    DbUtils.AddParameter(cmd, "@IsApproved", post.IsApproved);
                    DbUtils.AddParameter(cmd, "@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdatePost(Post post)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Post
                            SET 
                                Title = @title,
                                Content = @content,
                                ImageLocation = @imageLocation,
                                PublishDateTime = @publishDateTime,
                                CreateDateTime = @createDateTime,
                                CategoryId = @categoryId
                                
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@title", post.Title);
                    cmd.Parameters.AddWithValue("@content", post.Content);
                    cmd.Parameters.AddWithValue("@imageLocation", post.ImageLocation ?? "");
                    cmd.Parameters.AddWithValue("@publishDateTime", post.PublishDateTime);
                    cmd.Parameters.AddWithValue("@createDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@categoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
