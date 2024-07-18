import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "./Spinner";
import useFetch from "../Hooks/useFetch";
import { Card, Container, Row, Col, Nav, Button, Stack, Accordion, Image } from "react-bootstrap";


import Author from "./Author";

export default function AuthorList(props) {
  const { authors: authors } = props;

  function handleDelete(authorid) {
   
    props.onDelete(authorid);
  }
  function handleEdit(author) {
     props.onEdit(author);
  
  }

  return (

    <>
    <div className="page-heading-line-div">
        <h3>{"\u00A0\u00A0\u00A0"}Authors <span style={{fontSize: "20px"}}> -  With All Due Respect</span></h3>
    </div>

    <div id="author-list-div">


      <section id="authors-section">
        {authors.length == 0 && (
          <h6 style={{ marginLeft: "100px" }}> No authors to display!</h6>
        )}

        <Accordion id="authors-accordian">
          {authors.map((author) => (
            <Accordion.Item id="authors-accordian-item" eventKey={author.id} >
              <Accordion.Header id="authors-accordian-header"> <strong><span style={{color: "rgb(1, 33, 36)"}}>{author.author_name} </span></strong></Accordion.Header>
              <Accordion.Body id="authors-accordian-body">
                <div>
                  <h6>About the author:</h6>
                  <p>{author.biography}</p>
              
                    <Stack direction="horizontal" gap={3} className="justify-content-end">
                    <Button variant="outline-warning"  onClick={() => {handleEdit(author)}}>
                    <span style={{color: "black"}}>Edit Author</span>
                    </Button>
                    <Button variant="outline-warning"  onClick={() => {handleDelete(author.id)}}>
                    <span style={{color: "black"}}>Delete Author</span>
                    </Button>
                    </Stack>      
                 
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
    </div>
    </>
  );
}


