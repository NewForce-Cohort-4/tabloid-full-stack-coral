import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button
} from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { CategoryContext } from "../providers/CategoryProvider"
import { useHistory, useParams } from "react-router-dom";

const PostForm = () => {
  const { addPost, post, updatePost } = useContext(PostContext);
  const { categories, getAllCategories } = useContext(CategoryContext);
  const [categoryId, setCategoryId] = useState();
  const [imageLocation, setImageLocation] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    getAllCategories();
  }, [])

  const { postId } = useParams();

  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))

  const submit = () => {
    if(postId){
        setIsLoading(true)
        updatePost({
            id: post.id,
            title: post.title,
            content: post.content,
            imageLocation: post.imageLocation
        })
        .then(() => history.push(`/posts`))
    } else {
    const newPost = {
      title,
      content,
      imageLocation,
      createDateTime: new Date(),
      publishDateTime: new Date(),
      isApproved: true,
      categoryId,
      userProfileId: userProfile.id
    };

    addPost(newPost).then((newlyCreatedPost) => {
      // Navigate the user to post details of the post that was just created
      history.push(`/post/${newlyCreatedPost.id}`)
    });
    }
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <h1>Add A New Post</h1>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" name="title" onChange={(e) => setTitle(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="content" name="content">Content</Label>
                <Input
                  id="content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="imageLocation">Image URL</Label>
                <Input
                  id="imageLocation" name="imageLocation"
                  onChange={(e) => setImageLocation(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                    <Label for="exampleSelectMulti">Select A Category</Label>
                    <Input type="select" name="select" id="exampleSelect" onClick={(e) => setCategoryId(parseInt(e.target.value))}>
                        {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </Input>
              </FormGroup>
            </Form>
            <Button color="info" onClick={() => submit()}>
              SUBMIT
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PostForm;