const controlador = require("../controller/login");
const express = require("express");
const router = express.Router();


router.post("/", controlador.login);

router.get("/out", controlador.logout);

router.post("/token", controlador.refreshToken);
module.exports = router;