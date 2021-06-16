import React, { useContext, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import {
  Card,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useHistory } from "react-router-dom";
const Tag = ({ tag }) => {
    const { getAllTags, deleteTag } = useContext(TagContext);
    const [modal, setModal] = useState(false);
  const history = useHistory()
  const toggle = () => setModal(!modal);

  return (
    <>
      <Card className="m-4 p-2">
        <CardTitle tag="h3">{tag.name}</CardTitle>
        <Button
          color="secondary"
          size="sm"
          onClick={() => {
            history.push(`/tags/edit/${tag.id}`);
          }}
        >
          Edit
        </Button>
        <Button color="danger" size="sm" onClick={toggle}>
          Delete
        </Button>
        <Modal isOpen={modal} toggle={toggle} style={{ textAlign: "center" }}>
          <ModalHeader>Delete Tag: {tag.name}</ModalHeader>
          <ModalBody>
            <b>Please confirm you would like to delete the tag:</b>
            <br /> <em>{tag.name}</em>
            <br />
            <br />
            This action <b>can not</b> be undone.
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => {
                deleteTag(tag.id).then(getAllTags);
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
      </Card>
    </>
  );
};
export default Tag;