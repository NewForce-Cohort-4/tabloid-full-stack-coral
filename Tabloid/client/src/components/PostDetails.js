import React, { useEffect, useContext, useState } from "react";
import { Card, Button, CardTitle, CardText, Row, Col, Media } from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { useHistory, useParams } from "react-router-dom";
import Post from "./Post";
import CardBody from "reactstrap/lib/CardBody";

const PostDetails = () => {
  const [post, setPost] = useState();
  const { id } = useParams();
  const { getPost } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    getPost(id).then(setPost);
  }, []);

  const handleClick = () => {
      history.push("/")
  }

  if (!post) {
    return null;
  }

  var d = new Date(post.publishDateTime);
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();
  let publishDate = `${curr_month}/${curr_date}/${curr_year}`

  return (
    <Row>
        <Col sm="12">
            <Card body>
                    <CardTitle tag="h3">{post.title}</CardTitle>
                    <Media src={post.imageLocation} rounded/>
                    <CardText>{post.content}</CardText>
                    <p>{publishDate}</p>
                    <p>{post.userProfile.displayName}</p>
                    <Button onClick={handleClick}>Go Back</Button>
            </Card>
        </Col>
    </Row>
  );
};

export default PostDetails;