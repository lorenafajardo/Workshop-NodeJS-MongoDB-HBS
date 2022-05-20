/**
 * Descripcion: index.js, archivo que contiene informacion principal de la app, configuraciones, importaciones
 *              conexion con la base de datos, para el correcto funcionamiento de la aplicacion 
 * Autor: Lorena Fajardo Diaz
 * Version: 2.0.0
 */

/**Importacion de librerias */
const express = require('express');
const path = require("path");
const { engine } = require("express-handlebars");
const port = process.env.PORT || 8080

/** app: Constante que almacena el objeto que trae express*/
const app= express();
const mongoose = require('mongoose');
const morgan = require('morgan');


/**Configuraciones */
app.set("views", path.join(__dirname, "views"));

app.engine('handlebars', engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
}));
app.set("view engine", ".hbs");

app.use(express.static(path.join(__dirname, '../public')));


/**Middlewares: Convertidor de rutas */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));


/**Rutas */
app.use('/',require('./backend/routes/gamer.routes'));
app.use('/createGame/save',require('./backend/routes/gamer.routes'));
app.use('/createGame',require('./backend/routes/gamer.routes'));
app.use('/gamesList',require('./backend/routes/gamer.routes'));
app.use('/delete',require('./backend/routes/gamer.routes'));
app.use('/game/:id',require('./backend/routes/gamer.routes'));
app.use('/startGame',require('./backend/routes/gamer.routes'));
app.use('/startGame/start',require('./backend/routes/gamer.routes'));
app.use('/winners',require('./backend/routes/gamer.routes'));
app.use('/game/:id/winner',require('./backend/routes/gamer.routes'));

/**Inicializacion del servidor en el puerto 8080 */
app.listen(port,()=>console.log('Servidor en puerto', port)) 

/** Conexion de la base de datos con el programa */
mongoose.connect('mongodb+srv://workshopv:workshopv@cluster.3tikh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=> console.log('conectados con mongoDBAtlas'))
.catch((error)=>console.log(error))



