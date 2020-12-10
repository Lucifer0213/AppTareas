// Importar los modulos

const jwt = require("jsonwebtoken")

function autenticacion (req, res, next) {
    let jwtToken = req.header("Authorization");

    jwtToken = jwtToken.split(" ")[1];

    if(!jwtToken) return res.status(400).send("No exixte el Token")

    // si exixte un JWT
    try {
        const payload = jwt.verify(jwtToken,"clave");
        req.usuario = payload;
        next();
    } catch  (error){
        res.status(400).send("Token No valido")
    }

}

//export 

module.exports = autenticacion;