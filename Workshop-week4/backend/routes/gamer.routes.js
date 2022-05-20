/**
 * Descripcion: la clase gamer.routes.js, contiene todas las rutas y el 
 *             metodo de peticion con el que se va a enviar la función.
 * Author: Lorena Fajardo Díaz
 * Version: 2.0.0
 */

/** Importacion de la clase express y la funcion de Router, para crear las rutas*/
const express = require('express');
const router = express.Router();
/** Importacion de la clase gamer.controller, que coniene las funciones */
const gamerController = require('../controllers/gamer.controller')

/** Declaracion de rutas */
router.get('/', gamerController.getMain );
router.get('/createGame', gamerController.createGame );
router.post('/createGame/save', gamerController.gameSaved );
router.get('/game', gamerController.game );
router.get('/game/:id', gamerController.findGame );
router.get('/startGame', gamerController.startGame );
router.post('/startGame/start', gamerController.start );
router.get('/winners', gamerController.winner );
router.get('/game/:id/winner', gamerController.findWinner );
router.get('/delete/:id', gamerController.delete );

/** Exportacion de las rutas */
module.exports = router;