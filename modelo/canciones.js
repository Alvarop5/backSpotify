/* 
    El modelo es la respresentación en código de la estructura de nuestras tablas (colecciones en Mongo) 
    de nuestra base de datos.  
*/

const mongoose = require('mongoose'); //Importamos mongoose 
const Schema = mongoose.Schema; // Creamos un objeto Schema para nuestra colección

// Crearemos una instancia del objeto Schema 

var cancionSchema = new Schema({
    nombre: String,
    artista: String,
    album: String,
    duracion: String,
    genero: String,
    portada: String,
    archivo: String
});

// Exportar el Schema
//mongoose.model recibe dos parámetros que son el nombre de la colección
// y la estructura o el esquema (Schema) de la colección.


module.exports = mongoose.model('Cancione', cancionSchema);