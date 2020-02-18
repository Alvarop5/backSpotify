/* 
    El modelo es la respresentación en código de la estructura de nuestras tablas (colecciones en Mongo) 
    de nuestra base de datos.  
*/

const mongoose = require('mongoose'); //Importamos mongoose 
const Schema = mongoose.Schema; // Creamos un objeto Schema para nuestra colección

// Crearemos una instancia del objeto Schema 

var UsuarioSchema = new Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contraseña: String,
    rol: String,
    imagen: String
});

// Exportar el Schema
//mongoose.model recibe dos parámetros que son el nombre de la colección
// y la estructura o el esquema (Schema) de la colección.


module.exports = mongoose.model('Usuario', UsuarioSchema);