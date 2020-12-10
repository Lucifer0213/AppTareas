//definir los modulos internos

const express = require("express");
const router = express.Router();

// Invocar los modulos creados

const {Usuario} = require("../model/usuario");

router.post("/" , async(req,res) =>{
    //validar si el usuario existe
    let usuario = await Usuario.findOne({correo: req.body.correo});

    // sie el correo del usuario exixte en la db
    if(usuario) return res.status(400).send("El usuario ya existe en la base de datos")
    // caso contrario
    usuario = new Usuario({
        nombre:req.body.nombre,
        correo:req.body.correo,
        pass:req.body.pass
    });

    //enviar el usuario a la db y generar un JWT

    const result = await usuario.save();
    const jwtToken = usuario.generateJWT();
    res.status(200).send({jwtToken})

});

//exportar modulos

module.exports = router;