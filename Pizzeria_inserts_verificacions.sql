USE pizzeria;

-- INSERTS

INSERT INTO province
VALUES (1, 'Barcelona');

INSERT INTO locality
VALUES (1, 'Barcelona', 1);

INSERT INTO locality
VALUES (2, 'Sabadell', 1);

INSERT INTO store
VALUES (1, 'Torrent de la vil·la 12', '08080', 1, 1);

INSERT INTO store
VALUES (2, 'Carrer de la fàbrica 123', '08202', 2, 1);

INSERT INTO client
VALUES (1, 'Omar', 'Olmedo Ferrer', 'Gran Via 123', 08080, 1, 1, '555-555-555');

INSERT INTO employee
VALUES (1, 1, 'Agustí', 'Pérez Simó', '12345678X', '555-555-555', 'cooker');

INSERT INTO employee
VALUES (2, 1, 'Sònia', 'Domínguez Guatlla', '98765432X', '666-666-666', 'delivery');

INSERT INTO pizza_category
VALUES (1, 'Clàssica');

INSERT INTO pizza_category
VALUES (2, 'Deluxe');

-- Imatge codificada a base64 a: https://onlinepngtools.com/convert-png-to-base64
-- Entenc que la codificació la faríem en node abans de guardar
-- També podria haver fet servir LOAD_FILE però no accepta urls per obtenir les imatges, només paths absoluts del filesystem i per replicar en test era una mica incòmode (caldria copiar carpeta d'imatges manualment a destinació objectiva perquè els inserts funcionessin en una altra màquina).
-- Imatges originals: https://www.dominospizza.es/images/CarbonaraDelivery_N2200923_0_ES.png, https://www.dominospizza.es/images/CremozzaBBQDelivery_Z2200923_0_ES.png.
-- OBSERVACIÓ: He acabat resumint els blobs a una línia per comoditat del test ja que no l'haurem d'interpretar i era massa llarg

INSERT INTO product
VALUES (1, 'pizza', 'Carbonara', 'Crema fresca, Mozzarella, Bacon, Xampinyons i Ceba',
        'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==', 14.25, 1);

-- Mateix blob resumit per simplificar
INSERT INTO product
VALUES (2, 'pizza', 'Cremozza BBQ', 'Crema fresca, Mozzarella, Bacon, Pollastre a la graella,Ceba i Salsa barbacoa',
        'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==', 21.75, 2);

INSERT INTO product
VALUES (3, 'beverage', 'Aigua', 'Mineral Natural',
        'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==', 1, NULL);

INSERT INTO product
VALUES (4, 'beverage', 'Cola-Cola', 'Llauna',
        'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==', 1.5, NULL);

INSERT INTO product
VALUES (5, 'beverage', 'Estrella Damm', 'Llauna',
        'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==', 1.5, NULL);


-- Sale d'una pizza carbonara i una cervesa a botiga barcelona, entrega a domicili efectuada per l'empleada 2

INSERT INTO home_delivery
VALUES (1, 2, '2020-01-01 20:45');

INSERT INTO sale
VALUES (1, '2020-01-01 20:15', 1, 1, 15.75, 1);

INSERT INTO sale_line
VALUES (NULL, 1, 1, 1, 14.25);

INSERT INTO sale_line
VALUES (NULL, 1, 5, 1, 1.5);

-- Sale de 6 Coca-coles a botiga barcelona, entrega a botiga

INSERT INTO sale
VALUES (2, '2021-01-03 18:12', NULL, NULL, 9, 1);

INSERT INTO sale_line
VALUES (NULL, 2, 4, 6, 9);

-- VERIFICACIONS

-- Llista quants productes del tipus 'begudes' s'han venut en una determinada localitat
-- Resultat: 7 == 1 cervesa i 6 coca-coles

SELECT SUM(quantity)
FROM sale s
         JOIN sale_line sl ON s.id = sl.sale
         JOIN product p ON sl.product = p.id
WHERE p.type = 'beverage'
  AND s.store = 1;

-- Llista quantes comandes ha efectuat un determinat empleat
-- Observació: entenc que l'empleat ha de ser repartidor perquè dels cuiners no en guardem les comandes
-- Resultat: l'empleada 2 ha efectuat l'entrega d'una comanda

SELECT COUNT(*)
FROM sale s
         JOIN home_delivery hd ON s.delivery = hd.id
WHERE employee = 2


