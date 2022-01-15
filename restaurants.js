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
/*
// Proposta no funciona: és un array de grades, quan en troba un score>80 ja retorna el restaurant pq sempre n'hi ha algun <100 encara que el que és >80 no ho sigui (concretament, retorna rest amb _id: 61e1de07c3cf98530df7c4a3, que té un score amb 131 i la resta per <80). No se com resoldre-ho sense fer nested ORs visitant cada score de cada grade de l'array grades...

db.restaurants.find({
    "grades.score": {
        $gt: 80,
        $lt: 100
    }
});

// Provat també amb $elementsMatch però tampoc funciona (no troba res):

db.restaurants.find({
    "grades.score": {
        $elemMatch: {
            $gt: 80,
            $lt: 100
        }
    }
});
 */

// RESOLT
// Font: https://docs.mongodb.com/manual/reference/operator/query/elemMatch/#mongodb-query-op.-elemMatch
db.restaurants.find({
    grades: {
        $elemMatch: {
            score: {
                $gt: 80,
                $lt: 100
            }
        }
    }
});


// 10
db.restaurants.find({
    "address.coord.0": {
        $lt: -95.754168
    }
});

// 11
// Compte: find({cuisine: 'American'}) no retorna res, al DB està com 'American ' (amb un espai al final)
db.restaurants.find({
    $and: [
        {
            cuisine: {
                $ne: 'American '
            }
        }, {
            "grades.score": {
                $gt: 70
            }
        }, {
            "address.coord.0": {
                $lt: -65.754168
            }
        }
    ]
});


// 12
db.restaurants.find({
    cuisine: {
        $ne: 'American '
    },
    "grades.score": {
        $gt: 70
    },
    "address.coord.0": {
        $lt: -65.754168
    }
});


// 13
// Font: https://docs.mongodb.com/drivers/node/current/fundamentals/crud/read-operations/sort/
db.restaurants.find({
    cuisine: {
        $ne: 'American '
    },
    "grades.grade": 'A',
    borough: {
        $ne: 'Brooklyn'
    }
}).sort({
    cuisine: -1
});


// 14
// Font: https://docs.mongodb.com/manual/reference/operator/query/regex/#mongodb-query-op.-regex
db.restaurants.find({
    name: {
        $regex: '^Wil'
    }
}, {
    restaurant_id: true,
    name: true,
    borough: true,
    cuisine: true
});


// 15
db.restaurants.find({
    name: {
        $regex: 'ces$'
    }
}, {
    restaurant_id: true,
    name: true,
    borough: true,
    cuisine: true
});


// 16
db.restaurants.find({
    name: {
        $regex: 'Reg'
    }
}, {
    restaurant_id: true,
    name: true,
    borough: true,
    cuisine: true
});


// 17
db.restaurants.find({
    borough: 'Bronx',
    $or: [
        {
            cuisine: 'American '
        }, {
            cuisine: 'Chinese'
        }
    ]
});


// 18
db.restaurants.find({
    borough: {
        $regex: 'Staten Island|Queens|Bronx|Brooklyn'
    }
}, {
    restaurant_id: true,
    name: true,
    borough: true,
    cuisine: true
});


// 19
db.restaurants.find({
    borough: {
        $not: {
            $regex: 'Staten Island|Queens|Bronx|Brooklyn'
        }
    }
}, {
    restaurant_id: true,
    name: true,
    borough: true,
    cuisine: true
});


// 20
db.restaurants.find({
    "grades.score": {
        $lt: 10
    }
}, {
    restaurant_id: true,
    name: true,
    borough: true,
    cuisine: true
});


// 21
// OBSERVACIÓ: Si és Seafood no pot ser Chinese o American per defició, no cal filtrar-ho a la consulta
db.restaurants.find({
    cuisine: 'Seafood',
    name: {
        $not: {
            $regex: '^Wil'
        }
    }
}, {
    restaurant_id: true,
    name: true,
    borough: true,
    cuisine: true
});


// 22
// OBSERVACIÓ: entenc per la consulta 23 que en aquesta es demana que els valors dels 3 camps coincideixin en un mateix grade, el qual pot ser qualsevol de l'array
db.restaurants.find({
    grades: {
        $elemMatch: {
            grade: 'A',
            score: 11,
            date: new ISODate("2014-08-11T00:00:00Z")
        }
    }
}, {
    restaurant_id: true,
    name: true,
    grades: true
});


// 23
// Font: https://docs.mongodb.com/manual/tutorial/query-array-of-documents/
db.restaurants.find({
    "grades.1.grade": 'A',
    "grades.1.score": 9,
    "grades.1.date": new ISODate("2014-08-11T00:00:00Z")
}, {
    restaurant_id: true,
    name: true,
    grades: true
});


// 24
db.restaurants.find({
    "address.coord.1": {
            $gte: 42,
            $lte: 52
        }
}, {
    restaurant_id: true,
    name: true,
    address: true
});

// 25
db.restaurants.find().sort({
    name: 1
});


// 26
db.restaurants.find().sort({
    name: -1
});


// 27
db.restaurants.find().sort({
    cuisine: 1,
    borough: -1
});


// 28
// Font: https://docs.mongodb.com/manual/reference/operator/query/exists/
// OBSERVACIÓ: en comptes de fer servir $exists, es podria donar el cas que el field existís però estigués buit... Tampoc val si existeix però l'string que conté està buit o només té espais, caràcters de nova línia, símbols, etc. Una possible condició per acceptar que contenen el carrer seria que el field existeixi i que a més l'string del camp contingui alguna lletra:
db.restaurants.find({
    "address.street": {
        $regex: '[a-zA-Z]'
    }
});


// 29
// Font: https://docs.mongodb.com/manual/reference/operator/query/type/#mongodb-query-op.-type
db.restaurants.find({
    "address.coord.0": {
        $type: 'double',
    },
    "address.coord.1": {
        $type: 'double',
    }
});


// 30
// Font: https://docs.mongodb.com/manual/reference/operator/query/mod/#mongodb-query-op.-mod
// Font: https://sqlserverguides.com/mongodb-return-only-matching-array-elements/
// COMENTARI: El que fa és retornar el grade que ha fet match i no tot l'array de grades
db.restaurants.find({
    "grades.score": {
        $mod: [7, 0]
    }
}, {
    restaurant_id: true,
    name: true,
    grades: {
        $elemMatch: {
            score: {
                $mod: [7, 0]
            },
        }
    }
});


// 31
db.restaurants.find({
    name: {
        $regex: 'mon'
    }
},{
    name: true,
    borough: true,
    "address.coord": true,
    cuisine: true

});


// 32
db.restaurants.find({
    name: {
        $regex: '^Mad'
    }
},{
    name: true,
    borough: true,
    "address.coord": true,
    cuisine: true

});