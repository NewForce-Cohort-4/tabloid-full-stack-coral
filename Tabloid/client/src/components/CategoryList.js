import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../providers/CategoryProvider";
import { Container, Table } from "reactstrap";
import Category from "./Category";


const CategoryList = () => {

    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            <Container className="justify-content-center" fluid={true}>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat, index) => {
                            cat.listIndex = index+1;
                            return <Category key={cat.id} category={cat} />
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    )
    
};

export default CategoryList;