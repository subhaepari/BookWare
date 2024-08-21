# BookWare

A Full-Stack Application to Explore the Offerings in a Simple Bookstore. 

It allows bookstore employees to internally manage the books carried by the bookstore.

Key resources or entities in the application are Authors,Genres and Books
Every book has reference to an Author and a Genre.

## Technology Stack:
- Back-End:
  - Node.js Express framework to build the REST API web server.
  - Sequelize Node module for ORM
  - MySQL database
        
- Front-End: HTML5, BootStrap5, React18

## BookWare Server

##### Node.js Express API server

Created Node.js Express API server, serving the following endpoints:
1. Books:
   - GET /books : Retrieve a list of all books
   - GET /books/{book_id} : Retrieve details of a specific book
   - POST /books : Add a new book
   - PUT /books/{book_id} : Update details of an existing book
   - DELETE /books/{book_id} : Delete a specific book
3. Authors:
   - GET /authors : Retrieve a list of all authors
   - GET /authors/{author_id} : Retrieve details of a specific author
   - POST /authors : Add a new author
   - PUT /authors/{author_id} : Update details of an existing author
   - DELETE /authors/{author_id} : Delete a specific author
5. Genres:
   - GET /genres : Retrieve a list of all genres
   - GET /genres/{genre_id} : Retrieve details of a specific genre
   - POST /genres : Add a new genre

##### Sequelize ORM module

Sequelize ORM module is used to map the relational tables to Javascript objects.
Followed a code first approach, where the database tables are automatically created (from the JS models defined) by the application on the initial run or if the tables do not exist.
Sample data is seeded into the database using Sequelize API.

##### Database Requirements:

Using MySQL database with this schema:

1. Books Table:
   - book_id (Primary Key)
   - title (VARCHAR)
   - author_id (Foreign Key referencing the Authors table) 
   - genre_id (Foreign Key referencing the Genres table)
   - price (DECIMAL)
   - publication_date (DATE)
2. Authors Table:
   - author_id (Primary Key)
   - name (VARCHAR)
   - biography (TEXT)
3. Genres Table:
   - genre_id (Primary Key)
   - genre_name (VARCHAR)



## BookWare UI

The UI provides a console to manage the key entities in the application - Authors,Genres and Books.







## Running the Application






      






  

