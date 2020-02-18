/* 
Se encargara de recibir los datos que el usuario envía de la vista, procesandolos
para enviarlos al modelo y que este los pueda corroborar con la BD para posteriormente guardarlos.
Tambien tendra toda la logica de las consultas, actualizaciones y eliminaciones.
*/

const Usuario = require('../modelo/usuario'); //Importamos el modelo de usuario
const fs = require('fs'); //Importamos el modulo File System de NodeJs
const path = require('path'); //Importamos el modulo path de NodeJs

// Función Registro de Usuario
// req -> Petición / Request
// res -> Respuesta / Response
function crearUsuario(req, res){
    //instanciar el objeto Usuario
    var usuario = new Usuario();

    //guardar el cuerpo de la petición para mejorar el acceso a los datos que el usuario esta enviando
    var parametros = req.body;

    //Guardamos cada propiedad del Json de la petición en cada propiedad del modelo.
    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contraseña = parametros.contraseña;
    usuario.rol = "usuario";
    usuario.imagen = null;

    //parametros = {"nombre": "", "apellido":"", "correo": "", "contraseña"}
    
    //guardar y validad los datos
    //db.coleccion.insert()
    usuario.save((err, usuarioNuevo)=>{
        if(err){
            //El primer error a validar será a nivel de servidor e infraestructura
            //Para esto existen states o estados.
            res.status(500).send({message: "Error en el servidor"});
        } else { 
            if(!usuarioNuevo){
                //404 -> Página No encontrada
                //200 -> Ok pero con una alerta indicando que hay datos invalidos
                res.status(200).send({
                    message: "No fue posible realizar el registro"
                });
            }else{
                //200 -> ok 
                res.status(200).send({usuario: usuarioNuevo});
            }

        }
    });

}



//LOGIN USUARIO

function login(req,res){
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contraseña;
    
    //Buscamos al usuario a través del correo. Usaresmis toLowerCase() para evitar problemas de datos

    Usuario.findOne({correo: correoUsuario.toLowerCase()}, (err, usuarioLogueado)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor!!"});
        }else{
            if(!usuarioLogueado){
                res.status(200).send({message: "No has podido iniciar sesión, Verifica los datos"});    
            }else{
                if(usuarioLogueado.contraseña != contraUsuario){
                    res.status(200).send({message: "Contraseña incorrecta"});
                } else{
                    res.status(200).send({usuario: usuarioLogueado});
                }
            }
        }
    });
}

//ACTUALIZAR USUARIO

function actualizarUsuario(req, res){
    var usuarioId = req.params.id;
    var nuevosDatosUsuario = req.body;

    Usuario.findByIdAndUpdate(usuarioId, nuevosDatosUsuario, (err, usuarioActualizado)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!usuarioActualizado){
                res.status(200).send({usuario: usuarioActualizado});
            }
        }
    });

}

//SUBIR IMAGEN

function subirimg(req,res){
    var usuarioId = req.params.id;
    var nombreArchivo = "No ha subido ninguna imagen...";

    //validar si efectivamente se está enviando la imagen o el archivo

    if(req.files){
        //vamos ir analizando la ruta del archivo, el nombre y la extensión
        var rutaArchivo = req.files.imagen.path;
        console.log(rutaArchivo);

        var partirArchivo = rutaArchivo.split('\\');
        console.log(partirArchivo);

        var nombreArchivo = partirArchivo[2];
        console.log(nombreArchivo);
        
        var extensionImg = nombreArchivo.split('\.');
        console.log(extensionImg);

        var extensionArchivo = extensionImg[1];
        console.log(extensionArchivo);
        
        //Validar si el formato del archivo es aceptable
        
        if(extensionArchivo == "png"|| extensionArchivo == "jpg" || extensionArchivo == "jpeg"){
        //Actualizar del usuario, el campo imagen que inicialmente teniamos null
            Usuario.findByIdAndUpdate(usuarioId, {imagen: nombreArchivo},(err, usuarioConImg) => {
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                }else{
                    if(!usuarioConImg){
                        res.status(200).send({message: "No fue posible subir la imagen"});
                    }else{
                        res.status(200).send({
                            imagen: nombreArchivo, 
                            usuario: usuarioConImg});
                    }
                }          
            });

        } else{ 
            //Formato Ivalido
            res.status(200).send({message: "Formato inválido!! No es imagen"});
        } 

        } else{
            //No existe una img para subir
            res.status(200).send({message: "No ha subido ninguna imagen"});

    }
}

//MOSTRAR ARCHIVO
function mostrarArchivo(req, res){
    //Pedir el archivo que queremos mostrar
    var archivo = req.params.imageFile 
    //Verificamos la carpeta para encontrar el archivo
    var ruta = './archivos/usuarios/' +  archivo;

    //validar su existe la imagen
    //fs.exists('el archivo a verificar', (existe o no)=>{}) 
    fs.exists(ruta, (exists) =>{
        if(exists){
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: "Imagen no encontrada"});
        }
    });    
}

//Exportación de las funciones creadas

module.exports = {
    crearUsuario,
    login,
    actualizarUsuario,
    subirimg,
    mostrarArchivo
}
