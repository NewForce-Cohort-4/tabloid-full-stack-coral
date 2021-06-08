import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom"

const Post = ({ post }) => {
  return (
    <Card className="m-4">
        <p className="text-left px-2">Posted by: {post.userProfile.name}</p>
        <Link to={`/posts/${post.id}`}>
        <strong>{post.title}</strong>
        </Link>
        <CardImg top src={post.imageUrl} alt={post.title} />
        <CardBody>
            <p>
            <strong>{post.title}</strong>
            </p>
            <p>{post.caption}</p>
            <div>
                {post.comments === null ? null : post.comments?.map((comment) => (<p key={comment.id}>{comment.message}</p>))}
            </div>
        </CardBody>
    </Card>
  );
};

export default Post;