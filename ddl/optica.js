// Arxiu per executar des de la consola (bash): mongosh < optica.js

/* DISCUSSIÓ: fins a quin punt cal encastar documents en comptes de relacionar-los?
        - OneToOne clarament embedded
        - ManyToMany diria que hauria de ser relacional per no replicar quantitats ingents de dades
        - OneToMany és on tinc més dubte, suposo que és més discrecional. Si puc tenir fins a 20 brands de cada proveidor (quants brands pot tenir una òptica? 500-1000 màx?) potser surt més a compte replicar i no haver de fer el walk per referència cada cop que es faci una cerca.
    De moment faig glasses-brand-provider-address tot encastat perquè tampoc son tantes dades per cada ullera + el num d'ulleres estarà limitat a un número raonable per l'espai físic de la botiga + tota l'info que contindran encastada (brand, proveidor) és relativa a les ulleres.
    Com que és poc provable que tinguem la mateixa configuració per dues ulleres diferents (ho valida el fet que normalment s'encarreguen els vidres a mida per cada model i client), tampoc té sentit que el document de venda tingui la ullera per referència... (també perquè és one to one). És més, en comptes de tenir una col·lecció 'sale' i haver de moure ulleres entre colecció glasses i sale segons estiguin venudes o no, incloc 'sale' com a estat a glasses, amb null per not sold i objecte amb detalls de sale en cas que hagi estat venuda. Employee només té un nom, no té sentit fer una col·lecció a part i encasto dins de sale object.
    A dif d'employee, de cada client sí que tenim dades exhaustives i segurament les vulguem reaprofitar per campanyes de marqueting, autocompletar a l'aplicatiu en noves ventes, etc. Per tant, poso en col·lecció a part i vinculo a 'sale' per referència.
    clients.referred_by també aniria per referència a clients.
    UPDATE: De provider també tenim dades exhaustives i segurament ens interessi gestionar-les a part + ocupen la major part de glasses quan les encastem i es van replicant per cada item d'inventari que tinguem. Per això, externalitzo a col·lecció provider i vinculo per referència.
*/

use Optica
db.dropDatabase()
// show collections

// CREATE COLLECTIONS
db.createCollection('client');
db.createCollection('provider');
db.createCollection('glasses');


// MODEL DATA

const client_ids = [ObjectId(), ObjectId()];

const clients = [
    {
        _id: client_ids[0],
        email: 'some@email.com',
        name: 'Lluïsa Capdevila',
        phone_number: '555-555-555',
        registration: '2019-05-23',
        referred_by: null,
        address: {
            street: 'Gran Via',
            num: '221b',
            flat: 1,
            door: 4,
            city: 'Sant Esteve de les Roures',
            postal_code: 12345,
            country: 'España'
        }
    },
    {
        _id: client_ids[1],
        email: 'some_other@email.com',
        name: 'Aniol Gutiérrez',
        phone_number: '666-666-666',
        registration: '2020-01-12',
        referred_by: client_ids[0],
        address: {
            street: 'Gran Via',
            num: '221b',
            flat: 1,
            door: 4,
            city: 'Sant Esteve de les Roures',
            postal_code: 12345,
            country: 'España'
        }
    }
]

const provider_ids = [ObjectId(), ObjectId()];

const providers = [
    {
        _id: provider_ids[0],
        name: 'Alain Afflelou',
        nif: 'A83759019',
        phone_number: '911517700',
        fax_number: '911517700',
        address: {
            street: 'Paseo Castellana',
            num: '89',
            flat: 11,
            door: null,
            city: 'Madrid',
            postal_code: 28056,
            country: 'España'
        }
    },
    {
        _id: provider_ids[1],
        name: 'Multiópticas S.C.L',
        nif: 'F28465193',
        phone_number: '918357000',
        fax_number: '918463425',
        address: {
            street: 'AVENIDA DE LOS REYES (PG IND LA MINA)',
            num: null,
            flat: null,
            door: null,
            city: 'Colmenar Viejo',
            postal_code: 28770,
            country: 'España'
        }
    }
];

const brands = [
    {
        name: 'Afflelou',
        provider_id: provider_ids[0]
    },
    {
        name: 'Ray-Ban',
        provider_id: provider_ids[0]
    },
    {
        name: 'Police',
        provider_id: provider_ids[0]
    },
    {
        name: 'Ralph Lauren',
        provider_id: provider_ids[1]
    },
];

const sales = [
    {
        client_id: null,
        employee: 'Elisenda García',
        date: '2020-01-12'
    },
    {
        client_id: client_ids[0],
        employee: 'Elisenda García',
        date: '2020-03-15'
    },
    {
        client_id: client_ids[1],
        employee: 'Elisenda García',
        date: '2020-09-23'
    },
]

const glasses = [
    {
        correction_right: 2.5,
        correction_left: 1.25,
        mount_type: 'plastic',
        mount_color: 'blue',
        glass_color: null,
        price: 125.90,
        brand: brands[0],
        sale: null,
    },
    {
        correction_right: 0.25,
        correction_left: -0.5,
        mount_type: 'rimless',
        mount_color: 'silver',
        glass_color: null,
        price: 131.25,
        brand: brands[2],
        sale: sales[0]
    },
    {
        correction_right: -2.75,
        correction_left: 0.5,
        mount_type: 'metal',
        mount_color: 'chrome',
        glass_color: null,
        price: 248.12,
        brand: brands[1],
        sale: sales[1]
    },
    {
        correction_right: 0,
        correction_left: 0,
        mount_type: 'plastic',
        mount_color: 'chrome',
        glass_color: 'dark green',
        price: 22.50,
        brand: brands[3],
        sale: sales[2]
    },
]


// INSERTS

db.client.insertMany(clients);
db.provider.insertMany(providers);
db.glasses.insertMany(glasses);
