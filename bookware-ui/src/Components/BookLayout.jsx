import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "./Spinner";
import useFetch from "../Hooks/useFetch";

import { Card, Container, Row, Col, Nav } from "react-bootstrap";

import Book from "./Book";

export default function BookLayout(props) {
  const { books: books } = props;

  return (
    <>
      <div className="page-heading-line-div">
        <h3>
          {" "}
          {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} Books
          <span style={{ fontSize: "20px" }}> - In Your Store</span>
        </h3>
      </div>

      <div id="books-layout-div">
        {books.length == 0 && (
          <h6 style={{ marginLeft: "100px" }}> No books to display!</h6>
        )}

        <Container fluid>
          <Row md={2} lg={3}>
            {books.map((book) => (
              <Col>
                <Book
                  key={book.id}
                  book={book}
                  onDelete={props.onDelete}
                  onEdit={props.onEdit}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
