# BookWare

A Full-Stack Application to Explore the Offerings in a Simple Bookstore. 

It allows bookstore employees to internally manage the books carried by the bookstore.

Key resources or entities in the application are Authors,Genres and Books. 
Every book has reference to an Author and a Genre.

## Technology Stack:
- Back-End:
  - Node.js Express framework to build the REST API web server.
  - Sequelize Node module for ORM
  - MySQL database
        
- Front-End: HTML5, BootStrap5, React18

## BookWare Server

#### Node.js Express API server

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

#### Sequelize ORM module

Sequelize ORM module is used to map the relational tables to Javascript objects.
Followed a code first approach, where the database tables are automatically created (from the JS models defined) by the application on the initial run or if the tables do not exist.
Sample data is seeded into the database using Sequelize API.

#### Database Requirements

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

The UI provides a console to manage the key entities in the application - Authors, Genres and Books.
UI is completely responsive to different screen sizes.

### Home Page

<img width="1509" alt="BookWare Home Page" src="https://github.com/user-attachments/assets/e149a73d-e981-43ee-b9df-79c96b999e34">
<img width="494" alt="BookWare Home- Small screen" src="https://github.com/user-attachments/assets/94f0b8fd-766e-46f7-bc6c-5ae3fa935be0">
<img width="536" alt="BookWare Home- Small Bottom" src="https://github.com/user-attachments/assets/757bdd18-8d3f-4dec-9650-cb0dd48946ca">

### Authors Page

<img width="1509" alt="BookWare Authors Page" src="https://github.com/user-attachments/assets/7501eb5a-c4ee-4794-b696-c27f8042ca56">
<img width="1504" alt="BookWare - Edit Author Offcanvas" src="https://github.com/user-attachments/assets/e3784ac8-b558-48fd-8ad5-95d32194f6c8">
<img width="499" alt="BookWare Authors Small Header open" src="https://github.com/user-attachments/assets/d4d2d14b-823f-4446-9d7f-7e5e516f609f">
<img width="496" alt="BookWare Authors Small" src="https://github.com/user-attachments/assets/06cf5b8a-2368-40ef-a2e2-0fb338019030">
<img width="499" alt="Screenshot 2024-07-18 at 12 32 44 PM" src="https://github.com/user-attachments/assets/0af5cabe-2b98-4e4d-ad50-b4837feafb46">




### Books Page



<img width="1508" alt="BookWare Books Page Default" src="https://github.com/user-attachments/assets/66d63cc4-8418-44bf-b01f-cbe200185d79">
<img width="1506" alt="BookWare Books Page" src="https://github.com/user-attachments/assets/06721ba8-f610-44ab-acd4-db94d318a10e">

<img width="1508" alt="BookWare - Add Book Offcanvas" src="https://github.com/user-attachments/assets/08d6ca01-412b-4961-9a4d-313a1a8b9d45">

<img width="536" alt="BookWare Books Header Open -small screen" src="https://github.com/user-attachments/assets/6833ee77-5909-436c-94a3-2e1b2fae0164">
<img width="530" alt="BookWare - Books - Header closed small screen" src="https://github.com/user-attachments/assets/d687921e-501c-400f-a570-a00633723842">
<img width="541" alt="BookWare - Books small screen" src="https://github.com/user-attachments/assets/5e35c299-02d6-4734-8c67-20d537c5a480">





## Running the Application






      






  

