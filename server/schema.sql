CREATE DATABASE finditbd; 
USE finditbd;

CREATE TABLE IF NOT EXISTS globalUsers (
    iduser INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    userapepat VARCHAR(255) NOT NULL,
    userapemat VARCHAR(255) NOT NULL,
    nocontrol VARCHAR(9) NULL,
    passuser VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    phonenumber INT(10) NULL,
    typeuser INT NOT NULL
);

INSERT INTO globalUsers (username, userapepat, userapemat, nocontrol, passuser, email, typeuser) VALUES ('Abraham', 'Carrasco', 'Barradas', '21020360', '123456', 'abraham04jul@gmail.com', 1);

CREATE TABLE IF NOT EXISTS objPerdido (
    idobj INT AUTO_INCREMENT PRIMARY KEY,
    iduser INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    hora TIME NOT NULL,
    fecha DATE NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    FOREIGN KEY (iduser) REFERENCES globalUsers(iduser)
);

CREATE TABLE IF NOT EXISTS objEncontrado (
    idobj INT AUTO_INCREMENT PRIMARY KEY,
    iduser INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    hora TIME NOT NULL,
    fecha DATE NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    FOREIGN KEY (iduser) REFERENCES globalUsers(iduser)
);

/*CREATE TABLE IF NOT EXISTS msgUsers (

)

CREATE TABLE IF NOT EXISTS objCompletado (

)*/