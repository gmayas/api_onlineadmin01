/*
-- Esquema para el proyecto Online Admin

CREATE SCHEMA onlineadmin
    AUTHORIZATION sdilkaosfsajcf;

GRANT ALL ON SCHEMA onlineadmin TO PUBLIC;

GRANT ALL ON SCHEMA onlineadmin TO sdilkaosfsajcf;

COMMENT ON SCHEMA onlineadmin
    IS 'Scheme for Online Admin';


-- Tipo de presentación
CREATE TABLE onlineadmin.prestype (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255)
);
INSERT INTO onlineadmin.prestype(type) VALUES ('Producto'), ('Servicio');

-- catalogo

CREATE TABLE onlineadmin.catalogo (
    id SERIAL PRIMARY KEY,
    grupo VARCHAR(255),
    claveart VARCHAR(6),
    articulo VARCHAR(255),
    urlimagen VARCHAR(255), 
    impuesto NUMERIC(2),
    precio NUMERIC(12,2),
    prestypeid INTEGER REFERENCES onlineadmin.prestype(id)
);

INSERT INTO onlineadmin.catalogo (grupo, claveart, articulo, urlimagen, impuesto, precio, prestypeid) 
                        VALUES ('TRUPER', 'T14284', 'Lentes Seguridad Transparentes Ajustables', 
                                'https://http2.mlstatic.com/lentes-seguridad-transparentes-ajustables-truper-14284-D_NQ_NP_689723-MLM32349496376_092019-F.webp',
                                 16, 55, 1);

INSERT INTO onlineadmin.catalogo (grupo, claveart, articulo, urlimagen, impuesto, precio, prestypeid) 
                        VALUES ('TRUPER', 'T14160', 'Juego Desarmadores Precisión Intercambi 29pz, Truper', 
                                'https://http2.mlstatic.com/juego-desarmadores-precision-intercambi-29pz-truper-14160-D_NQ_NP_681478-MLM41773818383_052020-F.webp',
                                 16, 109, 1);

INSERT INTO onlineadmin.catalogo (grupo, claveart, articulo, urlimagen, impuesto, precio, prestypeid) 
                        VALUES ('TRUPER', '491059', 'JUEGO DE HERRAMIENTAS PARA JARDÍN NEGRO TRUPER 4 PIEZAS', 
                                'https://cdn.homedepot.com.mx/productos/491059/491059-z.jpg',
                                 16, 279, 1);


Select cat.id, cat.grupo, cat.claveart, cat.articulo, cat.urlimagen, cat.impuesto, cat.precio, pre.type Tipo
    from onlineadmin.catalogo as cat
    LEFT JOIN onlineadmin.prestype as pre 
           ON (pre.id = cat.prestypeid)
Order by cat.articulo; 