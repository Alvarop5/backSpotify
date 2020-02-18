//npm install body-parser --save // instalar el paquete de analisas del envio de los datos
//npm install connect-multiparty --save //subir archivos
//npm install mongoose --save // nos permite conectar la base de datos de mongo con node Js
//npm install nodemon --save-dev // Refrescar automaticamente el servidor

/* 
va contener toda la logica de ruteo de Express.
Declaración de rutas uso del middleware body-parser.
Permisos de acceso a cualquier cliente(Permisos al aplicativo Front hecho en Angular)
*/

const express = require('express'); // Importamos Express
const bodyParser = require('body-parser'); // Permitir analizar datos en la URL

const app = express(); //Application Express

//Solicitar las rutas ed acceso a cada función que ejecutara nuestra aplicación
const usuarioRutas = require('./rutas/usuarioRutas');
const cancionRutas = require('./rutas/cancionRutas');

//--MIDDLEWARES--
//Declaramos el analisis de datos con body-parser

app.use(bodyParser.json());

//configuración de permisos de acceso 


//Consumo de las rutas
app.use('/api', usuarioRutas);
app.use('/api', cancionRutas);

//--FIN MIDDLEWARES--

//Exportamos el archivo app.js para su uso en la aplicación o archivo raiz index.js

module.exports = app;
