/* 
    Vamos a crear el manejo de rutas de express para nuestra API
    se encargara de manejar las rutas del lado backend
*/

const express = require('express');
const CancionControl = require('../control/cancionControl'); //Importamos el controlador de las funciones

var api = express.Router(); //Cargamos el manejador de rutas de Express

/*
    Estos son denominados metodos HTTP y hacen parte de las caracteristicas de una API
    Post -> Agregar datos
    GET -> Obtener datos
    PUT -> Actualizar datos
    DELETE -> Eliminar datos
*/



// Declaración de las rutas que darán paso a la ejecución de las funciones
api.post('/cancion', CancionControl.crearCancion);

//Ruta actualizar datos usuario
// api.put('/actualizarUsuario/:Id', UsuarioControl.actualizarUsuario);

api.get('/buscarCanciones', CancionControl.buscarCanciones);

//Exportación del archivo usuarioRutas


//Ruta subir cancion
api.put('/subir-cancion/:id', CancionControl.subirCancion);
//Ruta mostrar archivo
api.get('/obtener-cancion/:soundFile', CancionControl.mostrarCancion);

module.exports = api;