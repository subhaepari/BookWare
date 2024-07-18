import { React, useState, useRef } from "react";
import {
  Button,
  ToastContainer,
  Toast,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import useFetch from "../Hooks/useFetch";
import Spinner from "./Spinner";
import AuthorList from "./AuthorList";

import OffCanvasAddAuthor from "./OffCanvasAddAuthor";
import OffCanvasEditAuthor from "./OffCanvasEditAuthor";
import SearchBar from "./SearchBar";
import AuthorsPageHeader from "./AuthorsPageHeader";

const baseUrl = "http://localhost:3000/";

export default function AuthorManager() {
  const [showAddSuccessToast, setShowAddSuccessToast] = useState(false);
  const [showAddFailureToast, setShowAddFailureToast] = useState(false);

  const [showEditSuccessToast, setShowEditSuccessToast] = useState(false);
  const [showEditFailureToast, setShowEditFailureToast] = useState(false);

  const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);
  const [showDeleteFailureToast, setShowDeleteFailureToast] = useState(false);

  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const handleAddAuthorOffCanvasClose = () => setShowAddAuthor(false);
  const handleAddAuthorOffCanvasShow = () => setShowAddAuthor(true);

  const [showEditAuthor, setShowEditAuthor] = useState(false);
  const handleEditAuthorOffCanvasClose = () => setShowEditAuthor(false);
  const handleEditAuthorOffCanvasShow = () => setShowEditAuthor(true);

  const [authorSearchTerm, setAuthorSearchTerm] = useState("");

  let authorToEditRef = useRef({});

  const url = `api/authors/`;
  const {
    data: allAuthors,
    setData: setAllAuthors,
    loading: loadingAuthors,
    error: errorRetrievingAuthors,
  } = useFetch(url);

  if (errorRetrievingAuthors) throw errorRetrievingAuthors;

  if (loadingAuthors) return <Spinner />;

  if (allAuthors == null) return "Authors not Loaded...";

  let showAuthors = null;

  if (exists(authorSearchTerm) && authorSearchTerm.length > 0) {
    let lowerCaseSearchTerm = authorSearchTerm.toLowerCase();
    showAuthors = allAuthors.filter(
      (author) =>
        author.author_name.toLowerCase().indexOf(lowerCaseSearchTerm) >= 0
    );
  } else showAuthors = allAuthors;

  function exists(obj) {
    return typeof obj != "undefined" && obj != null ? true : false;
  }

  function addAuthor(event) {
    console.log("entered add author");

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());

    async function addAuthorOnServer() {
      try {
        let newAuthorObj = {
          author_name: formDataObj.author_name,
          biography: formDataObj.author_biography,
        };

        const response = await fetch(`${baseUrl}api/authors/`, {
          method: "POST",
          body: JSON.stringify(newAuthorObj),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.ok) {
          const json = await response.json();

          if (json.id === undefined || json.id === null) {
            console.log("Author could not be added on server.");
            throw "Author could not be added on server.";
          }

          console.log(`Added author successfully with id: ${json.id}`);
          setShowAddSuccessToast(true);
          handleAddAuthorOffCanvasClose();

          // Adding new book to existing list, Re-rendering component
          setAllAuthors([...allAuthors, json]);
        } else {
          // alert("response not ok :" + response);
          throw response;
        }
      } catch (e) {
        setShowAddFailureToast(true);
        handleAddAuthorOffCanvasClose();
      }
    }

    addAuthorOnServer();
  }

  function deleteAuthor(authorid) {
    async function deleteAuthorOnServer() {
      try {
        console.log(`Got to delete  : ${baseUrl}api/authors/${authorid}`);

        const response = await fetch(`${baseUrl}api/authors/${authorid}`, {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.ok) {
          if (response.status === 204) {
            console.log(`Deleted successfully author with id: ${authorid}`);

            setShowDeleteSuccessToast(true);

            let filteredAuthors = allAuthors.filter((a) => a.id !== authorid);
            setAllAuthors(filteredAuthors);
          } else if (response.status === 404) {
            throw "Author not found. ";
          } else {
            throw "Got server response but delete unsuccessful ";
          }
        } else {
          throw `Response not ok.`;
        }
      } catch (e) {
        setShowDeleteFailureToast(true);
        console.log(`Caught error deleting author ${baseUrl}api/authors/${authorid}. 
                      Error: ${e.message}`);
      }
    }

    deleteAuthorOnServer();
  }

  function editAuthor(author) {
    authorToEditRef.current = author;
    handleEditAuthorOffCanvasShow();
  }

  function updateAuthor(event) {
    console.log("entered update author");

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());

    async function updateAuthorOnServer() {
      try {
        let authorId = formDataObj.authorIdForUpdate;
        let updateAuthorObj = {
          author_name: formDataObj.author_name,
          biography: formDataObj.author_biography,
        };

        const response = await fetch(`${baseUrl}api/authors/${authorId}`, {
          method: "PUT",
          body: JSON.stringify(updateAuthorObj),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.ok) {
          const updatedAuthor = await response.json();

          if (updatedAuthor.id === undefined || updatedAuthor.id === null) {
            console.log("Author could not be updated on server.");
            throw "Author could not be updated on server.";
          }

          console.log(
            `Updated author successfully with id: ${updatedAuthor.id}`
          );

          setShowEditSuccessToast(true);
          handleEditAuthorOffCanvasClose();

          let updatedAuthorList = allAuthors.map((a) => {
            if (a.id === updatedAuthor.id) {
              a = updatedAuthor;
            }
            return a;
          });

          // Updating the book in the existing list, Re-rendering component
          setAllAuthors([...updatedAuthorList]);
        } else {
          throw response;
        }
      } catch (e) {
        setShowEditFailureToast(true);
        handleEditAuthorOffCanvasClose();
      }
    }

    updateAuthorOnServer();
  }

  function searchAuthorByName(searchStr) {
    setAuthorSearchTerm(searchStr);
  }

  return (
    <>
      <div id="author-main-div">
        <AuthorsPageHeader
          addCallback={handleAddAuthorOffCanvasShow}
          searchCallback={searchAuthorByName}
          searchByStr="Search by Author Name..."
        />

        <section id="authors-sec">
          <div id="authorLayoutDiv">
            <AuthorList
              authors={showAuthors}
              onDelete={deleteAuthor}
              onEdit={editAuthor}
            />
          </div>
        </section>
        <section id="AddAuthor-OffCanvas-Section">
          <OffCanvasAddAuthor
            showOffCanvas={showAddAuthor}
            handleClose={handleAddAuthorOffCanvasClose}
            onSubmitHandle={addAuthor}
          />
        </section>
        <section id="EditAuthor-OffCanvas-Section">
          <OffCanvasEditAuthor
            showOffCanvas={showEditAuthor}
            handleClose={handleEditAuthorOffCanvasClose}
            onSubmitHandle={updateAuthor}
            authorToEdit={authorToEditRef.current}
          />
        </section>

        <ToastContainer
          className="p-3"
          position="middle-center"
          style={{ position: "fixed", zIndex: 1, color: "white" }}
        >
          <Toast
            show={showAddSuccessToast}
            onClose={() => setShowAddSuccessToast(false)}
            delay={5000}
            bg="success"
            autohide
          >
            <Toast.Header closeVariant="white" style={{ color: "green" }}>
              {" "}
              <strong className="me-auto">Success! 😊 </strong>
            </Toast.Header>
            <Toast.Body>
              Author added successfully to Bookware repository.
            </Toast.Body>
          </Toast>
          <Toast
            show={showAddFailureToast}
            onClose={() => setShowAddFailureToast(false)}
            delay={5000}
            bg="danger"
            autohide
          >
            <Toast.Header closeVariant="white" style={{ color: "red" }}>
              {" "}
              <strong className="me-auto">Failure! 😞 </strong>
            </Toast.Header>
            <Toast.Body>
              Failed adding author to the Bookware repository.
            </Toast.Body>
          </Toast>

          <Toast
            show={showEditSuccessToast}
            onClose={() => setShowEditSuccessToast(false)}
            delay={5000}
            bg="success"
            autohide
          >
            <Toast.Header closeVariant="white" style={{ color: "green" }}>
              {" "}
              <strong className="me-auto">Success! 😊 </strong>
            </Toast.Header>
            <Toast.Body>
              Author updated successfully on Bookware repository.
            </Toast.Body>
          </Toast>
          <Toast
            show={showEditFailureToast}
            onClose={() => setShowEditFailureToast(false)}
            delay={5000}
            bg="danger"
            autohide
          >
            <Toast.Header closeVariant="white" style={{ color: "red" }}>
              {" "}
              <strong className="me-auto">Failure! 😞 </strong>
            </Toast.Header>
            <Toast.Body>
              Failed updating author on the Bookware repository.
            </Toast.Body>
          </Toast>

          <Toast
            show={showDeleteSuccessToast}
            onClose={() => setShowDeleteSuccessToast(false)}
            delay={5000}
            bg="success"
            autohide
          >
            <Toast.Header closeVariant="white" style={{ color: "green" }}>
              {" "}
              <strong className="me-auto">Success! 😊 </strong>
            </Toast.Header>
            <Toast.Body>
              Author deleted successfully from Bookware repository.
            </Toast.Body>
          </Toast>
          <Toast
            show={showDeleteFailureToast}
            onClose={() => setShowDeleteFailureToast(false)}
            delay={5000}
            bg="danger"
            autohide
          >
            <Toast.Header closeVariant="white" style={{ color: "red" }}>
              {" "}
              <strong className="me-auto">Failure! 😞 </strong>
            </Toast.Header>
            <Toast.Body>
              Failed deleting author on the Bookware repository. Cannot delete
              an author, if there are books in the repository belonging to the
              author.
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </>
  );
}
