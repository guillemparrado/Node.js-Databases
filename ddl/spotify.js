// Arxiu per executar des de la consola (bash): mongosh < spotify.js

use spotify
db.dropDatabase()
// show collections


// CREATE COLLECTIONS
db.createCollection('user');
db.createCollection('artist');


// MODEL DATA
const user_ids = [ObjectId(), ObjectId(), ObjectId()];
const playlist_ids = [ObjectId(), ObjectId(), ObjectId()];
const song_ids = [ObjectId(), ObjectId(), ObjectId()];
const album_ids = [ObjectId(), ObjectId(), ObjectId()];
const artist_ids = [ObjectId(), ObjectId(), ObjectId()];


// Guardo album i cançons dins d'artistes per minimitzar info guardada (si ho fes des de cançons hauria de replicar la info d'àlbum i d'artista per cada cançó).
// Creo índexs al final de l'script per les ids d'àlbum i cançó per poder fer cerques eficients i no haver de visitar tots els documents d'artista per trobar-les.
const artists = [
    {
        _id: artist_ids[0],
        name: 'Blazo',
        image: 'h3c1xZacLOw875Vi8uJv9Jf5V3SNKyrF/6BXer4R1WR....RJFJrKxMMqCYuB2/joory3Ln1Z9R7SXJGN9j/9k=',
        albums: [
            {
                _id: album_ids[0],
                title: 'Colors of Jazz',
                year_published: 2021,
                cover_image: 'h3c1xZacLOw875Vi8uJv9Jf5V3SNKyrF/6BXer4R1WR....RJFJrKxMMqCYuB2/joory3Ln1Z9R7SXJGN9j/9k=',
                songs: [
                    {
                        _id: song_ids[0],
                        title: 'Distant Graphite',
                        length_in_seconds: 107,
                        times_played: 106302
                    }
                ]
            }
        ],
        related_artists: [
            artist_ids[1],
            artist_ids[2]
        ]
    }
]



const users = [
    {
        _id: user_ids[0],
        email: "some@email.com",
        password: "sdfk!n31o2.14oenk",
        username: 'julia_ramis',
        birthdate: '1988-12-12',
        gender: 'female',
        country: 'Spain',
        postal_code: '08080',
        //no creo camp per saber si user és free o premium: es pot saber mirant si subscription és null o no
        subscription: null,
        followed_artists: [],
        favorite_albums: [
            album_ids[0],
        ],
        favorite_songs: [
            song_ids[0],
        ],
        playlists: [
            {
                // A playlists faig servir el mateix disseny per saber si és deleted que a SQL: deleted_on == <data> significa que ha estat eliminada i en sabem la data, deleted_on == null significa que està activa.
                _id: playlist_ids[0],
                title: 'Chillout',
                num_of_songs: 2,
                creation_date: '2021-07-04',
                deleted_on: '2020-08-11',
                songs: [
                    {
                        song_id: song_ids[0],
                        added_by_user: user_ids[0],
                        added_on_date: '2021-07-05',
                    },
                    {
                        song_id: song_ids[1],
                        added_by_user: user_ids[1],
                        added_on_date: '2021-07-12',
                    },
                ]

            }
        ]
    }, {
        _id: user_ids[1],
        email: "some_other@email.com",
        password: "gnt4h9'24hipefgnw",
        username: 'maria_ramis',
        birthdate: '1990-05-27',
        gender: 'female',
        country: 'Spain',
        postal_code: '08080',
        subscription: {
            starting_date: '2020-11-13',
            renewal_date: '2022-02-13',
            payment_method: {
                type: 'credit card',
                card_number: '1234567890123456',
                caducity_month: 12,
                caducity_year: 2023,
                security_code: 391
            },
            invoices: [
                {
                    date: '2021-11-13',
                    invoice_id: '5422465235634532',
                    total: '9.90 €'
                }, {
                    date: '2021-12-13',
                    invoice_id: '5432437456423345',
                    total: '9.90 €'
                }, {
                    date: '2022-01-13',
                    invoice_id: '5440813443567456',
                    total: '9.90 €'
                },
            ]
        },
        followed_artists: [
            artist_ids[0],
            artist_ids[1]
        ],
        favorite_albums: [
            album_ids[0],
            album_ids[1],
            album_ids[2]
        ],
        favorite_songs: [
            song_ids[2]
        ],
        playlists: null
    }, {
        _id: user_ids[2],
        email: "some_other_other@email.com",
        password: "sdfk!n31o2.14oenk",
        username: 'max_ramis',
        birthdate: '1992-06-17',
        gender: null,
        country: 'Spain',
        postal_code: '08080',
        subscription: {
            starting_date: '2021-11-13',
            renewal_date: '2022-02-13',
            payment_method: {
                type: 'paypal',
                username: 'maxramis',
            },
            invoices: [
                {
                    date: '2021-11-13',
                    invoice_id: '5422465235634532',
                    total: '9.90 €'
                }, {
                    date: '2021-12-13',
                    invoice_id: '5432437456423345',
                    total: '9.90 €'
                }, {
                    date: '2022-01-13',
                    invoice_id: '5440813443567456',
                    total: '9.90 €'
                },
            ]
        },
        followed_artists: [
            artist_ids[0],
            artist_ids[1],
            artist_ids[2],
        ],
        favorite_albums: [
            album_ids[1]
        ],
        favorite_songs: [],
        playlists: null
    }
]


// INSERTS
db.artist.insertMany(artists);
db.user.insertMany(users);


// INDEXES
// Font: https://docs.mongodb.com/drivers/node/current/fundamentals/indexes/
// Cal crear índexs per trobar cançons i àlbums dins de la col·lecció d'artistes sense haver de visitar tots els objectes d'artista per trobar-los.

db.artist.createIndex({'albums._id': 1});
db.artist.createIndex({'albums.songs._id': 1});

// Indexo també les playlists a user per poder-les trobar sense haver de visitar tots els users
db.user.createIndex({'playlists._id': 1});


