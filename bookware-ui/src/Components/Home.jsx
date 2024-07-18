import React from "react";
import { Image, Container, Row, Col, Button, Figure } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div id="home-main-div">
      <div className="logo-div">
        <h1 className="logo">BookWare </h1>
        <h6 class="logo-foot">A Software for BookStore</h6>
      </div>

      <div id="home-main-inner-div">
        <Container>
          <Row className="p-5 g-3">
            <Col md={4} className="text-center mb-10">
              <Button
                variant="warning"
                onClick={() => {
                  navigate("/books");
                }}
              >
                <Figure>
                  <Figure.Image
                    width={400}
                    alt="171x180"
                    src="images/home/bookshelf-btn-img.png"
                  />
                  <Figure.Caption>
                    <strong>Manage Books</strong>
                  </Figure.Caption>
                </Figure>
              </Button>
            </Col>
            <Col md={4} className="text-center  mb-10">
              <Button
                variant="warning"
                onClick={() => {
                  navigate("/authors");
                }}
                className="justify-self-center"
              >
                <Figure>
                  <Figure.Image
                    width={250}
                    alt="171x180"
                    src="images/home/authors-btn-img.jpeg"
                  />
                  <Figure.Caption>
                    <strong>Manage Authors</strong>
                  </Figure.Caption>
                </Figure>
              </Button>
            </Col>
            <Col md={4} className="text-center mb-10">
              <Button
                variant="warning"
                // onClick={() => {
                //   navigate("/genres");
                // }}
              >
                <Figure>
                  <Figure.Image
                    width={310}
                    alt="171x180"
                    src="images/home/genre-books-btn-img.jpeg"
                  />
                  <Figure.Caption>
                    <strong>Manage Genres</strong>
                  </Figure.Caption>
                </Figure>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="home-line-div">
        <p className="home-line text-end">
          A Great Way to Manage Your BookStore with Ease!!!{" "}
        </p>
      </div>
    </div>
  );
}
