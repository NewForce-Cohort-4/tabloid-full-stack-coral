import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import { useHistory, useParams } from "react-router-dom";
import { Alert } from "bootstrap";

const CategoryForm = () => {
  const { addCategory } = useContext(CategoryContext);
  const [category, setCategory] = useState({});
  const history = useHistory();


  const handleControlledInputChange = (event) => {
    //When changing a state object or array,
    //always create a copy make changes, and then set state.
    const newCategory = { ...category };
    //task is an object with properties.
    //set the property to the new value
    newCategory[event.target.name] = event.target.value;
    //update state
    setCategory(newCategory);
  };

  const handleSaveCategory = () => {
    if (category.name) {
        addCategory({
          name: category.name
        })
          .then(setCategory({}))
          .then(history.push("/categories"));
      }
    } 
  

  return (
    <form className="categoryForm">
      <h2 className="categoryForm__name">New Category</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Category name: </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoFocus
            className="form-control"
            placeholder={category.name}
            onChange={handleControlledInputChange}
            defaultValue={category.name}
          />
        </div>
      </fieldset>
      <button
        className="btn btn-primary"
        onClick={(event) => {
          event.preventDefault();
          handleSaveCategory();
        }}
      >
        Add Category
      </button>
    </form>
  );
};

export default CategoryForm;
