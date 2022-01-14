fs = require('fs')
const FILEPATHS = Object.freeze([
    "../restaurant.js"
]);

function ofuscate(data) {
    return data
        // Elimina línia de selecció de database
        .replace(/use.*/g, '')
        // Elimina comentaris
        .replace(/\/\/.*/g, '')
        // Substitueix nova línia per espai
        .replace(/\r\n/g, ' ')
        // Hi ha sistemes que fan servir només \n en comptes de \r\n
        .replace(/\n/g, ' ')
        // Substitueix espais múltiples per un sol espai
        .replace(/[ ]{2,}/g, ' ')
        // Substitueix espai de fi de statement per nova línia
        .replace(/; /g, ';\n')
        //Elimina espais a inici de línia
        .replace(/^ /g, '');
}

for (const FILEPATH of FILEPATHS) {
    fs.readFile(FILEPATH, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        fs.writeFile(`${FILEPATH.replace('.js', '_ofuscated.js')}`, ofuscate(data), function (err) {
            if (err) return console.log(err);
            console.log(`SUCCESS: ${FILEPATH}`);
        });
    });
}

