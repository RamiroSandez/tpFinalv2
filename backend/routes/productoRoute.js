// const express = require("express");

// const productController = require("../controller/productControllers");
// const multer = require("multer");
// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });


// router.get("/", productController.getAllProduct);            
// router.post("/", upload.single("image"), productController.createProduct);  
// router.get("/:id", productController.getProductById);       
// router.put("/:id", upload.single("image"), productController.updateProductById);  
// router.delete("/:id", productController.deleteProduct);       

// module.exports = router;


const express = require("express");
const productController = require("../controller/productControllers");
const upload = require("../middlewares/multer-config"); // Importa tu middleware

const { validarUsuario } = require("../middlewares/validadorFirebase");

const router = express.Router();

// Configuración de rutas
router.get("/",validarUsuario, productController.getAllProduct);               
router.post("/",validarUsuario, upload.single("foto"), (req, res, next) => {

    next();
  }, productController.createProduct);
    // Crear producto con imagen
router.get("/:id",validarUsuario, productController.getProductById);           
router.put("/:id",validarUsuario, upload.single("foto"), productController.updateProductById);  
router.delete("/:id",validarUsuario, productController.deleteProduct);         

module.exports = router;
