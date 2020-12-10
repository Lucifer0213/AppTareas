const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//modulo de rutas creadas

const usuario = require("./route/usuario")
const autenticacion = require("./route/autenticacion.js")
const tarea = require("./route/tarea")


//App

const App = express();

App.use(express.json());

//definir la ruta para el modulo usuarios

App.use("/api/usuario",usuario);
App.use("/api/autenticacion",autenticacion)
App.use("/api/tarea",tarea)

//puertos de conexion y ejecucion

const port = process.env.PORT || 3000;
App.listen(port,() => console.log("Se esta ejecutando",port));

//registro en mongo

mongoose.connect("mongodb://localhost/tareasdb",{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

.then(() => console.log("Conectado con Mongo"))
.catch(() => console.log("Error al conectar con la base de datos "))