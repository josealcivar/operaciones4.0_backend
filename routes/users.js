const controlador = require("../controller/userController");
const express = require("express");
const router = express.Router();


router.post("/", controlador.createUser);
router.post("/createUserAdmin", controlador.createUserAdmin);

router.get("/", controlador.getAllUsers);
router.get("/listSupers", controlador.getSuperUsers);


module.exports = router;