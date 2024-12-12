const express = require("express");
const router = express.Router();
const pedidoController = require("../controller/pedidoControllers");

const { validarUsuario } = require("../middlewares/validadorFirebase");

router.get("/",validarUsuario, pedidoController.getAllPedidos);
router.post("/",validarUsuario, pedidoController.createPedido);
router.get("/:id",validarUsuario, pedidoController.getPedidoById);
router.put("/:id",validarUsuario, pedidoController.updatePedidoById);
router.delete("/:id",validarUsuario, pedidoController.deletePedido);

module.exports = router;
