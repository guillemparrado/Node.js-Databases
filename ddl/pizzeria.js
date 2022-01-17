// Arxiu per executar des de la consola (bash): mongosh < pizzeria.js

use pizzeria
db.dropDatabase()
show collections

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
        name: ,
        surnames: ,
        phone_number: ,
        address: ,
        postal_code: ,
        locality: {
            id: ,
            name: ,
            province: {
                id: ,
                name:
            }
        },
    }
];

const stores = [
    {
        _id: ,
        address: ,
        postal_code: ,
        locality: {
            id: ,
            name: ,
            province: {
                id: ,
                name:
            }
        },
    }
]

const employees = [
    {
        _id: ,
        name: ,
        surnames: ,
        nif: ,
        phone_number: ,
        job_description: ,
        store_id: ,
    }
];



// Cal mantenir una col·lecció de productes, per exemple per mostrar-los per pantalla al sistema per tal de poder-los seleccionar per una nova venda
// No guardo les categories de pizza en una col·lecció a part perquè la modificació de la carta no serà una operació freqüent, les categories ja porten una id per assegurar-ne la consistència a l'hora de recuperar-les i la info extra que s'afegeix és poca.
// Pizza_category és un camp opcional
// Agrupo tota la info de product type dins de type per tenir tota la complexitat relacionada encapsulada sota un sol camp a product.
const products = [
    {
        _id: ,
        type: {
            type: 'hamburguer'
        },
        name: ,
        description: ,
        image: ,
        price: ,
    },
    {
        _id: ,
        type: {
            type: 'pizza',
            category: {
                id: ,
                name:
            }
        },
        name: ,
        description: ,
        image: ,
        price: ,
    }
];



// Aplico mateix sistema d'_id amb sentit de negoci
// Com a SQL, delivery és null quan la comanda sigui per recollir a botiga
const sales = [
    {
        _id: 1,
        client_id: 1,
        datetime: ,
        total_price: ,
        store_id: ,
        delivery: {
            employee_id: ,
            datetime: ,
        },
        items: [
            {
                product_id: ,
                quantity: ,
            },
            {
                product_id: ,
                quantity: ,
            },
        ]
    }
];


// INSERTS

db.client.insertMany(clients);
db.store.insertMany(stores);
db.employee.insertMany(employees);
db.product.insertMany(products);
db.sale.insertMany(sales);
