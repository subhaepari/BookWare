import { React, useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Row, Col, Tabs, Tab } from "react-bootstrap";

import Home from "./Home";
import GenreManager from "./GenreManager";
import BookManager from "./BookManager";
import SearchBar from "./SearchBar";

import "../styles/styles.css";

export default function BooksPageHeader(props) {
  const {
    addCallback: handleAddBookOffCanvasShow,
    searchCallback: searchBooksByTitle,
    searchByStr,
  } = props;

  let bgcolor = "green";
  let textcolor = "white";

  return (
    <>
      <Navbar id="header-nav-bar" expand="lg" className="">
        <Container fluid>
          <Navbar.Brand href="#">
            <div className="logo-div">
              <h1 className="logo">BookWare </h1>
              <h6 class="logo-foot">A Software for BookStore</h6>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="navbar-id">
            <Nav
              id="header-nav"
              className="ms-auto"
              defaultActiveKey="homekey"
              navbarScroll
            >
              <Nav.Item className="d-flex me-auto">
                <Nav.Link
                  eventKey="addkey"
                  className="me-5"
                  onClick={() => {
                    handleAddBookOffCanvasShow();
                  }}
                >
                  <img src="images/icons/book-red.64.png" title="Add a Book" />
                </Nav.Link>
                <Nav.Link
                  eventKey="authorskey"
                  className="me-5"
                  href="/authors"
                >
                  <img
                    src="images/icons/author-female.64.png"
                    title="Go to Authors Page"
                  />
                  <img
                    src="images/icons/author-male.64.png"
                    title="Go to Authors Page"
                  />
                </Nav.Link>
                <Nav.Link eventKey="homekey" className="me-5" href="/home">
                  <img
                    src="images/icons/yellow-home.64.png"
                    title="Go to Home Page"
                  />
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <SearchBar
              searchCallback={searchBooksByTitle}
              searchByStr={searchByStr}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
