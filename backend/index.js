require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connection = require("./dbConnection");
const Product = require("./models/Product");
const Provider = require("./models/Provider");

// Rutas importadas
const clientRoutes = require("./routes/clientRoute");
const pedidoRoutes = require("./routes/pedidoRoute");
const productsRoutes = require("./routes/productoRoute");
const providerRoutes = require("./routes/providerRoute");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Configuración de rutas
app.use("/api/clientes", clientRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/productos", productsRoutes);
app.use("/api/proveedores", providerRoutes);

// Iniciar servidor
async function startServer() {
  try {
    await connection.authenticate(); // Solo verifica la conexión, no sincroniza
    console.log("Conexión a la base de datos establecida con éxito.");

    // No sincronizar la base de datos automáticamente
    // Elimina cualquier referencia a sync({ force: true }) o alter: true

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();





/*const path = require("path");*/
/*const express = require("express");

const cors = require("cors");
const clientRoutes = require("./routes/clientRoute");
const pedidoRoutes = require("./routes/pedidoRoute");
const productsRoutes = require("./routes/productoRoute");
const providerRoutes = require("./routes/providerRoute");
const connection = require("./dBconnection");
const admin = require("firebase-admin");
const { validarFirebase } = require("./middlewares/validadorFirebase");

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:3001" }));
app.use(express.json());

app.use("/api/clientes", clientRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/productos", productsRoutes);
app.use("/api/proveedores", providerRoutes);

/*app.use(
  express.static(path.join(__dirname, "../frontend/mi-primer-app/build"))
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/mi-primer-app/build", "index.html")
  );
});*/

/*
var serviceAccount = require("./tp-backend-238c2-firebase-adminsdk-gk5pq-9c165daa07.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/