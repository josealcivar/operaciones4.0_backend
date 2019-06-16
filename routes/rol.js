const controlador = require("../controller/rolController");
const express = require("express");
const router = express.Router();


router.post("/", controlador.createRoles);

router.get("/", controlador.GetRoles);


module.exports = router;