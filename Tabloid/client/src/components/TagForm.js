import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
import { Alert } from "bootstrap";

const TagForm = () => {
  const { addTag } = useContext(TagContext);
  const [tag, setTag] = useState({});
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newTag = { ...tag };
    //task is an object with properties.
    //set the property to the new value
    newTag[event.target.name] = event.target.value;
    //update state
    setTag(newTag);
  };

  const handleSaveTag = () => {
    if (tag.name) {
        addTag({
          name: tag.name,
        })
          .then(setTag({}))
          .then(history.push("/tags"));
      }
    }

  return (
    <form className="tagForm">
      <h2 className="tagForm__name">New Tag</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Tag name: </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoFocus
            className="form-control"
            placeholder={tag.name}
            onChange={handleControlledInputChange}
            defaultValue={tag.name}
          />
        </div>
      </fieldset>
      <button
        className="btn btn-primary"
        onClick={(event) => {
          event.preventDefault();
          handleSaveTag();
        }}
      >
        Add Tag
      </button>
    </form>
  );
};

export default TagForm;
