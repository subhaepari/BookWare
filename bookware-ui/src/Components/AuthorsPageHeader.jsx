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
import AuthorManager from "./AuthorManager";
import BookManager from "./BookManager";
import SearchBar from "./SearchBar";

import "../styles/styles.css";

export default function AuthorsPageHeader(props) {
  const {
    addCallback: handleAddAuthorOffCanvasShow,
    searchCallback: searchAuthorByName,
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
                  className="ms-5 me-5"
                  eventKey="addkey"
                  onClick={() => {
                    handleAddAuthorOffCanvasShow();
                  }}
                >
                  <img
                    src="images/icons/add-lady1.64.png"
                    title="Add an Author"
                  />
                </Nav.Link>
                <Nav.Link className="me-5" eventKey="bookskey" href="/books">
                  <img
                    src="images/icons/books2.64.png"
                    title="Go to Books Page"
                  />
                </Nav.Link>
                <Nav.Link className="me-5" eventKey="homekey" href="/home">
                  <img
                    src="images/icons/yellow-home.64.png"
                    title="Go to Home Page"
                  />
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <SearchBar
              searchCallback={searchAuthorByName}
              searchByStr={searchByStr}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
