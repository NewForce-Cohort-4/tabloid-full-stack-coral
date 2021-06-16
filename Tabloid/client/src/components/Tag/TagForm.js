import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
import { Alert } from "bootstrap";
import { getTarget } from "reactstrap/lib/utils";

const TagForm = () => {
  const { addTag, getTag, updateTag } = useContext(TagContext);
  const [tag, setTag] = useState({});
  const history = useHistory();
  const { tagId } = useParams();

  useEffect(() => {
    if (tagId) {
      getTag(tagId).then(setTag)
    }
  }, [])

  const handleControlledInputChange = (event) => {
    const newTag = { ...tag };
    newTag[event.target.name] = event.target.value;
    setTag(newTag);
  };
    //Checks to ensure name is provided, calls fetch to add tag, redirects to tags index
  const handleSaveTag = () => {
    if (tag.name) {
      if (tagId) {
        updateTag(tag).then(history.push("/tags"));
      } else {
        addTag({
          name: tag.name,
        })
          .then(setTag({}))
          .then(history.push("/tags"));
      }
    }
    }

  return (
    <form className="tagForm">
      <h2 className="tagForm__name">{tagId ? "Edit Tag" : "New Tag"}</h2>
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
        {tagId ? "Edit Tag" : "Add Tag"}
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {history.push("/tags")}
        }
      >
        Cancel
      </button>
    </form>
  );
};

export default TagForm;
