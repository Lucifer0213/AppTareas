// modulos internos

const express = require("express");
const router = express.Router();

const {Tarea} = require("../model/tarea");
const {Usuario} = require("../model/usuario");

const autenticacion = require("../middleware/autenticacion");

router.post("/",autenticacion,async(req, res) =>{

    //definir el id del usuario que se valido
    const usuario = await Usuario.findById(req.usuario._id);

    //en caso que no exista el usuario
    if (!usuario) return res.status(400).send("El usuario no existe");

    // si el usuario existe insertamos la tarea con su id

    const tarea = new Tarea({
    idUsuario:usuario._id,
    titulo:req.body.titulo,
    descripcion: req.body.descripcion,
    estado:req.body.estado,
    });

    //Enviar el objeto
    const result = await tarea.save();
    res.status(200).send(result);
});

//Listar tareas
router.get("/listar",autenticacion,async(req,res) =>{
    const usuario = await Usuario.findById(req.usuario._id);
    if (!usuario) return res.status(400).send("El usuario no existe verifique");
    const tarea = await Tarea.find({idUsuario: req.usuario._id});
    res.send(tarea);
});

//editar tareas
router.put("/",autenticacion,async(req,res) =>{
    const usuario = await Usuario.findById(req.usuario._id);
    if (!usuario) return res.status(400).send("El usuario no existe verifique");
    const tarea = await Tarea.findByIdAndUpdate(
        req.body._id,{
            idUsuario: usuario._id,
            titulo:req.body.titulo,
            descripcion: req.body.descripcion,
            estado: req.body.estado,
        },
    {
        new:true,
    }
    );

if(!tarea) return res.status(400).send("No existen tareas asignadas")
res.status(200).send(tarea);

});

//Eliminar datos
router.delete("/:_id",autenticacion,async(req,res) =>{
    const usuario = await Usuario.findById(req.usuario._id);
    //El usuario no existe
    if(!usuario) return res.status(400).send("El usuario no existe");
    const tarea = await Tarea.findByIdAndDelete(req.params._id);

    if(!tarea) return res.status(400).send("No hay tarea asignada");
    res.status(200).send({message: "Activiad Eliminada"});
});

module.exports = router;