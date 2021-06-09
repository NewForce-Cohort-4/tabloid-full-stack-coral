import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom"

const Post = ({ post }) => {
  return (
    <Card className="m-4">
        <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
        <Link to={`/posts/${post.id}`}>
        <strong>{post.title}</strong>
      </Link>
      <p>Published: {post.publishDateTime}</p>
      <p>Category: { post.category.name}</p>
        <CardImg top src={post.imageLocation} alt={post.title} />
        <CardBody>
        <p>{post.content}</p>
        </CardBody>
    </Card>
  );
};

export default Post;