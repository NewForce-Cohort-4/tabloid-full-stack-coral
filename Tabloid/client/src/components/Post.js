import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, CardTitle, CardImg, CardBody, Badge, Button,  Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, useHistory } from "react-router-dom"
import { PostContext } from "../providers/PostProvider"

const Post = ({ post }) => {
  const [ modal, setModal ] = useState(false)
  const { deletePost, getAllPosts } = useContext(PostContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))

  const postId = post.id;
  
  const history = useHistory();

  const handleClick = () => {
        history.push(`/posts/edit`)
  }

  const toggle = () => setModal(!modal);

  return (
    <>
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
          {post.userProfileId === userProfile.id ?
            <> 
            <Button color="secondary" size="sm" onClick={() => {
                history.push(`/post/edit/${post.id}`)
                }}>Edit
            </Button>
            <Button color="danger" size="sm" onClick={toggle}>Delete</Button>
            <Modal isOpen={modal} toggle={toggle} style={{textAlign: "center"}}>
              <ModalHeader>Delete Post: {post.title}</ModalHeader>
              <ModalBody>
                <b>Please confirm you would like to delete the post:</b><br /> <em>{post.title}</em><br /><br />
               This action <b>can not</b> be undone.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => {
                  deletePost(postId).then(getAllPosts)
                  toggle();
                }}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
            </>
            :
            <div></div>
          }
        </CardBody>
    </Card>
    </>
  );
};

export default Post;