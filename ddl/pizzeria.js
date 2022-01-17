// Arxiu per executar des de la consola (bash): mongosh < pizzeria.js

use pizzeria
db.dropDatabase()
// show collections

// CREATE COLLECTIONS
db.createCollection('client');
db.createCollection('store');
db.createCollection('employee');
db.createCollection('product');
db.createCollection('sale');


// MODEL DATA
// OBSERVACIÓ: entenc que l'identificador únic és diferent que el de Mongo no? A nivell de negoci, per veure un id de client per pantalla té més sentit a nivell humà tractar amb l'usuari 1, 2 3.. que l'usuari "61e3f6d211c4be880698f6dd", "61e3f6d211c4be880698f6de", etc.
// OBSERVACIÓ: modelo localitat i província com documents encastats, ja que localitat i província necessiten id i nom (el valor serà un objecte i no un string per exemple amb el nom només) i que un client només pot pertànyer a una localitat i al seu torn una localitat només pot pertànyer a una província.
// OBSERVACIÓ: per a l'id, com que després sale hi fa referència també l'hauria d'indexar, al final he pensat que si 'id' acaba sent el mateix que _id es torna redundant: decideixo fer servir només _id i donar-li sentit de negoci.

const clients = [
    {
        _id: 1,
        name: 'Omar',
        surnames: 'Olmedo Ferrer',
        phone_number: '555-555-555',
        address: 'Gran Via 123',
        postal_code: '08080',
        locality: {
            id: 1,
            name:'Barcelona',
            province: {
                id: 1,
                name: 'Barcelona'
            }
        },
    }
];

const stores = [
    {
        _id: 1,
        address: 'Torrent de la vil·la 12',
        postal_code: '08080',
        locality: {
            id: 1,
            name:'Barcelona',
            province: {
                id: 1,
                name: 'Barcelona'
            }
        },
    }, {
        _id: 2,
        address: 'Carrer de la fàbrica 123',
        postal_code: '08202',
        locality: {
            id: 1,
            name:'Sabadell',
            province: {
                id: 1,
                name: 'Barcelona'
            }
        },
    }
]

const employees = [
    {
        _id: 1,
        name: 'Agustí',
        surnames: 'Pérez Simó',
        nif: '12345678X',
        phone_number: '555-555-555',
        job_description: 'cooker',
        store_id: 1,
    }, {
        _id: 2,
        name: 'Sònia',
        surnames: 'Domínguez Guatlla',
        nif: '98765432X',
        phone_number: '666-666-666',
        job_description: 'delivery',
        store_id: 1,
    }
];


// Cal mantenir una col·lecció de productes, per exemple per mostrar-los per pantalla al sistema per tal de poder-los seleccionar per una nova venda
// No guardo les categories de pizza en una col·lecció a part perquè la modificació de la carta no serà una operació freqüent, les categories ja porten una id per assegurar-ne la consistència a l'hora de recuperar-les i la info extra que s'afegeix és poca.
// Pizza_category és un camp opcional
// Agrupo tota la info de product type dins de type per tenir tota la complexitat relacionada encapsulada sota un sol camp a product.
const products = [

    {
        _id: 1,
        type: {
            name: 'pizza',
            category: {
                id: 1,
                name: 'Clàssica'
            }
        },
        name: 'Carbonara',
        description: 'Crema fresca, Mozzarella, Bacon, Xampinyons i Ceba',
        image: 'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==',
        price: 14.25,
    },
    {
        _id: 2,
        type: {
            name: 'pizza',
            category: {
                id: 2,
                name: 'Deluxe'
            }
        },
        name: 'Cremozza BBQ',
        description: 'Crema fresca, Mozzarella, Bacon, Pollastre a la graella,Ceba i Salsa barbacoa',
        image: 'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==',
        price: 21.75
    },
    {
        _id: 3,
        type: {
            name: 'beverage'
        },
        name: 'Aigua',
        description: 'Mineral Natural',
        image: 'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==',
        price: 1
    },{
        _id: 4,
        type: {
            name: 'beverage'
        },
        name: 'Cola-Cola',
        description: 'Llauna',
        image: 'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==',
        price: 1.5
    },{
        _id: 5,
        type: {
            name: 'beverage'
        },
        name: 'Estrella Damm',
        description: 'Llauna',
        image: 'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==',
        price: 1.5
    },
];


// Aplico mateix sistema d'_id amb sentit de negoci
// Com a SQL, delivery és null quan la comanda sigui per recollir a botiga
const sales = [
    // Sale d'una pizza carbonara i una cervesa a botiga barcelona, entrega a domicili efectuada per l'empleada 2
    {
        _id: 1,
        client_id: 1,
        datetime: '2020-01-01 20:15',
        total_price: 15.75,
        store_id: 1,
        delivery: {
            employee_id: 2,
            datetime: '2020-01-01 20:45',
        },
        sale_lines: [
            {
                product_id: 1,
                quantity: 1,
                line_price: 14.25
            },
            {
                product_id: 5,
                quantity: 1,
                line_price: 1.5
            },
        ]
    },
    // Sale de 6 Coca-coles a botiga barcelona, entrega a botiga
    {
        _id: 2,
        client_id: null,
        datetime: '2021-01-03 18:12',
        total_price: 9,
        store_id: 1,
        delivery: null,
        items: [
            {
                product_id: 4,
                quantity: 6,
                line_price: 9
            }
        ]
    }
];

// INSERTS

db.client.insertMany(clients);
db.store.insertMany(stores);
db.employee.insertMany(employees);
db.product.insertMany(products);
db.sale.insertMany(sales);
