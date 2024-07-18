import { React, useState, useRef } from "react";
import { Button, ToastContainer, Toast } from "react-bootstrap";

import useFetch from "../Hooks/useFetch";
import useFetchAll from "../Hooks/useFetchAll";
import Spinner from "./Spinner";
//import PageNotFound from "./PageNotFound";
import BookLayout from "./BookLayout";
import OffCanvasAddBook from "./OffCanvasAddBook";
import OffCanvasEditBook from "./OffCanvasEditBook";
import SearchBar from "./SearchBar";
import BooksPageHeader from "./BooksPageHeader";

const baseUrl = "http://localhost:3000/";

export default function BookManager() {
  const [showAddSuccessToast, setShowAddSuccessToast] = useState(false);
  const [showAddFailureToast, setShowAddFailureToast] = useState(false);

  const [showEditSuccessToast, setShowEditSuccessToast] = useState(false);
  const [showEditFailureToast, setShowEditFailureToast] = useState(false);

  const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);
  const [showDeleteFailureToast, setShowDeleteFailureToast] = useState(false);

  let successToastMessage = useRef("");
  let failureToastMessage = useRef("");


  const [showAddBook, setShowAddBook] = useState(false);
  const handleAddBookOffCanvasClose = () => setShowAddBook(false);
  const handleAddBookOffCanvasShow = () => setShowAddBook(true);

  const [showEditBook, setShowEditBook] = useState(false);
  const handleEditBookOffCanvasClose = () => setShowEditBook(false);
  const handleEditBookOffCanvasShow = () => setShowEditBook(true);

  const [titleSearchTerm, setTitleSearchTerm] = useState("");

  let bookToEditRef = useRef({});

  // When the Component loads first time fetch the Authors and Genres
  const urls = ["api/authors/", "api/genres/"];
  const {
    data,
    loading: loadingData,
    error: errorRetrievingData,
  } = useFetchAll(urls);

  const url = `api/books/`;
  const {
    data: allBooks,
    setData: setAllBooks,
    loading: loadingBooks,
    error: errorRetrievingBooks,
  } = useFetch(url);

  if (errorRetrievingData) throw errorRetrievingData;
  if (errorRetrievingBooks) throw errorRetrievingBooks;

  if (loadingData || loadingBooks) return <Spinner />;

  let authors = null;
  let genres = null;

  if (data != null && data.length === 2) {
    authors = data[0];
    genres = data[1];
  }

  //second render onwards this is not required
  if (authors == null || authors.length === 0) return "Authors not loaded";
  if (genres == null || genres.length === 0) return "Genres not loaded";

  if (allBooks == null) return "Books not Loaded...";

  let showBooks = null;

  if (exists(titleSearchTerm) && titleSearchTerm.length > 0) {
    let lowerCaseSearchTerm = titleSearchTerm.toLowerCase();
    showBooks = allBooks.filter(
      (book) => book.title.toLowerCase().indexOf(lowerCaseSearchTerm) >= 0
    );
  } else showBooks = allBooks;

  function exists(obj) {
    return typeof obj != "undefined" && obj != null ? true : false;
  }

  function addBook(event) {

    console.log("entered add book");

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());

    async function addBookOnServer() {
      try {
        let newBookObj = {
          title: formDataObj.book_title,
          author_id: formDataObj.book_author_id,
          genre_id: formDataObj.book_genre_id,
          summary: formDataObj.book_summary,
          publication_date: formDataObj.book_publish_date,
          price: formDataObj.book_price,
          min_age: "10",
          max_age: "99"
        };

        const response = await fetch(`${baseUrl}api/books/`, {
          method: "POST",
          body: JSON.stringify(newBookObj),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.ok) {
          const json = await response.json();

          if (json.id === undefined || json.id === null) {
            console.log("Book could not be added on server.");
            throw "Book could not be added on server.";
          }

          console.log(`Added book successfully with id: ${json.id}`);

          successToastMessage = `Added book '${json.title}' successfully to BookWare!`;

          setShowAddSuccessToast(true);
          handleAddBookOffCanvasClose();

          // Adding new book to existing list, Re-rendering component
          setAllBooks([...allBooks, json]);
        } else {

          throw response;
        }
      } catch (e) {

        failureToastMessage = `Failed adding book to BookWare!`;
        setShowAddFailureToast(true);
        handleAddBookOffCanvasClose();

      }
    }

    addBookOnServer();
  }

  function deleteBook(bookid) {
    async function deleteBookOnServer() {
      try {
        console.log(`Got to delete  : ${baseUrl}api/books/${bookid}`);

        const response = await fetch(`${baseUrl}api/books/${bookid}`, {
          method: "DELETE",
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.ok) {
          if (response.status === 204) {
            console.log(`Deleted successfully book with id: ${bookid}`);

            setShowDeleteSuccessToast(true);

            let filteredBooks = allBooks.filter((b) => b.id !== bookid);
            setAllBooks(filteredBooks);
          } else if (response.status === 404) {
            throw "Book not found. ";
          } else {
            throw "Got server response but delete unsuccessful ";
          }
        } else {
          throw `Response not ok.`;
        }
      } catch (e) {
        //setError(e);
        setShowDeleteFailureToast(true);
        console.log(`Caught error deleting book ${baseUrl}api/books/${bookid}. 
                      Error: ${e.message}`);
      }
    }

    deleteBookOnServer();
  }

  function editBook(book) {
  
    bookToEditRef.current = book;
    handleEditBookOffCanvasShow();
  }

  function updateBook(event) {
    console.log("entered update book");

    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());

    async function updateBookOnServer() {
      try {
        let bookId = formDataObj.bookIdForUpdate;
        let updateBookObj = {
          title: formDataObj.book_title,
          author_id: formDataObj.book_author_id,
          genre_id: formDataObj.book_genre_id,
          summary: formDataObj.book_summary,
          publication_date: formDataObj.book_publish_date,
          price: formDataObj.book_price,
          min_age: "10",
          max_age: "99"
        };

        const response = await fetch(`${baseUrl}api/books/${bookId}`, {
          method: "PUT",
          body: JSON.stringify(updateBookObj),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });

        if (response.ok) {
          const updatedBook = await response.json();

          if (updatedBook.id === undefined || updatedBook.id === null) {
            console.log("Book could not be updated on server.");
            throw "Book could not be updated on server.";
          }

          console.log(`Updated book successfully with id: ${updatedBook.id}`);
         
          successToastMessage = `Updated book '${updatedBook.title}' successfully on BookWare!`;

          setShowEditSuccessToast(true);
          handleEditBookOffCanvasClose();

          let updatedBookList = allBooks.map((b) => {
            if (b.id === updatedBook.id) {
              b = updatedBook;
            }
            return b;
          });

          // Updating the book in the existing list, Re-rendering component
          setAllBooks([...updatedBookList]);
        } else {
          
          throw response;
        }
      } catch (e) {
        //toast fail
        failureToastMessage = `Failed updating book on BookWare!`;
        setShowEditFailureToast(true);
        handleEditBookOffCanvasClose();
       
      }
    }

    updateBookOnServer();
  }

  function searchBooksByTitle(searchStr) {

    setTitleSearchTerm(searchStr);
  }

  return (
    <>
      <div id="books-main-div">
       

        <BooksPageHeader
          addCallback={handleAddBookOffCanvasShow}
          searchCallback={searchBooksByTitle}
          searchByStr="Search by Book Title..."
        />
        
          <section id="Books-Section">
           
              <BookLayout
                books={showBooks}
                onDelete={deleteBook}
                onEdit={editBook}
              />
           
          </section>
          <section id="AddBook-OffCanvas-Section">
            <OffCanvasAddBook
              showOffCanvas={showAddBook}
              handleClose={handleAddBookOffCanvasClose}
              onSubmitHandle={addBook}
              authors={authors}
              genres={genres}
            />
          </section>
          <section id="EditBook-OffCanvas-Section">
            <OffCanvasEditBook
              showOffCanvas={showEditBook}
              handleClose={handleEditBookOffCanvasClose}
              onSubmitHandle={updateBook}
              authors={authors}
              genres={genres}
              bookToEdit={bookToEditRef.current}
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
                Book added successfully to Bookware repository.
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
                Failed adding book to the Bookware repository.
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
                Book updated successfully on Bookware repository.
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
                Failed updating book on the Bookware repository.
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
                Book deleted successfully from Bookware repository.
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
                Failed deleting book on the Bookware repository.
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      
    </>
  );
}
