// const { DataTypes } = require('sequelize');
// const sequelize = require('../dbConnection'); 

// const Product = sequelize.define('Product', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   nombreComercial: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   nombre: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   unidadMedida: {
//     type: DataTypes.STRING,
//   },
//   precioCompra: {
//     type: DataTypes.INTEGER,
//   },
//   precioVenta: {
//     type: DataTypes.INTEGER,
//   },
//   proveedor: {
//     type: DataTypes.STRING, // Guardar el nombre del proveedor
//     allowNull: false,
//   },
//   foto: {
//     type: DataTypes.BLOB('long'),
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// });

// module.exports = Product;


const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombreComercial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unidadMedida: {
    type: DataTypes.STRING,
  },
  precioCompra: {
    type: DataTypes.FLOAT,
  },
  precioVenta: {
    type: DataTypes.FLOAT,
  },
  proveedor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.BLOB("long"), // Aquí guardamos el blob de la imagen
    allowNull: true, // Permite que el campo sea opcional
  },
}, {
  timestamps: true, // Mantiene createdAt y updatedAt
});

module.exports = Product;


