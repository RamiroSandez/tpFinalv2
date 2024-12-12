const express = require("express");

const clientController = require("../controller/clientControllers");
const { validarUsuario } = require("../middlewares/validadorFirebase");

const router = express.Router();

router.get("/", validarUsuario ,clientController.getAllClient);
router.post("/", validarUsuario, clientController.createClient);
router.get("/:id", validarUsuario, clientController.getClientById);
router.put("/:id", validarUsuario,  clientController.updateClientById);
router.delete("/:id", validarUsuario, clientController.deleteClient);

module.exports = router;
