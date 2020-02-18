/* 
Se encargara de recibir los datos que el usuario envía de la vista, procesandolos
para enviarlos al modelo y que este los pueda corroborar con la BD para posteriormente guardarlos.
Tambien tendra toda la logica de las consultas, actualizaciones y eliminaciones.
*/

const Cancion = require('../modelo/canciones'); //Importamos el modelo de usuario
const fs = require('fs'); //Importamos el modulo File System de NodeJs
const path = require('path'); //Importamos el modulo path de NodeJs

// Función Registro de Usuario
// req -> Petición / Request
// res -> Respuesta / Response
function crearCancion(req, res){
    //instanciar el objeto Usuario
    var cancion = new Cancion();

    //guardar el cuerpo de la petición para mejorar el acceso a los datos que el usuario esta enviando
    var parametros = req.body;

    //Guardamos cada propiedad del Json de la petición en cada propiedad del modelo.
    cancion.nombre = parametros.nombre;
    cancion.artista = parametros.artista;
    cancion.album = parametros.album;
    cancion.duracion = parametros.duracion;
    cancion.genero = parametros.genero;
    cancion.portada = null;
    cancion.archivo = null;
    

    //parametros = {"nombre": "", "apellido":"", "correo": "", "contraseña"}
    
    //guardar y validad los datos
    //db.coleccion.insert()
    cancion.save((err, cancionNuevo)=>{
        if(err){
            //El primer error a validar será a nivel de servidor e infraestructura
            //Para esto existen states o estados.
            res.status(500).send({message: "Error en el servidor"});
        } else { 
            if(!cancionNuevo){
                //404 -> Página No encontrada
                //200 -> Ok pero con una alerta indicando que hay datos invalidos
                res.status(200).send({
                    message: "No fue posible realizar el registro"
                });
            }else{
                //200 -> ok 
                res.status(200).send({cancion: cancionNuevo});
            }

        }
    });

}


// BUSCAR CANCION

function buscarCanciones(req, res){
    const cancionId = req.params.id;
    // var nuevosDatosCancion = req.body;

    Cancion.find(cancionId, (err, cancion)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
                res.status(200).send(cancion);
        }
    });

}

//ACTUALIZAR CANCION




//SUBIR CANCION

function subirCancion(req,res){
    var cancionId = req.params.id;
    var nombreArchivo = "No ha subido ninguna cancion...";

    //validar si efectivamente se está enviando la imagen o el archivo

    if(req.files){
        //vamos ir analizando la ruta del archivo, el nombre y la extensión
        var rutaArchivo = req.files.cancion.path;
        console.log(rutaArchivo);

        var partirArchivo = rutaArchivo.split('\\');
        console.log(partirArchivo);

        var nombreArchivo = partirArchivo[2];
        console.log(nombreArchivo);
        
        var extensionCan = nombreArchivo.split('\.');
        console.log(extensionCan);

        var extensionArchivo = extensionCan[1];
        console.log(extensionArchivo);
        
        //Validar si el formato del archivo es aceptable
        
        if(extensionArchivo == "mp3"){
        //Actualizar del usuario, el campo cancion que inicialmente teniamos null
            Usuario.findByIdAndUpdate(cancionId, {archivo: nombreArchivo},(err, canci) => {
                if(err){
                    res.status(500).send({message: "Error en el servidor"});
                }else{
                    if(!canci){
                        res.status(200).send({message: "No fue posible subir la cancion"});
                    }else{
                        res.status(200).send({
                            cancion: nombreArchivo, 
                            cancion: canci});
                    }
                }          
            });

        } else{ 
            //Formato Ivalido
            res.status(200).send({message: "Formato inválido!! No es cancion"});
        } 

        } else{
            //No existe una img para subir
            res.status(200).send({message: "No ha subido ninguna cancion"});

    }
}

//MOSTRAR ARCHIVO
function mostrarCancion(req, res){
    //Pedir el archivo que queremos mostrar
    var archivo = req.params.soundFile 
    //Verificamos la carpeta para encontrar el archivo
    var ruta = './archivos/canciones/' +  archivo;

    //validar su existe la imagen
    //fs.exists('el archivo a verificar', (existe o no)=>{}) 
    fs.exists(ruta, (exists) =>{
        if(exists){
            res.sendFile(path.resolve(ruta));
        }else{
            res.status(200).send({message: "Cancion no encontrada"});
        }
    });    
}


//Exportación de las funciones creadas

module.exports = {
    crearCancion,
    buscarCanciones,
    subirCancion,
    mostrarCancion
}