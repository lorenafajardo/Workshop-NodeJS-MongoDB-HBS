/**
 * Descripcion: la clase gamer.js, contiene el modelo utilizado para almacenar
 *              los jugadores. 
 * Author: Lorena Fajardo Díaz
 * Version: 2.0.0
 */

/** Importacion del esquema y modelo de moongose */
const { Schema, model } = require('mongoose');

/**  gamerSchema: Declaracion de un nuevo esquema */
const gamerSchema = new Schema(
  {
    gamers:{
      gamer1: {type: String,required: true},
      gamer2: {type: String,required: true},
      gamer3: {type: String, required: true},
      }
    }
    );
/** Exportacion del esquema betsSchema */
module.exports = model('Gamer', gamerSchema);

