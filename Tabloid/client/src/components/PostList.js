import React, { useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import { Container, Row, Col, Media } from "reactstrap";
import Post from "./Post"

const PostList = () => {

    const { posts, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        getAllPosts();
    }, [])

    return (
        <>
            <Container className="card-list-container" fluid={true}>
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