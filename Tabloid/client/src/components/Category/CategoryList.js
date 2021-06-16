import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Container, Table, Button } from "reactstrap";
import Category from "./Category";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";

const CategoryList = () => {
    const history = useHistory();
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    });

    return (
      <>
        <Container className="justify-content-center" fluid={true}>
          <Button color="primary" onClick={() => history.push("/categories/create")} style={{ color: "white" }}>
              Create Category
          </Button>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => {
                cat.listIndex = index + 1;
                return <Category key={cat.id} category={cat} />;
              })}
            </tbody>
          </Table>
        </Container>
      </>
    );
    
};

export default CategoryList;