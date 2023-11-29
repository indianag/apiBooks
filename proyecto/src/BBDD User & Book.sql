CREATE DATABASE appbooks;

USE appbooks;

CREATE TABLE user (
Id_user INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(45),
last_name VARCHAR(45),
email VARCHAR(45),
photo VARCHAR(200),
password VARCHAR(45)
);

DROP TABLE user;

INSERT INTO user (name, last_name, email, photo, password) 
VALUES 
('John', 'Doe', 'john.doe@example.com', 'john_photo.jpg', 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', 'jane_photo.jpg', 'securepass'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'alice_photo.jpg', 'myp@ssw0rd'),
('Bob', 'Miller', 'bob.miller@example.com', 'default_photo.jpg', 'bobspassword');

CREATE TABLE book (
Id_book INT PRIMARY KEY AUTO_INCREMENT,
Id_user INT,
FOREIGN KEY (Id_user) REFERENCES user(Id_user),
title VARCHAR(45),
type Enum('Tapa Blanda', 'Tapa Dura'),
author VARCHAR(45),
price DECIMAL(10,2),
photo VARCHAR(200)
);

INSERT INTO book (Id_user, title, type, author, price, photo) 
VALUES
(1, 'Cien alos de Soledad', 'Tapa Blanda', 'Gabriel García Márquez', 19.99, 'libro1.jpg'),
(2, 'El Gran Gatsby', 'Tapa Dura', 'F. Scott Fitzgerald', 24.99, 'libro2.jpg'),
(3, 'Rebelión en la granja', 'Tapa Blanda', 'George Orwell', 14.99, 'libro3.jpg'),
(4, 'Don Quijote de la Mancha', 'Tapa Dura', 'Miguel de Cervantes', 29.99, 'libro4.jpg');
