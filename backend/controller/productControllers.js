const Product = require("../models/Product");
const Provider = require("../models/Provider"); // Cambia la ruta según tu estructura de proyecto

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// Obtener todos los productos
// Obtener todos los productos
const getAllProduct = async (req, res) => {
  try {
    const productos = await Product.findAll(); // Incluye todos los campos, incluido 'foto'
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};





// const getAllProduct = async (req, res) => {
//   try {
//     const productos = await Product.scope("withFoto").findAll();
//     res.status(200).json(productos);
//   } catch (error) {
//     console.error("Error al obtener los productos:", error);
//     res.status(500).json({ error: "Error al obtener los productos." });
//   }
// };

// async function createProduct(req, res) {
//   const {
//     nombreComercial,
//     nombre,
//     unidadMedida,
//     precioCompra,
//     precioVenta,
//     proveedor, 
//   } = req.body;

//   try {
//     const foto = req.file ? req.file.buffer : null;

    
//     const product = await Product.create({
//       nombreComercial,
//       nombre,
//       unidadMedida,
//       precioCompra,
//       precioVenta,
//       proveedor, 
//       foto,
//     });

//     res.status(201).send(product);
//   } catch (error) {
//     console.error("Error al crear producto:", error);
//     res.status(500).send("Hubo un problema al crear el producto");
//   }
// }


// productControllers.js

// Crear un producto
async function createProduct(req, res) {
  try {
    console.log("Datos recibidos en req.body:", req.body);
    console.log("Archivo recibido en req.file:", req.file);

    const {
      nombreComercial,
      nombre,
      unidadMedida,
      precioCompra,
      precioVenta,
      proveedor,
    } = req.body;

    const foto = req.file ? req.file.buffer : null;

    const product = await Product.create({
      nombreComercial,
      nombre,
      unidadMedida,
      precioCompra,
      precioVenta,
      proveedor,
      foto,
    });

    console.log("Producto creado:", product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).send("Hubo un problema al crear el producto");
  }
}


// Actualizar un producto
async function updateProductById(req, res) {
  const { id } = req.params;

  const {
    nombreComercial,
    nombre,
    unidadMedida,
    precioCompra,
    precioVenta,
    proveedor,
  } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send("El producto no existe");
    }

    const foto = req.file ? req.file.buffer : product.foto;

    await product.update({
      nombreComercial,
      nombre,
      unidadMedida,
      precioCompra,
      precioVenta,
      proveedor,
      foto,
    });

    console.log("Producto actualizado correctamente:", product);
    res.json(product);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).send("Hubo un problema al actualizar el producto");
  }
}








// Obtener un producto por su ID
async function getProductById(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: Provider,
          attributes: ["id", "nombre"], // Incluye información del proveedor
        },
      ],
    });
    if (!product) {
      return res.status(404).send("El producto no existe");
    }
    res.json(product);
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).send("Hubo un problema al obtener el producto");
  }
}

// Actualizar un producto por su ID


// async function updateProductById(req, res) {
//   const { id } = req.params;
//   const {
//     nombreComercial,
//     nombre,
//     unidadMedida,
//     precioCompra,
//     precioVenta,
//     proveedor,
//   } = req.body;

//   try {
//     const product = await Product.findByPk(id);

//     if (!product) {
//       return res.status(404).send("El producto no existe");
//     }

//     const foto = req.file ? req.file.buffer : product.foto;

  
//     const proveedorNombre = typeof proveedor === "string" ? proveedor : proveedor.nombre;

//     await product.update({
//       nombreComercial,
//       nombre,
//       unidadMedida,
//       precioCompra,
//       precioVenta,
//       proveedor: proveedorNombre, 
//       foto,
//     });

//     res.json(product);
//   } catch (error) {
//     console.error("Error al actualizar producto:", error);
//     res.status(500).send("Hubo un problema al actualizar el producto");
//   }
// }



// Eliminar un producto por su ID
async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).send("El Producto no existe");
    }

    await product.destroy();
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).send("Hubo un problema al eliminar el producto");
  }
}

module.exports = {
  getAllProduct,
  createProduct,
  getProductById,
  updateProductById,
  deleteProduct,
};
