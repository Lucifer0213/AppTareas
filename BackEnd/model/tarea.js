const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const esquemaTarea = new mongoose.Schema({
    idUsuario: String,
    titulo: String,
    descripcion: String,
    estado: String,
    fecha: {
        type:Date,
        default: Date.now,
    },
});

//export

const Tarea = mongoose.model("tarea",esquemaTarea);
module.exports.Tarea = Tarea;
//module.exports.esquemaTarea = esquemaTarea;