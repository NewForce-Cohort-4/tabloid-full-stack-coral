import React, { useContext, useEffect, useState } from "react";
import { TagContext } from "../providers/TagProvider";
import {
  Card,
  CardTitle,
  CardImg,
  CardBody,
  Badge,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
const TagList = () => {
  const { tags, getAllTags, deleteTag } = useContext(TagContext);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    getAllTags();
  }, []);

const toggle = () => setModal(!modal);

  return (
    <>
      <Container className="card-list-container" fluid={true}>
        <div className="col justify-content-center">
          {tags.map((tag) => (
            <>
              <Card className="m-4 p-2">
                <CardTitle tag="h3">{tag.name}</CardTitle>
                <Button color="danger" size="sm" onClick={toggle}>
                  Delete
                </Button>
                <Modal
                  isOpen={modal}
                  toggle={toggle}
                  style={{ textAlign: "center" }}
                >
                  <ModalHeader>Delete Post: {tag.name}</ModalHeader>
                  <ModalBody>
                    <b>Please confirm you would like to delete the post:</b>
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
          ))}
        </div>
      </Container>
    </>
  );
};

export default TagList;
