/**
 * Descripcion: Gamer.controller.js, es la clase que contiene todas las funciones que se ejecutaran en el programa
 * Author: Lorena Fajardo Díaz
 * Version: 2.0.0
 */


/** Importacion de los modelos gamer, bets y winner */
const Gamer = require('../models/gamer');
const Bets = require('../models/bets');
const Winner = require('../models/winner');

/** gamerController: Constante donde se encotrataran las funciones definidas*/
const gamerController ={};

/** getMain: Funcion que redirecciona a la pagina principal del juego*/
gamerController.getMain = (req, res) => {
    res.render('../views/layouts/main')
    };

/** createGame: Funcion para redireccioar a la vista createGame, que contiene el formulario para crear un juego*/
gamerController.createGame = (req, res) => {
    res.render('../views/layouts/createGame')
    };

/** gameSaved: Funcion para capurar los valores del formulario de crear juego, enviarselos en una instancia del 
 * modelo gamer y guardarlos en la base de datos de mongo
 */
gamerController.gameSaved = async (req, res)=>{
    const  {gamer1, gamer2, gamer3}  = req.body;
    const newGame = new Gamer({gamers:{gamer1: gamer1 , gamer2:gamer2, gamer3:gamer3 }}, {finishStatus : false} );
    console.log(newGame);
    await newGame.save();
    res.send("El juego ha sido guardado con exito, lo puede encontrar en la seccion de historial de juegos.")
}

/** startGame: Funcion para mostrar juegos en la vista startGame*/
gamerController.startGame = async(req, res)=>{
    const games = await Gamer.find();
    res.render("../views/layouts/startGame",{ games })
}

/** start: Funcion para dar el valor aleatorio a las apuestas, segun las caras de los dados, se comparan los 
 * puntajes con el condicional if y se determina el ganador
  */
gamerController.start= async(req, res)=>{
    
    const  { idGame }  = req.body;
    
    console.log(idGame)

    const bet1 = Math.floor(Math.random() * (6)) + 1;
    const bet2 = Math.floor(Math.random() * (6)) + 1;
    const bet3 = Math.floor(Math.random() * (6)) + 1;

    const gamer = await Gamer.findById(idGame);

    const bets = new Bets({ idGame:idGame , bet1: bet1 , bet2:bet2, bet3:bet3 } );
    bets.save();

    if (bet1>bet2 && bet1>bet3 ){
        var winnerName = gamer.gamers.gamer1;
    }else if(bet2>bet1 && bet2>bet3 ){
        var winnerName = gamer.gamers.gamer2;
    }else if(bet3>bet1 && bet3>bet2 ){
        var winnerName = gamer.gamers.gamer3;
    }else if(bet1 === bet2 === bet3 || bet1 === bet2 || bet1 === bet3 || bet2 === bet3 ){
        var winnerName = "Juego empatado";
    }
    const winner = new Winner ({ idGame:idGame , winner: winnerName , finishStatus: true } )
    winner.save()

    res.render("../views/layouts/start", { gamer, bets, winner })  
}

/** game: Funcion que muestra los juegos y su id*/
gamerController.game= async(req, res)=>{
    const games = await Gamer.find();
    res.render("../views/layouts/game", { games });
}

/**findGame: Funcion para encontrar el juego y el ganador segun el id enviado   */
gamerController.findGame = async(req, res)=>{
    const game = await Gamer.findById(req.params.id);
    const id = req.params.id;
    const winner = await Winner.find({ idGame: id });
    res.render("../views/layouts/findgame", { game, winner });
}

/** winner : Funcion que muestra juegos con sus respectivos id, para identicficar 
 * el id del juego que busca el ganador*/
gamerController.winner= async(req, res)=>{
    const games = await Gamer.find();
    res.render("../views/layouts/winners", { games });
}

/** findWinner: Funcion para encotrar el gaador de un juego segun el id enviado */
gamerController.findWinner = async(req, res)=>{
    const id = req.params.id;
    const winner = await Winner.find({ idGame: id });
    res.render("../views/layouts/findWinner", { winner });
}

/** delete : Funcion para eliminar un objeto segun el id ingresado*/
gamerController.delete = async(req, res)=>{
    await Gamer.findByIdAndRemove(req.params.id);
    res.send("Juego eliminado")
}

/** Exportacion de todas las funciones declaradas en gamerController*/
module.exports = gamerController;