/**
 * Descripcion: la clase winner.js, contiene el modelo uilizado para almacenar los 
 *              ganadores y el estado de juego.
 * Author: Lorena Fajardo Díaz
 * Version: 2.0.0
 */

/** Importacion del esquema y modelo de moongose */
const { Schema, model } = require('mongoose');

/**  winnerSchema: Declaracion de un nuevo esquema */
const winnerSchema = new Schema(
    {
        idGame: 
        {
            type: String
        },
        winner:
        {
            type: String,
        },
        finishStatus: 
        {
            type: Boolean,
        }
    }
)

/** Exportacion del esquema winnerSchema*/
module.exports = model('Winner', winnerSchema);
