import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams } from "react-router-dom";
import { Alert, Button } from "reactstrap";

const CategoryForm = () => {
  const { addCategory, getCategory, updateCategory } = useContext(CategoryContext);
  const [ category, setCategory ] = useState({});

  const [ isLoading, setIsLoading ] = useState(true);

  const history = useHistory();

  const { catId } = useParams();

  useEffect(() => { 
    if(catId) {
      getCategory(catId)
      .then(setCategory)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
   }, [])

  const handleControlledInputChange = (event) => {
    const newCategory = { ...category };
    newCategory[event.target.name] = event.target.value;
    setCategory(newCategory);
  };

  const handleSaveCategory = () => {
    if (!isLoading && catId) {
        updateCategory({
          Id: parseInt(catId),
          Name: category.name
        })
        .then(setCategory({}))
        .then(history.push("/categories"));
      } else if (!isLoading) {
        addCategory({
          name: category.name
        })
          .then(setCategory({}))
          .then(history.push("/categories"));
      }
    } 
  

  return (
    <form className="categoryForm">
      <h2 className="categoryForm__name">{catId ? <>Update Category</>:<>New Category</>}</h2>
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
      { isLoading ? 
          <Button
          color="primary"
          style={{marginRight: '.5rem'}}
          disabled
          >        
            {catId ? <>Save Update</>:<>Add Category</>}
          </Button>
          :
          <Button
          color="primary"
          style={{marginRight: '.5rem'}}
          onClick={(event) => {
            event.preventDefault();
            handleSaveCategory();
          }}> {catId ? <>Save Update</>:<>Add Category</>}
          </Button>
      }
      
      {
        catId ? 
          <Button color="secondary" onClick={() => {
            setCategory({})
            history.push("/categories")
          }}>
            Cancel
          </Button>
          :
          <div></div>
      }
    </form>
  );
};

export default CategoryForm;
