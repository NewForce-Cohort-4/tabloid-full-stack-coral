import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { TagContext } from "../../providers/TagProvider";
import { PostContext } from "../../providers/PostProvider";
import { PostTagContext } from "../../providers/PostTagProvider"
import {
    FormGroup,
    Label,
    Input,
    Button,
    ButtonGroup
  } from "reactstrap";


const ManageTags = () => {

    const { tags, getAllTags } = useContext(TagContext);
    const { addPostTag } = useContext(PostTagContext);
    const [postTagInput, setPostTagInput] = useState([]);
    const [cSelected, setCSelected] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        getAllTags()
    }, []);

    const onCheckboxBtnClick = (selected) => {
        const index = cSelected.indexOf(selected);
        if (index < 0) {
          cSelected.push(selected);
        } else {
          cSelected.splice(index, 1);
        }
        setCSelected([...cSelected]);
      }

    // const handleControlledInputChange = (event) => {
    //     //creating a copy of state to change and then set, using spread syntax to copy an object
    //     let newPostTag = { ...postTagInput }
    //     //post is an object with properties , set the property to the new value using obejct bracket notation
    //     newPostTag[event.target.id] = event.target.value
    //     //update state
    //     setPostTagInput(newPostTag)
    //     // tagsArray.push(newPostTag)
    // }

    const handleClickSaveTags = (event) => {
        event.preventDefault();
        cSelected.forEach(tag => 
            addPostTag({
                postId: id,
                tagId: tag
            })
        )
        history.push(`/posts/${id}`)
    }

    return (
        <FormGroup align="center">
                {/* <Label for="exampleSelectMulti">Select Multiple</Label>
                <Input type="select"
                    multiple
                    name="tags"
                    id="tags"
                    required
                    onChange={handleControlledInputChange}>
                    {tags.map((tag) => (
                    <option key={tag.id} value={postTagInput.tags}>{tag.name}</option>
                    ))}
                </Input>
                <Button color="primary" onClick={handleClickSaveTags}>Add Tags</Button> */}

                <h5>Select Tags To Add To Post</h5>
                <ButtonGroup>
                {tags.map((tag) => (
                    <Button color="primary" onClick={() => onCheckboxBtnClick(tag.id)} active={cSelected.includes(tag.id)} key={tag.id} value={postTagInput.tags}>{tag.name}</Button>
                    ))}
                    {/* <Button color="primary" onClick={() => onCheckboxBtnClick(1)} active={cSelected.includes(1)}>One</Button>
                    <Button color="primary" onClick={() => onCheckboxBtnClick(2)} active={cSelected.includes(2)}>Two</Button>
                    <Button color="primary" onClick={() => onCheckboxBtnClick(3)} active={cSelected.includes(3)}>Three</Button> */}
                </ButtonGroup>
                <Button color="secondary" onClick={handleClickSaveTags}>Add Tags</Button>
        </FormGroup>
    )
};

export default ManageTags;
