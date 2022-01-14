// Fonts:
// https://docs.mongodb.com/manual/reference/command/find/
// https://docs.mongodb.com/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find
// https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/
// https://docs.mongodb.com/manual/reference/sql-comparison/
// https://docs.mongodb.com/manual/reference/operator/query/

use restaurants

// 1
db.restaurants.find();

// 2
db.restaurants.find({}, {
    restaurant_id: true,
    name: true,
    borough: true,
    cuisine: true,
});

// 3
db.restaurants.find({}, {
    _id: false,
    restaurant_id: true,
    name: true,
    borough: true,
    cuisine: true,
});

// 4
// Dubte: estic tornant zipcode com nested, com es podria tornar aplanat (zipcode sense nesting, a l'arrel de l'objecte retornat com la resta de fields)? és el que es demana? si no es demana, tindria sentit fer-ho?
db.restaurants.find({}, {
    _id: false,
    restaurant_id: true,
    name: true,
    borough: true,
    address: {
        zipcode: true
    }
});

// 5
db.restaurants.find({
    borough: "Bronx"
});

// 6
db.restaurants.find({
    borough: "Bronx"
}).limit(5);

// 7
db.restaurants.find({
    borough: "Bronx"
}).skip(5)
    .limit(5);

// 8
db.restaurants.find({
    "grades.score": {
        $gt: 90
    }
});

// 9
// TODO Proposta no funciona: és un array de grades, quan en troba un score>80 ja retorna el restaurant pq sempre n'hi ha algun <100 encara que el que és >80 no ho sigui (concretament, retorna rest amb _id: 61e1de07c3cf98530df7c4a3, que té un score amb 131 i la resta per <80). No se com resoldre-ho sense fer nested ORs visitant cada score de cada grade de l'array grades...
db.restaurants.find({
    "grades.score": {
        $gt: 80,
        $lt: 100
    }
});

// Provat també amb $elementsMatch però tampoc funciona, no troba res:
/*
db.restaurants.find({
    "grades.score": {
        $elemMatch: {
            $gt: 80,
            $lt: 100
        }
    }
});
 */

// 10
db.restaurants.find({
    "address.coord.0": {$lt: -95.754168}
});

// 11

// 12

// 13

// 14

// 15

// 16

// 17

// 18

// 19

// 20

