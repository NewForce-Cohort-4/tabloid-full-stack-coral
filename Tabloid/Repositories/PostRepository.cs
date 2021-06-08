using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
				public class PostRepository : BaseRepository, IPostRepository
				{
								public PostRepository(IConfiguration config) : base(config) { }
								public List<Post> GetAllApprovedPosts()
								{
												using (SqlConnection conn = Connection)
												{
																conn.Open();
																using (SqlCommand cmd = conn.CreateCommand())
																{
																				cmd.CommandText = @"
																							SELECT p.Id, p.Title, p.Content, 
																														p.ImageLocation AS HeaderImage,
																														p.CreateDateTime, p.PublishDateTime, p.IsApproved,
																														p.CategoryId, p.UserProfileId,
																														c.[Name] AS CategoryName,
																														u.FirstName, u.LastName, u.DisplayName, 
																														u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
																														u.UserTypeId, 
																														ut.[Name] AS UserTypeName
																									FROM Post p
																														LEFT JOIN Category c ON p.CategoryId = c.id
																														LEFT JOIN UserProfile u ON p.UserProfileId = u.id
																														LEFT JOIN UserType ut ON u.UserTypeId = ut.id
																								WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()";

																				SqlDataReader reader = cmd.ExecuteReader();

																				List<Post> posts = new List<Post>();

																				while (reader.Read())
																				{
																								posts.Add(new Post()
																								{
																												Id = DbUtils.GetInt(reader, "PostId"),
																												Title = DbUtils.GetString(reader, "Title"),
																												Content = DbUtils.GetString(reader, "Content"),
																												ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
																												CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
																												UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
																												UserProfile = new UserProfile()
																												{
																																Id = DbUtils.GetInt(reader, "UserProfileId"),
																																FirstName = DbUtils.GetString(reader, "FirstName"),
																																LastName = DbUtils.GetString(reader, "LastName"),
																																DisplayName = DbUtils.GetString(reader, "DisplayName"),
																																Email = DbUtils.GetString(reader, "Email"),
																																CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
																																ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
																																UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
																												}
																								});
																				}

																				reader.Close();

																				return posts;
																}
												}
								}
				}
}
