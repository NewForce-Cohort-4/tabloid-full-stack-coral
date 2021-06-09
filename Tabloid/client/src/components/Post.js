import React from "react";
import { Card, CardTitle, CardImg, CardBody, Badge } from "reactstrap";
import { Link } from "react-router-dom"

const Post = ({ post }) => {
  return (
    <Card className="m-4 p-2">
        <Link to={`/posts/${post.id}`}>
          <CardTitle tag="h3">{post.title}</CardTitle>
        </Link>
        <CardImg src={post.imageLocation} alt={post.title} />
        <CardBody>
          <h5><Badge className="p-1" color="primary">{post.category.name}</Badge></h5>
          <p><strong>{post.title}</strong></p>
          <p>{post.caption}</p>
          <div>
              {post.comments === null ? null : post.comments?.map((comment) => (<p key={comment.id}>{comment.message}</p>))}
          </div>
          <p className="text-left">Posted by: <em>{post.userProfile.displayName}</em></p> 
        </CardBody>
    </Card>
  );
};

export default Post;