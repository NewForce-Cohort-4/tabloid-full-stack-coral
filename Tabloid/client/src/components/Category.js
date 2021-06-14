import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"
import { Table } from "reactstrap";
import { CategoryContext } from "../providers/CategoryProvider";

const Category = ({ category }) => {
    return (
        <>
            <tr>
                <th scope="row">{category.listIndex}</th>
                <td><h4>{category.name}</h4></td>
                {/* Button Placeholder */}
                {/* <td><div><Button>Edit</Button><Button>Delete</Button></div></td> */}
            </tr>
        </>
    )
};

export default Category;