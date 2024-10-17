USE fiditbd;

CREATE TABLE IF NOT EXISTS global_users (
    iduser INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    userapepat VARCHAR(255) NOT NULL,
    userapemat VARCHAR(255) NOT NULL,
    no_control VARCHAR(9) NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    phonenumber INT(10) NULL,
    type_user INT NOT NULL,
);

CREATE TABLE IF NOT EXISTS objPerdido (
    idobj INT AUTO_INCREMENT PRIMARY KEY,
    iduser INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    hora TIME NOT NULL,
    fecha DATE NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    FOREIGN KEY (iduser) REFERENCES global_users(iduser)
)

CREATE TABLE IF NOT EXISTS objEncontrado (
    idobj INT AUTO_INCREMENT PRIMARY KEY,
    iduser INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    hora TIME NOT NULL,
    fecha DATE NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    FOREIGN KEY (iduser) REFERENCES global_users(iduser)
)

/*CREATE TABLE IF NOT EXISTS msgUsers (

)

CREATE TABLE IF NOT EXISTS objCompletado (

)*/