import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { TagContext } from "../providers/TagProvider";
import { PostContext } from "../providers/PostProvider";
import { PostTagContext } from "../providers/PostTagProvider";
import {
    FormGroup,
    Label,
    Input,
    Button
  } from "reactstrap";


const ManageTags = () => {

    const { tags, getAllTags } = useContext(TagContext);
    const { addPostTag } = useContext(PostTagContext)
    const { getPost } = useContext(PostContext);
    const history = useHistory();
    const { postId } = useParams();

    useEffect(() => {
        getAllTags()
        // .then(() => {
        //     if (postId) {
        //     getPost(postId)
        //     .then(post => {
        //         setPostInput(post)
        //         setIsLoading(false)
        //     })
        //     } else {
        //     setIsLoading(false)
        //     }
        // })
    }, []);

    const handleClickSaveTags = (event) => {
        event.preventDefault();
        if (postId) {
            addPostTag({
                userProfileId: userProfileId,
                Title: postInput.title,
                Content: postInput.content,
                createDateTime: printDate(),
                PublishDateTime: printDate(),
                ImageLocation: postInput.imageLocation,
                CategoryId: parseInt(postInput.categoryId),
                IsApproved: true
            })
            .then((parsedRes) => history.push(`/posts/${parsedRes.id}`))
        }
    }

    return (
        <FormGroup>
                <Label for="exampleSelectMulti">Select Multiple</Label>
                <Input type="select"
                    multiple
                    name="tags"
                    id="tags"
                    required>
                    {tags.map((tag) => (
                    <option key={tag.id} selected value={tag.id}>{tag.name}</option>
                    ))}
                </Input>
                <Button color="primary" onClick={handleClickSaveTags}>Add Tags</Button>
        </FormGroup>
    )
};

export default ManageTags;
