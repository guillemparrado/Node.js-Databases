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

const client_ids = [ObjectId(), ObjectId()];
const store_ids = [ObjectId(), ObjectId()];
const locality_ids = [ObjectId(), ObjectId()];
const province_ids = [ObjectId(), ObjectId()];
const employee_ids = [ObjectId(), ObjectId()];
const product_ids = [ObjectId(), ObjectId(), ObjectId(), ObjectId(), ObjectId()];
const pizza_category_ids = [ObjectId(), ObjectId()];
const sale_ids = [ObjectId(), ObjectId()];


const clients = [
    {
        _id: client_ids[0],
        name: 'Omar',
        surnames: 'Olmedo Ferrer',
        phone_number: '555-555-555',
        address: 'Gran Via 123',
        postal_code: '08080',
        locality: {
            _id: locality_ids[0],
            name:'Barcelona',
            province: {
                _id: locality_ids[0],
                name: 'Barcelona'
            }
        },
    }
];

const stores = [
    {
        _id: store_ids[0],
        address: 'Torrent de la vil·la 12',
        postal_code: '08080',
        locality: {
            _id: locality_ids[0],
            name:'Barcelona',
            province: {
                _id: province_ids[0],
                name: 'Barcelona'
            }
        },
    }, {
        _id: store_ids[1],
        address: 'Carrer de la fàbrica 123',
        postal_code: '08202',
        locality: {
            _id: locality_ids[1],
            name:'Sabadell',
            province: {
                _id: province_ids[0],
                name: 'Barcelona'
            }
        },
    }
]

const employees = [
    {
        _id: employee_ids[0],
        name: 'Agustí',
        surnames: 'Pérez Simó',
        nif: '12345678X',
        phone_number: '555-555-555',
        job_description: 'cooker',
        store_id: store_ids[0],
    }, {
        _id: employee_ids[1],
        name: 'Sònia',
        surnames: 'Domínguez Guatlla',
        nif: '98765432X',
        phone_number: '666-666-666',
        job_description: 'delivery',
        store_id: store_ids[0],
    }
];


// Cal mantenir una col·lecció de productes, per exemple per mostrar-los per pantalla al sistema per tal de poder-los seleccionar per una nova venda
// No guardo les categories de pizza en una col·lecció a part perquè la modificació de la carta no serà una operació freqüent, les categories ja porten una id per assegurar-ne la consistència a l'hora de recuperar-les i la info extra que s'afegeix és poca.
// Pizza_category és un camp opcional
// Agrupo tota la info de product type dins de type per tenir tota la complexitat relacionada encapsulada sota un sol camp a product.
const products = [

    {
        _id: product_ids[0],
        type: {
            name: 'pizza',
            pizza_category: {
                _id: pizza_category_ids[0],
                name: 'Clàssica'
            }
        },
        name: 'Carbonara',
        description: 'Crema fresca, Mozzarella, Bacon, Xampinyons i Ceba',
        image: 'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==',
        price: 14.25,
    },
    {
        _id: product_ids[1],
        type: {
            name: 'pizza',
            pizza_category: {
                _id: pizza_category_ids[1],
                name: 'Deluxe'
            }
        },
        name: 'Cremozza BBQ',
        description: 'Crema fresca, Mozzarella, Bacon, Pollastre a la graella,Ceba i Salsa barbacoa',
        image: 'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==',
        price: 21.75
    },
    {
        _id: product_ids[2],
        type: {
            name: 'beverage'
        },
        name: 'Aigua',
        description: 'Mineral Natural',
        image: 'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==',
        price: 1
    },{
        _id: product_ids[3],
        type: {
            name: 'beverage'
        },
        name: 'Cola-Cola',
        description: 'Llauna',
        image: 'TLdnH2ATSTl68YkTyMJwPLnGbz1xxKgLuJP...NeUWOUVIkfj/+dveHT+tUutfdtWVqr7fma5xHX9Ns1==',
        price: 1.5
    },{
        _id: product_ids[4],
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
        _id: sale_ids[0],
        client_id: client_ids[0],
        dt: '2020-01-01 20:15',
        total_price: 15.75,
        store_id: store_ids[0],
        delivery: {
            employee_id: employee_ids[1],
            dt: '2020-01-01 20:45',
        },
        items: [
            {
                product_id: product_ids[0],
                quantity: 1,
                line_price: 14.25
            },
            {
                product_id: product_ids[4],
                quantity: 1,
                line_price: 1.5
            },
        ]
    },
    // Sale de 6 Coca-coles a botiga barcelona, entrega a botiga
    {
        _id: sale_ids[1],
        client_id: null,
        dt: '2021-01-03 18:12',
        total_price: 9,
        store_id: 1,
        delivery: null,
        items: [
            {
                product_id: product_ids[3],
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


// INDEXES

db.client.createIndex({'locality._id': 1})
db.client.createIndex({'locality.province._id': 1})
db.product.createIndex({'type.pizza_category._id': 1})
db.store.createIndex({'locality._id': 1})
db.store.createIndex({'locality.province._id': 1})