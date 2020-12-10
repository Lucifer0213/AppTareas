// modulos internos de js

const express = require("express");
const router = express.Router();

const {Usuario} = require("../model/usuario")

router.post("/",async(req,res) => {
    const usuario = await Usuario.findOne({correo: req.body.correo});

    //sin no existe

    if(!usuario) return res.status(400).send("Correo o contraseña incorrectos o no valido");

    if(usuario.pass !== req.body.pass)  return res.status(400).send("Correo o contraseña incorrectos o no valido");

    const jwtToken = usuario.generateJWT();
    res.status(200).send({jwtToken});
})

module.exports = router;