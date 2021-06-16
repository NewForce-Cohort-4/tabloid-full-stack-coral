import React, { useContext, useEffect, useState } from "react"
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button
} from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { CategoryContext } from "../../providers/CategoryProvider"
import { useHistory, useParams } from "react-router-dom";

const PostForm = () => {
    const { addPost, getPost, updatePost } = useContext(PostContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [postInput, setPostInput] = useState({});
    const userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const {postId} = useParams();
    const history = useHistory();

    // wait for data before burron is active
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllCategories()
        .then(() => {
            if (postId) {
              getPost(postId)
              .then(post => {
                setPostInput(post)
                setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
    }, []);

    const printDate = () => {
      const d = new Date();
      const timeOffset = d.getTimezoneOffset() * 60000;
      if (d.getTimezoneOffset() > 0) {
        d.setTime(d.getTime() - timeOffset);
      } else {
        d.setTime(d.getTime() + timeOffset);
      }
      return d;
    };

    //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (event) => {
        //creating a copy of state to change and then set, using spread syntax to copy an object
        let newPost = { ...postInput }
        //post is an object with properties , set the property to the new value using obejct bracket notation
        newPost[event.target.id] = event.target.value
        //update state
        setPostInput(newPost)
    }

    const handleClickSavePost = (event) => {
        event.preventDefault();
        setIsLoading(true);
        // debugger
        if (postId) {
            // debugger
            // PUT update
            updatePost({
                Id: parseInt(postId),
                userProfileId: userProfileId,
                Title: postInput.title,
                Content: postInput.content,
                createDateTime: postInput.createDateTime,
                PublishDateTime: postInput.publishDateTime,
                ImageLocation: postInput.imageLocation,
                CategoryId: parseInt(postInput.categoryId),
                IsApproved: true
            })
            .then(() => history.push(`/posts/${postId}`))
        } else {
            // debugger
            addPost({
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
        <div className="container pt-4">
        <div className="row justify-content-center">
          <Card className="col-sm-12 col-lg-6">
            <CardBody>
              <h1>Add A New Post</h1>
              <Form>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={postInput.title} />
                </FormGroup>
                <FormGroup>
                  <Label for="content" name="content">Content</Label>
                  <Input
                    type="text" id="content" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Content" value={postInput.content}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="imageLocation">Image URL</Label>
                  <Input
                    type="text" id="imageLocation" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Image URL" value={postInput.imageLocation}
                  />
                </FormGroup>
                <FormGroup>
                      <Label for="exampleSelectMulti">Select A Category</Label>
                      <Input type="select" value={postInput.categoryId}
                          name="category"
                          id="categoryId"
                          onChange={handleControlledInputChange}
                          required>
                          {categories.map((category) => (
                          category.id === postInput.categoryId? <option key={category.id} selected value={category.id}>{category.name}</option> : <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                      </Input>
                </FormGroup>
              </Form>
              <Button  onClick={handleClickSavePost} disable={isLoading.toString()}>
                    {postId ? <>Save Post</> : <>Add Post</>}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    )
};

export default PostForm;