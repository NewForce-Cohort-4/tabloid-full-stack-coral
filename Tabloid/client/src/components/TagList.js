import React, { useContext, useEffect } from "react";
import { TagContext } from "../providers/TagProvider";
import { Container, Row, Col, Media } from "reactstrap";
import { Card, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
const TagList = () => {
  const { tags, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <>
      <Container className="card-list-container" fluid={true}>
        <div className="col justify-content-center">
          {tags.map((tag) => (
            <>
            <Card className="m-4 p-2">
                <CardTitle tag="h3">{tag.name}</CardTitle>
              </Card>
              </>
          ))}
        </div>
      </Container>
    </>
  );
};

export default TagList;
