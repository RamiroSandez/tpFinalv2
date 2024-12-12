const express = require("express");
const ProviderController = require("../controller/providerControllers");

const { validarUsuario } = require("../middlewares/validadorFirebase");

const router = express.Router();

router.get("/",validarUsuario, ProviderController.getAllProvider);
router.post("/",validarUsuario, ProviderController.createProvider);
router.get("/:id",validarUsuario, ProviderController.getProviderById);
router.put("/:id",validarUsuario, ProviderController.updateProviderById);
router.delete("/:id",validarUsuario, ProviderController.deleteProvider);

module.exports = router;
