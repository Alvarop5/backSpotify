/* 
    Vamos a crear el manejo de rutas de express para nuestra API
    se encargara de manejar las rutas del lado backend
*/

const express = require('express');
const UsuarioControl = require('../control/usuarioControl'); //Importamos el controlador de las funciones
const multipart = require('connect-multiparty'); //Importamos el paquete connect-multiparty
const subirImgDirectorio = multipart({uploadDir: './archivos/usuarios'});

var api = express.Router(); //Cargamos el manejador de rutas de Express

/*
    Estos son denominados metodos HTTP y hacen parte de las caracteristicas de una API
    Post -> Agregar datos
    GET -> Obtener datos
    PUT -> Actualizar datos
    DELETE -> Eliminar datos
*/



// Declaración de las rutas que darán paso a la ejecución de las funciones
api.post('/registro', UsuarioControl.crearUsuario);
// Ruta Login Usuario
// En el caso de un login o un inicio de saesión, utilizamos el método post en vez de get.
api.post('/loginUsuario', UsuarioControl.login);
//Ruta actualizar datos usuario
api.put('/actualizarUsuario/:Id', UsuarioControl.actualizarUsuario);
//Ruta subir imagen
api.put('/subir-imagen-usuario/:id', subirImgDirectorio, UsuarioControl.subirimg);
//Ruta mostrar archivo
api.get('/obtener-imagen-usuario/:imageFile', subirImgDirectorio, UsuarioControl.mostrarArchivo);


//Exportación del archivo usuarioRutas

module.exports = api;