import React, { useState, useContext } from "react";
import {
  Form,
  FormGroup,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import { PostContext } from "../providers/PostProvider";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostForm = () => {
  const { addPost } = useContext(PostContext);
  const { getUserProfile } = useContext(UserProfileContext);
  const [userProfileId, setUserProfileId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [createDateTime, setCreateDateTime] = useState("");
  const [publishDateTime, setPublishDateTime] = useState("");
  const [isApproved, setIsApproved] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Use this hook to allow us to programatically redirect users
  const history = useHistory();

  const submit = (e) => {
    const post = {
      title,
      content,
      imageLocation,
      createDateTime: new Date(),
      publishDateTime,
      isApproved,
      categoryId: +categoryId,
      userProfileId: +userProfileId
    };

    addPost(post).then((p) => {
      // Navigate the user back to the home route
      history.push("/");
    });
  };

  return (
    <div className="container pt-4">
      <div className="row justify-content-center">
        <Card className="col-sm-12 col-lg-6">
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="userId">User Id (For Now...)</Label>
                <Input
                  id="userId"
                  onChange={(e) => setUserProfileId(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="imageLocation">Image URL</Label>
                <Input
                  id="imageLocation"
                  onChange={(e) => setImageLocation(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" onChange={(e) => setTitle(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  id="content"
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormGroup>
            </Form>
            <Button color="info" onClick={submit}>
              SUBMIT
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PostForm;