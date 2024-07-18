import { React, useState } from "react";

import { Card, Container, Row, Col, Nav, Stack, Button } from "react-bootstrap";

export default function Book(props) {
  const [activeTab, setActiveTab] = useState("details");

  const { book: book } = props;

  const book_filepath = `images/books/card-img/${getFileName(
    book.img_file_name
  )}`;

  const age_display =
    book.min_age +
    (book.max_age > book.min_age && book.max_age < 100
      ? "-" + book.max_age
      : "+");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getFileName(filename) {
    return typeof filename == "undefined" ||
      filename == null ||
      filename.length < 1
      ? "dummy.jpg"
      : filename;
  }

  function handleDelete() {
    props.onDelete(book.id);
  }
  function handleEdit() {
    props.onEdit(book);
  }

  function getFormattedDateString(dateStr) {
    let date = new Date(dateStr);

    return (
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
    );
  }

  return (
    <>
      <Card
        bg="info"
        text="green"
        style={{ width: "29rem" }} //initial 30rem
        className="shadow-lg p-2 mb-5 bg-white rounded"
      >
        <Card.Header>
          <Card.Title as="h5">{book.title}</Card.Title>
        </Card.Header>
        <Row className="justify-content-center">
          <Col xs={4} className="align-content-center">
            <Card.Img src={book_filepath} alt="" />
          </Col>

          <Col xs={8}>
            <Nav id="card-tab-nav" variant="tabs" defaultActiveKey="#details">
              <Nav.Item>
                <Nav.Link
                  href="#details"
                  onClick={() => setActiveTab("details")}
                >
                  Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="#summary"
                  onClick={() => setActiveTab("summary")}
                >
                  Summary
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="#actions"
                  onClick={() => setActiveTab("actions")}
                >
                  Actions
                </Nav.Link>
              </Nav.Item>
            </Nav>

            {activeTab === "details" && (
              <Card.Body className="book-card">
                <Card.Text>
                  <small>
                    By <strong>{book.authorRef.author_name}</strong> <br />
                    Genre: <strong>{book.genreRef.genre_name}</strong> <br />
                    M.R.P: <strong>&#x20B9;{book.price}</strong> <br />
                    Age: <strong>{age_display} years</strong> <br />
                    Copies Available: <strong>{book.copies_available}</strong>
                    <br />
                    Published on:{" "}
                    <strong>
                      {getFormattedDateString(book.publication_date)}
                    </strong>
                  </small>
                </Card.Text>
              </Card.Body>
            )}

            {activeTab === "summary" && (
              <Card.Body>
                <Card.Text>
                  <div className="book-card-summary">{book.summary}</div>
                </Card.Text>
              </Card.Body>
            )}

            {activeTab === "actions" && (
              <Card.Body>
                <Card.Text>
                  <div className="book-card-actions">
                    <Stack gap={2} className="mx-auto">
                      <Button variant="outline-warning" onClick={handleEdit}>
                        <span style={{ color: "black" }}>
                          Edit Book Details
                        </span>
                      </Button>
                      <Button variant="outline-warning">
                        <span style={{ color: "black" }}>
                          Upload Cover Page
                        </span>
                      </Button>
                      <Button variant="outline-warning" onClick={handleDelete}>
                        <span style={{ color: "black" }}>Delete Book</span>
                      </Button>
                    </Stack>
                  </div>
                </Card.Text>
              </Card.Body>
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
}
