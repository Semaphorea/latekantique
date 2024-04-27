CREATE DATABASE LatekantiqueDB ; 

Use LatekantiqueDB ; 

CREATE TABLE Client ( id INTEGER NOT NULL AUTO_INCREMENT ,  firstname VARCHAR(64) NOT NULL ,  lastname VARCHAR(64) NOT NULL , id_address INTEGER ,id_bilingAddress INTEGER , emailAddress VARCHAR(128), phoneNumber VARCHAR (32),  genre VARCHAR(8) ,PRIMARY KEY(id), FOREIGN KEY(id_address) REFERENCES address(id), FOREIGN KEY(id_billingAddress) REFERENCES address(id));
CREATE TABLE Expert ( id INTEGER NOT NULL AUTO_INCREMENT ,  firstname VARCHAR(64) NOT NULL ,  lastname VARCHAR(64) NOT NULL , id_address INTEGER , emailAddress VARCHAR(128) NOT NULL, phoneNumber VARCHAR (32) NOT NULL,  diploma VARCHAR (512) NOT NULL, experiences VARCHAR (512) NOT NULL, id_photo: INTEGER  NOT NULL, PRIMARY KEY(id), FOREIGN KEY(id_address) REFERENCES address(id), FOREIGN KEY(id_photo) REFERENCES photo(id) ));
CREATE TABLE Expertise ( id INTEGER NOT NULL AUTO_INCREMENT ,  email VARCHAR(128) NOT NULL ,  articleName VARCHAR(64) NOT NULL , features VARCHAR(512) , default VARCHAR(64), signature VARCHAR (64),  author VARCHAR (64), creationYear DATETIME, firstCommercialisation DATETIME,  id_photos VARCHAR (64),  estimatedPrice DECIMAL , assessment VARCHAR (64), PRIMARY KEY(id),FOREIGN KEY(id_photo) REFERENCES photo(id)); 
CREATE TABLE Address ( id INTEGER NOT NULL AUTO_INCREMENT ,  id_person INTEGER NOT NULL ,  streetNumber TINYINT , typeOfRoad VARCHAR(64) , address VARCHAR(256) NOT NULL, complementAddress VARCHAR (256) NOT NULL,  postCode VARCHAR (8) NOT NULL, city VARCHAR (64) NOT NULL, country: VARCHAR(64) NOT NULL, PRIMARY KEY(id), FOREIGN KEY(id_person) REFERENCES person(id));
CREATE TABLE User ( id INTEGER NOT NULL AUTO_INCREMENT , id_personne INTEGER, identifiant VARCHAR(64), password VARCHAR(64) , PRIMARY KEY(id));
CREATE TABLE Article ( id INTEGER NOT NULL AUTO_INCREMENT ,  title VARCHAR(64) NOT NULL , description VARCHAR(256) NOT NULL , photo_url VARCHAR(128) NOT NULL, availableUnits INTEGER NOT NULL,  quantity INTEGER, year DATETIME NOT NULL, price: DECIMAL NOT NULL, PRIMARY KEY(id));
CREATE TABLE Photo ( id INTEGER NOT NULL AUTO_INCREMENT ,  title VARCHAR(64) NOT NULL , description VARCHAR(256) NOT NULL , date DATETIME, photo_url VARCHAR(128) NOT NULL, photo_directory VARCHAR(128) NOT NULL, PRIMARY KEY(id));
CREATE TABLE Evenement ( id INTEGER NOT NULL AUTO_INCREMENT ,  title VARCHAR(64) NOT NULL , description VARCHAR(256) NOT NULL , date VARCHAR(256), photo_id INTEGER , PRIMARY KEY(id)); // date est un tableau de date
CREATE TABLE Commande ( id INTEGER NOT NULL AUTO_INCREMENT ,  idClient INTEGER NOT NULL , reference VARCHAR(64) NOT NULL , articles VARCHAR(1024) NOT NULL, insurance DECIMAL , totalHT DECIMAL, totalTTC DECIMAL , TVA DECIMAL, currency VARCHAR(64), shipping_tax DECIMAL, shipping DECIMAL, PRIMARY KEY(id)); // articles est un tableau d article designé ici comme du VARCHAR dans lequel un tableau JSON devrait prendre place
CREATE TABLE Person ( id INTEGER NOT NULL AUTO_INCREMENT ,  id_client INTEGER DEFAULT NULL , id_expert INTEGER DEFAULT NULL , FOREIGN KEY id_client REFERENCES client(id), FOREIGN KEY REFERENCES expert(id));  
CREATE TABLE Payment ( id INTEGER NOT NULL AUTO_INCREMENT ,  id_client INTEGER, typeOfPayment VARCHAR(64), referenceTransaction VARCHAR(128), TotalTTC DECIMAL, isRealized BOOLEAN ) ;  
  
 
/*Exemple Insertion Article*/
/*INSERT INTO article ( id,title,description,photo_url,availableUnits,quantity,year,price) VALUES (1,"Machine Anticithere","Object considéré comme étant le premier calculateur de l'histoire. Permettant de calculer la position des astres.","/api/photos/machine-anticythere.jpg",1,1,MAKEDATE(176, 1),300000)*/