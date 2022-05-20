/**
 * Descripcion: la clase bets.js, contiene el modelo uilizado para las apuestas, 
 *              incluyendo el id del juego y las apuestas para los tres jugadores.
 * Author: Lorena Fajardo Díaz
 * Version: 2.0.0
 */

/** Importacion del esquema y modelo de moongose */
const { Schema, model } = require('mongoose');

/**  betsSchema: Declaracion de un nuevo esquema */
const betsSchema = new Schema(
  {
      idGame : {type: String},
      bet1: {type: Number},
      bet2: {type: Number},
      bet3: {type: Number}
    }
  )
/** Exportacion del esquema betsSchema */
  module.exports = model('Bets', betsSchema);
