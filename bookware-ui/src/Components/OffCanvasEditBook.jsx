import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function OffCanvasAddBook(props) {
  const {
    showOffCanvas,
    handleClose,
    onSubmitHandle,
    authors,
    genres,
    bookToEdit,
  } = props;

  const defaultTitle = bookToEdit.title;
  const defaultSummary = bookToEdit.summary;
  const defaultPrice = bookToEdit.price;
  const defaultPublishDate = getFormattedDateString(
    bookToEdit.publication_date
  );
  const defaultGenreId = bookToEdit.genre_id;
  const defaultAuthorId = bookToEdit.author_id;

  function getFormattedDateString(dateStr) {
    let date = new Date(dateStr);

    let month = date.getMonth() + 1;
    let day = date.getDate();

    return (
      date.getFullYear() +
      "-" +
      (month.toString().length === 1 ? "0" + month : month) +
      "-" +
      (day.toString().length === 1 ? "0" + day : day)
    );
  }

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={handleClose}
      placement="end"
      id="offcanvas-editbook"
      //  backdrop="static"
    >
      <Offcanvas.Header
        style={{ marginTop: "30px", marginLeft: "50px" }}
        closeButton
      >
        <Offcanvas.Title id="offcanvas-addbook-title">
          <span className="offcanvas-heading-line">
            Edit & Update Book Details:
          </span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          style={{ marginTop: "30px", marginLeft: "50px", marginRight: "50px" }}
        >
          <Form className="mt-50" onSubmit={onSubmitHandle}>
            <div className="d-grid gap-3">
              <Form.Group controlId="etitle-frmgrp-id">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="book_title"
                  defaultValue={defaultTitle}
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="egenre-frmgrp-id">
                <Form.Label>Genre</Form.Label>
                <Form.Select
                  id="egenre-select-id"
                  name="book_genre_id"
                  // ref={categoriesForUpdateTaskRef}
                  size="sm"
                  className="mb-3"
                  defaultValue={defaultGenreId}
                >
                  <option value="">Choose...</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.genre_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="eauthor-frmgrp-id">
                <Form.Label>Author</Form.Label>
                <Form.Select
                  id="eauthors-select-id"
                  name="book_author_id"
                  // ref={categoriesForUpdateTaskRef}
                  size="sm"
                  className="mb-3"
                  defaultValue={defaultAuthorId}
                >
                  <option value="">Choose...</option>
                  {authors.map((auth) => (
                    <option key={auth.id} value={auth.id}>
                      {auth.author_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="eprice-frmgrp-id">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="book_price"
                  defaultValue={defaultPrice}
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="summary-frmgrp-id">
                <Form.Label>Summary</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  name="book_summary"
                  defaultValue={defaultSummary}
                  placeholder=""
                />
              </Form.Group>

              <Form.Group controlId="epublish-date-frmgrp-id">
                <Form.Label>Publication Date</Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="book_publish_date"
                  defaultValue={defaultPublishDate}
                  placeholder=""
                />

                <input
                  id="bookId-frm-id"
                  name="bookIdForUpdate"
                  value={bookToEdit.id}
                  type="text"
                  hidden
                />
              </Form.Group>

              <Button
                id="offcanvas-update-btn"
                variant="outline-warning"
                size="sm"
                type="submit"
              >
                <span style={{ color: "black" }}>Submit</span>
              </Button>
            </div>
          </Form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
