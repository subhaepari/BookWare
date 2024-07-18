# ---------------------------------------------------------------------- #
# Target DBMS:           MySQL 8.3.0                                     #
# Project name:          BookStore                                       #
# Author:                Subha Epari                                     #
# Created on:            2024-06-27                                		 #
# ---------------------------------------------------------------------- #
DROP DATABASE IF EXISTS bookstore;

CREATE DATABASE IF NOT EXISTS bookstore;

USE bookstore;

# ---------------------------------------------------------------------- #
# Tables                                                                 #
# ---------------------------------------------------------------------- #
# ---------------------------------------------------------------------- #
# Add table "Books"                                                		 #
# ---------------------------------------------------------------------- #

CREATE TABLE `Books` (
    `book_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(25) NOT NULL,
    `author_id` INT NOT NULL,
    `genre_id` INT NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `publication_date` DATE NOT NULL,
    `description` MEDIUMTEXT,
    `picture` LONGBLOB,
    CONSTRAINT `PK_Books` PRIMARY KEY (`book_id`)
);


# ---------------------------------------------------------------------- #
# Add table "Authors"                                                 	 #
# ---------------------------------------------------------------------- #

CREATE TABLE `Authors` (
    `author_id` INTEGER NOT NULL AUTO_INCREMENT,
    `author_name` VARCHAR(25) NOT NULL,
    `biography` LONGTEXT,
    `Picture` LONGBLOB,
    CONSTRAINT `PK_Authors` PRIMARY KEY (`author_id`)
);

# ---------------------------------------------------------------------- #
# Add table "Genres"                                                     #
# ---------------------------------------------------------------------- #

CREATE TABLE `Genres` (
    `genre_id` INTEGER NOT NULL AUTO_INCREMENT,
    `genre_name` VARCHAR(25) NOT NULL,
    CONSTRAINT `PK_Genres` PRIMARY KEY (`genre_id`)
);



# ---------------------------------------------------------------------- #
# Foreign key constraints                                                #
# ---------------------------------------------------------------------- #


ALTER TABLE `Books` ADD CONSTRAINT `FK_Books_Authors` 
    FOREIGN KEY (`author_id`) REFERENCES `Authors` (`author_id`);
    
ALTER TABLE `Books` ADD CONSTRAINT `FK_Books_Genres` 
    FOREIGN KEY (`genre_id`) REFERENCES `Genres` (`genre_id`);
    




