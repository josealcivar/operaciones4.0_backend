const controlador = require("../controller/departamentoController");
const express = require("express");
const router = express.Router();


router.post("/", controlador.createDepartamento);

router.get("/", controlador.GetDepartamentos);


module.exports = router;