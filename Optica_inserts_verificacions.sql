-- INSERTS
USE optica;

/* Fonts:
    https://www.einforma.com/informacion-empresa/alain-afflelou-espana
    https://www.einforma.com/informacion-empresa/multiopticas-scl
 */

INSERT INTO address
VALUES (1, 'Paseo Castellana', '89', '11', NULL, 'Madrid', '28046', 'España');

INSERT INTO address
VALUES (2, 'AVENIDA DE LOS REYES (PG IND LA MINA)', 'S/N', NULL, NULL, 'Colmenar Viejo', '28770', 'España');

INSERT INTO address
VALUES (3, 'Gran Via', '221b', '1', '4', 'Sant Esteve de les Roures', '12345', 'España');

INSERT INTO provider
VALUES (1, 'A83759019', 'Alain Afflelou', 1, '911517700', '911517700');

INSERT INTO provider
VALUES (2, 'F28465193', 'Multiópticas S.C.L', 2, '918357000', '918463425');

INSERT INTO brand_provider
VALUES ('Afflelou', 1);
INSERT INTO brand_provider
VALUES ('Ray-Ban', 1);
INSERT INTO brand_provider
VALUES ('Police', 1);
INSERT INTO brand_provider
VALUES ('Ralph Lauren', 2);


INSERT INTO client
VALUES (1, 'some@email.com', 'Aniol Gutiérrez', 3, '555-555-555', '2020-01-12', NULL);

INSERT INTO employee
VALUES (1, 'Elisenda García');

INSERT INTO glasses_sale
VALUES (1, 'Afflelou', 2.5, 1.25, 'plastic', 'blue', NULL, 125.90, 1, 1, '2020-03-15');
INSERT INTO glasses_sale
VALUES (2, 'Police', 0.25, -0.5, 'rimless', 'silver', NULL, 131.25, 1, 1, '2020-01-12');
INSERT INTO glasses_sale
VALUES (4, 'Ray-Ban', -2.75, 0.50, 'metal', 'chrome', NULL, 248.12, 1, 1, '2021-05-11');
INSERT INTO glasses_sale
VALUES (3, 'Ray-Ban', 0, 0, 'plastic', 'chrome', 'dark green', 22.50, 1, 1, '2020-09-23');


-- VERIFICACIONS
-- Llista el total de compres d'un client
SELECT *
FROM glasses_sale
WHERE sale_client = 1;


-- Llista les diferents ulleres que ha venut un empleat durant un any
SELECT *
FROM glasses_sale
WHERE sale_employee = 1
  AND LEFT(sale_date, 4) = '2020';


-- Llista els diferents proveïdors que han subministrat ulleres venudes amb èxit per l'òptica
SELECT DISTINCT p.*, address.*
FROM glasses_sale gs
         JOIN brand_provider bp ON gs.brand = bp.brand
         JOIN provider p ON bp.provider = p.id
         JOIN address ON p.address = address.id;
