import React, { useEffect, useContext, useState } from "react";
import { Card, Button, CardTitle, CardText, Row, Col, Media, CardImg } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";

const PostDetails = () => {
  const [post, setPost] = useState();
  const { id } = useParams();
  const { getPost } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    getPost(id).then(setPost);
  }, []);

  const handleClick = () => {
      history.push("/posts")
  }

  if (!post) {
    return null;
  }

  var d = new Date(post.publishDateTime);
  let publishDate = d.toLocaleDateString('en-US')

  return (
    <Row>
        <Col sm="12">
            <Card body>
                    <CardTitle tag="h3">{post.title}</CardTitle>
                    <CardImg src={post.imageLocation}/>
                    <CardText>{post.content}</CardText>
                    <strong>Publish Date: {publishDate}</strong>
                    <strong>Author: {post.userProfile.displayName}</strong>
                    <Button onClick={handleClick}>Go Back</Button>
            </Card>
        </Col>
    </Row>
  );
};

export default PostDetails;