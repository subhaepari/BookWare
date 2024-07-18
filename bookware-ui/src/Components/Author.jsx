import React from "react";

import { Card, Container, Row, Col, Nav } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

export default function Author(props) {
  const { author: author, key } = props;


  function handleDelete() {
    props.onDelete(author.id);
  }
  function handleEdit() {
    props.onEdit(author);
  }

  return (
    <>

      <Accordion.Item eventKey={key}>
        <Accordion.Header>{author.author_name}</Accordion.Header>
        <Accordion.Body>
          {author.biography}
        </Accordion.Body>
      </Accordion.Item>

    </>
  );
}
