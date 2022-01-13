// Font1: https://www.youtube.com/watch?v=EjcAqAJjmEo
// Són comandes de terminal: A copiar-enganxar a mongosh o bé entrar per stdin: mongo < getting_started
// Per fer el mateix a JS, ojecte 'db' existeix a node i i el podem cridar per fer operacions

// Font2: https://www.tutorialesprogramacionya.com/mongodbya/index.php

// CODE-ALONG FONT 1

// TIP: Per deshabilitar inspecció (errors i warnings) de files i carpetes concrets a Webstorm: Settings > Languages and frameworks > Javascript > Libraries > Afegir carpeta 'getting_started' com a biblioteca i uncheck enable (Font: https://stackoverflow.com/a/23367600).
// Silencio alguna comanda perquè encara donaven errors (les que comencen per show i use)

// Show databases:

// > show dbs

// Crea i usa database o només usa si ja existeix
// Compte, fins que no li posem cap collection no apareixerà a 'show dbs': fins que no contingui data no existirà realment

// > use newDB

// Print nom del database que estiguem fent servir at the moment
db

// Delete current database
db.dropDatabase()

// Crea col·lecció
db.createCollection('clients')

// Elimina col·lecció
db.clients.drop()

// Show collections from the database
// > show collections

// Inserta document a la col·lecció
db.clients.insertOne({
    id: 0,
    company: "asdf",
    address: "221b Baker Street, London",
    overdue_invoices: 24,
    products: ["coffee", "sugar"],
    date: Date(),
    contacts: {
        name: "Jim Neal",
        position: "owner",
        phone_number: 5550011
        }
})

// Query the data
db.clients.find()

// Delete document
// Compte: id és la que hem posat nosaltres, Mongo genera _id automàticament per la seva gestió, nosaltres hauríem de tenir la nostra amb significat de negoci independent de _id.
db.clients.deleteMany({id: 0})

// Inserta múltiples documents
db.clients.insertMany([
{
    id: 0,
    company: "asdf",
    address: "221b Baker Street, London",
    overdue_invoices: 20,
    products: ["coffee", "sugar"],
    date: Date(),
    contacts: {
        name: "Jim Neal",
        position: "owner",
        phone_number: 5550011
        }
}, {
    id: 1,
    company: "qwer",
    address: "221b Baker Street, London",
    overdue_invoices: 20,
    products: ["coffee", "sugar"],
    date: Date(),
    contacts: {
        name: "Jim Neal",
        position: "owner",
        phone_number: 5550011
        }
}, {
    id: 2,
    company: "zxcv",
    address: "221b Baker Street, London",
    overdue_invoices: 22,
    products: ["coffee", "sugar"],
    date: Date(),
    contacts: {
        name: "Jim Neal",
        position: "owner",
        phone_number: 5550011
        }
}
])

// QUERYING

// choose a document based on a criteria
db.clients.find({overdue_invoices: 20})

// sorting: 1 for ascending, -1 for descending
db.clients.find().sort({id:1})

// Counting
db.clients.find({overdue_invoices: 20}).count()

// Updating values + inserció de nous fields
db.clients.updateOne({id: 2}, {
    $set: {
        overdue_invoices: 40,
        imported: "James Ltd."
    }
})

db.clients.find({id:2})

// Incrementing - incrementa en 7 unitats les 20 que ja tenia
db.clients.updateOne({id:1}, {
    $inc: {
    overdue_invoices: 7
    }
})

db.clients.find({id:1})

// Renaming

db.clients.updateOne({id:1}, {
    $rename:{
        company: "legal_name"
    }
})

db.clients.find({id:1})

// Update array
db.clients.updateOne({id:0},{
    $set:{
        products:["vanilla", "milk"]
    }
})

db.clients.find()