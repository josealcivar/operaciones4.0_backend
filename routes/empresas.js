const controlador = require("../controller/empresaController");
const express = require("express");
const router = express.Router();


router.post("/", controlador.createEmpresa);

router.get("/", controlador.getAllEmpresas);

router.get("/empresasUsers", controlador.getAllEmpresasWithUsers);


module.exports = router;
