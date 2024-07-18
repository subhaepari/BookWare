import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function OffCanvasAddBook(props) {
  const { showOffCanvas, handleClose, onSubmitHandle, authors, genres } = props;

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={handleClose}
      placement="end" //"bottom" //end
      id="offcanvas-addbook"
      //backdrop="static"
    >
      <Offcanvas.Header style={{ marginTop: "30px", marginLeft: "50px"  }} closeButton>
        <Offcanvas.Title id="offcanvas-addbook-title">
        <span className="offcanvas-heading-line"> Add a book:</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          style={{ marginTop: "30px", marginLeft: "50px", marginRight: "50px" }}
        >
          <Form className="mt-50" onSubmit={onSubmitHandle}>
            <div className="d-grid gap-3">


              
              <Form.Group controlId="title-frmgrp-id">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="book_title"
                  placeholder=""
                  // onChange={usernameAvalabilityChk}
                />
              </Form.Group>

              {/* <FloatingLabel
                controlId="title-add-frm-id"
                label="Title"
                className="mb-3"
              >
                <Form.Control
                  size="sm"
                  type="text"
                  name="book_title"
                  placeholder=""
                  
                />
              </FloatingLabel> */}

              <Form.Group controlId="genre-frmgrp-id">
                <Form.Label>Genre</Form.Label>
                <Form.Select
                  id="genre-select-id"
                  name="book_genre_id"
                  size="sm"
                  className="mb-3"
                >
                  <option value="">Choose...</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.genre_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="author-frmgrp-id">
                <Form.Label>Author</Form.Label>
                <Form.Select
                  id="authors-select-id"
                  name="book_author_id"
                  size="sm"
                  className="mb-3"
                >
                  <option value="">Choose...</option>
                  {authors.map((auth) => (
                    <option key={auth.id} value={auth.id}>
                      {auth.author_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="price-frmgrp-id">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="book_price"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="summary-frmgrp-id">
                <Form.Label>Summary</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  name="book_summary"
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="publish-date-frmgrp-id">
                <Form.Label>Publication Date</Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="book_publish_date"
                  placeholder=""
                />
              </Form.Group>

              <Button id="offcanvas-add-btn" variant="outline-warning" size="sm" type="submit">
              <span style={{color: "black"}}>Submit</span>
              </Button>
            </div>
          </Form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
