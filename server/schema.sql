CREATE DATABASE chat;

USE chat;

CREATE TABLE messages
  (
     userid    INTEGER(8),
     text   VARCHAR(160),
     roomname  VARCHAR(30),
     createdat DATE
  );

CREATE TABLE users
  (
     id       INTEGER(8),
     username VARCHAR(20),
     font     VARCHAR(30),
     color    VARCHAR(20),
     motto    VARCHAR(80)
  );


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

