import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Container, Button, Row, Col, Media } from "reactstrap";
import { useHistory } from "react-router-dom"
import Post from "./Post"

const PostList = () => {

    const { posts, getAllPosts } = useContext(PostContext);
    const history = useHistory();

    useEffect(() => {
        getAllPosts();
    }, [])

    return (
        <>
            <Container className="card-list-container" fluid={true}>
                <Button color="secondary" onClick={() => {
                history.push(`/post/add`)
                }}>Add New Post</Button>
                <div className="row justify-content-center">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </Container>
        </>
    );    
};

export default PostList;