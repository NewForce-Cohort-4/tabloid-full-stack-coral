import React, { useContext, useEffect } from "react";
import { TagContext } from "../providers/TagProvider";
import {
  Button,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import Tag from "./Tag"

const TagList = () => {
  const { tags, getAllTags } = useContext(TagContext);
  useEffect(() => {
    getAllTags();
  });


  return (
    <>
      <Button color="primary">
        <Link to={`/tags/create`} style={{ color: "white" }}>
          Create Tag
        </Link>
      </Button>
      <Container className="card-list-container" fluid={true}>
        <div className="col justify-content-center">
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default TagList;
