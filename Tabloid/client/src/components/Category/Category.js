import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"
import {
  Card,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";

const Category = ({ category }) => {
    const { getAllCategories, deleteCategory } = useContext(CategoryContext);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
      <>
        <tr>
          <th scope="row">{category.listIndex}</th>
          <td>
            <h4>{category.name}</h4>
          </td>
          <td>
            <Button color="danger" size="sm" onClick={toggle}>
              Delete
            </Button>
          </td>

          <Modal isOpen={modal} toggle={toggle} style={{ textAlign: "center" }}>
            <ModalHeader>Delete Tag: {category.name}</ModalHeader>
            <ModalBody>
              <b>Please confirm you would like to delete the tag:</b>
              <br /> <em>{category.name}</em>
              <br />
              <br />
              This action <b>can not</b> be undone.
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => {
                  deleteCategory(category.id).then(getAllCategories);
                  toggle();
                }}
              >
                Delete
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </tr>
      </>
    );
};

export default Category;