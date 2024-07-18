import React, { useState } from "react";

import { Form, Button, FloatingLabel, Offcanvas } from "react-bootstrap";

export default function OffCanvasAddAuthor(props) {
  const { showOffCanvas, handleClose, onSubmitHandle } = props;

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={handleClose}
      placement="end" //"bottom" //end
      id="offcanvas-add-author"
      // backdrop="static"
    >
      <Offcanvas.Header style={{ marginTop: "30px", marginLeft: "50px" }} closeButton>
        <Offcanvas.Title id="offcanvas-title-add-book">
          <span className="offcanvas-heading-line">Add an Author:</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          style={{ marginTop: "30px", marginLeft: "50px", marginRight: "50px" }}
        >
          <Form className="mt-50" onSubmit={onSubmitHandle}>
            <div className="d-grid gap-3">
              <FloatingLabel
                controlId="authorname-add-frm-id"
                label="Author Name"
                className="mb-3"
              >
                <Form.Control
                  name="author_name"
                  type="text"
                  size="sm"
                  placeholder="aaaa"
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="biograpphy-add-frm-id"
                label="Biography"
                className="mb-3"
              >
                <Form.Control
                  name="author_biography"
                  as="textarea"
                  rows={25}
                  placeholder=""
                  //   autoResizeEnabled={true}
                  // minHeight={20}
                  // maxHeight={50}
                />
              </FloatingLabel>

              <Button
                variant="outline-warning"
                id="offcanvas-add-author-btn"
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
