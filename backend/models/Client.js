const connection = require("../dBconnection");
const { DataTypes } = require("sequelize");

const Client = connection.define("Client", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cuit: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});



module.exports = Client;
