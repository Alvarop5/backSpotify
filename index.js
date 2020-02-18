/* Estamos creando una API REST

API - Aplication Programing Interface
    Arquitectura que permite a un desarrollador interactuar con los datos de una aplicación de forma organizada.

    Esta aplicación se encuentra en la nube(AWS/ IBM cloud...etc) estamos totalmente disponible para su consumo por 
    parte de cualquier cliente (una aplicaciòn frontend como lo puede ser una desarrollada en Angular).

    Un ejemplo de una API es el inicio de sesiòn a traves de una red social o cuenta de correo.
    una app de geolocalizaciòn que consume la API de Google Maps.

    La API REST se caractreriza por manejar la informaciòn en forma JSON, ya que es un formato de texto sumamente ligero, compatible con cualquier lenguaje de programaciòn.
    Es el intercambio ideal de datos ya que nos permite un fàcil acceso a cada una de las propiedades ("clave":"valor"), para lograr extraer los datos que necesitemos. 

REST - Representational State Transfer 
    Arquitectura de diseño de aplicaciones en redes. Ofrece tecnologias complejas a partir de los protocolos HTTP y HTTPS
    (Hyper Text Transfer Protocol).
*/

/* Va a contener la conexiòn de nodeJs con nuestra BD Mongo a travès de mongoose.
*/

const mongoose = require('mongoose'); //Impotamos mongoose para la conexión
const app = require('./app'); //Vamos a importar la logica de Express "./appse va a asegurar en buscarlo en el archivo raiz"
const port = 4000; // declaramos el puerto que deseemos

//Vamo a crear la logica de la conexión con la BD.
//el metodo connect recibe dos parametros, el primero la ruta de la BD a enlazar y el segundo será una función que a 
//su vez recibira los parametros de error y respuesta
mongoose.connect('mongodb://localhost:27017/bictiafyAM', (err, res)=>{
    if(err){
        console.log(`El erro es: ${err}`);
    }else{
        console.log('Conexión Exitosa!!!');
        app.listen(port, ()=>{
            console.log(`Puerto: ${port}`);
        });
    }
});
