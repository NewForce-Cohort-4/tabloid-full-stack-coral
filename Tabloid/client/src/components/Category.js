import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"
import { Table } from "reactstrap";
import { CategoryContext } from "../providers/CategoryProvider";

const Category = ({ category }) => {
    return (
        <>
            <tr>
                <th scope="row">{category.id}</th>
                <td><h3>{category.name}</h3></td>
            </tr>
        </>
    )
};

export default Category;