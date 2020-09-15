/*
-- Esquema para la autenticación de usuarios

CREATE SCHEMA authuser
    AUTHORIZATION sdilkaosfsajcf;

GRANT ALL ON SCHEMA authuser TO PUBLIC;

GRANT ALL ON SCHEMA authuser TO sdilkaosfsajcf;

COMMENT ON SCHEMA authuser
    IS 'Scheme for user authentication';

-- Tipo de usuarios
CREATE TABLE authuser.typeofuser (
    id SERIAL PRIMARY KEY,
    usertype VARCHAR(40),
    valuedata INTEGER DEFAULT null
);
INSERT INTO authuser.typeofuser(usertype, valuedata) VALUES ('AdminUser', null), ( 'SimpleUser', 1);

-- Usuarios
CREATE TABLE authuser.users (
    id SERIAL PRIMARY KEY,
    emailuser text,
    nameuser VARCHAR(40),
    passworduser VARCHAR(255),
    urlimagen VARCHAR(255), 
    typeiduser INTEGER REFERENCES authuser.typeofuser(id)
);

INSERT INTO authuser.users(emailuser, nameuser, passworduser, urlimagen, typeiduser) VALUES ('gmayas@gmail.com', 'gmayas', 'P1000','',1);
*/
