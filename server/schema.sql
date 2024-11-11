CREATE DATABASE finditbd;
USE finditbd;

CREATE TABLE IF NOT EXISTS globalUsers (
    iduser VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    userapepat VARCHAR(255) NOT NULL,
    userapemat VARCHAR(255) NOT NULL,
    nocontrol VARCHAR(9) UNIQUE NULL,
    passuser VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NULL,
    phonenumber INT(10) UNIQUE NULL,
    typeuser INT NOT NULL,
    isActiveUser BOOLEAN NOT NULL,
    imageUser LONGBLOB NULL
);

CREATE TABLE IF NOT EXISTS objPerdido (
    idobj INT AUTO_INCREMENT PRIMARY KEY,
    iduser VARCHAR(36) NOT NULL,
    imagenobj VARCHAR(800) NULL,
    nombreobj VARCHAR(50) NOT NULL,
    objEstado INT NOT NULL,
    categoria INT NOT NULL,
    descripcion VARCHAR(455) NOT NULL,
    hora TIME NOT NULL,
    fecha DATE NOT NULL,
    lugar VARCHAR(120) NOT NULL,
    fechaPost DATE NOT NULL,
    objEstatus INT NOT NULL,
    FOREIGN KEY (iduser) REFERENCES globalUsers(iduser)
);

CREATE TABLE IF NOT EXISTS objEncontrado (
    idobj INT AUTO_INCREMENT PRIMARY KEY,
    iduser VARCHAR(36) NOT NULL,
    nombreobj VARCHAR(50) NOT NULL,
    descripcion VARCHAR(455) NOT NULL,
    hora TIME NOT NULL,
    fecha DATE NOT NULL,
    lugar VARCHAR(120) NOT NULL,
    fechaPost DATE NOT NULL,
    objEstatus INT NOT NULL,
    FOREIGN KEY (iduser) REFERENCES globalUsers(iduser)
);

CREATE TABLE IF NOT EXISTS objReclamaciones (
    idReclamacion VARCHAR(50) PRIMARY KEY,
    idobj INT NOT NULL,
    iduser VARCHAR(36) NOT NULL,
    fechaReclama DATE NOT NULL,
    evidencia VARCHAR(255) NOT NULL,
    estadoReclama INT NOT NULL,
    FOREIGN KEY (idobj) REFERENCES objPerdido(idobj),
    FOREIGN KEY (iduser) REFERENCES globalUsers(iduser)
);