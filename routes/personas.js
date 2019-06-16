const controlador = require("../controller/personaController");
const express = require("express");
const router = express.Router();


router.post("/", controlador.createPerson);

router.get("/", controlador.getAllPersonas);


module.exports = router;