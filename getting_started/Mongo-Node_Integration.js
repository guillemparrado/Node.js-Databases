// Font1: https://youtu.be/EcJERV3IiLM?t=802
// Font2: connectar mongodb a node.js: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
// Font3: mongodb+express: https://youtu.be/EcJERV3IiLM?t=2190, https://github.com/LearnWebCode/express-mongodb-example

// CODEALONG FONT 1
/*
Previ, a shell:
    $ npm init -y
    $ npm install mongodb
 */

const mongodb = require('mongodb');
const connectionString = 'mongodb://localhost:27017/';
/*
Exemple connectionString amb Atlas per connectar a DB real: A Atlas crear DB amb user i password i assignar privileges. Llavors clusters -> connect -> selecciona allowed IPs (0.0.0.0/0 per anywhere) -> Chose a connection method -> connect application -> Copiar connection string, enganxar aquí, substituïr '<password>' a l'string per l'actual password de l'usuari i '<dbname>' per l'actual dbname a que ens vulguem connectar. El connection string és un secret pq té el password, cal posar en file a part '.env' al root del directory, afegir a .gitignore perquè no es pugi i a .env posar:
CONNECTIONSTRING=...(el valor del connection string).
Llavors:
    --> a shell
    $ npm install dotenv

    --> a js file
    const dotenv = require('dotenv')
    dotenv.config()  // (Sense params)

    --> per recuperar valor
    process.env.CONNECTIONSTRING // en comptes de declarar 'connectionString'

    --> Exemple d'ús
    mongodb.MongoClient.connect(process.env.CONNECTIONSTRING, function(...

    --> per deployment
    el que fa dotenv és carregar .env a env vars, per deployment només hem de posar els secrets com env vars abans de llençar l'aplicació
 */

// CONNECT
mongodb.MongoClient.connect(connectionString, async function (err, client) {

    const db = client.db();
    const pets = db.collection("pets");

    //CRUD - compte, tot ha d'anar en try-catch, només n'he posat alguns
    // Create
    try {
        await pets.insertOne(
            {
                name: "AlwaysHungry",
                species: "cat", age: 4
            }
        );
        console.log("Added new animal");
    } catch (e) {
        console.log(e);
    }

    // Read
    const results = await db.collection("pets").find({species: "dog"}).toArray();
    console.log(results);

    // Update v1
    await pets.updateOne(
        {name: "AlwaysHungy"},
        {$set:{name: "UsuallyHungy"}}
    );

    // Update v2: Millor buscar per _id (està indexat i la resta en principi no)
    await pets.updateOne(
        {_id: mongodb.ObjectId.createFromHexString("507f1f77bcf86cd799439011")},
        {$set:{name: "UsuallyHungy"}}
    );

    // Delete
    await pets.deleteOne({_id: mongodb.ObjectId.createFromHexString("507f1f77bcf86cd799439011")});

    // CLOSE
    await client.close(); // No cal si fem servir express.js pq voldrem deixar la connexió oberta


})

