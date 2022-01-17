// Arxiu per executar des de la consola (bash): mongosh < spotify.js

use spotify
db.dropDatabase()
// show collections

// CREATE COLLECTIONS
db.createCollection('user');
// TODO

// MODEL DATA

const user_ids = [ObjectId()];
// TODO

const users = [
    {
        _id: user_ids[0],
        // TODO
    }
]

// INSERTS
db.user.insertMany(users);
// TODO

// INDEXES
// TODO (si cal). Exemple DB anterior: db.video.createIndex({'comments.id': 1});


