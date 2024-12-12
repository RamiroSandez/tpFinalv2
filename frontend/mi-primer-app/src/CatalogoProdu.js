import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const CatalogoProdu = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const token = localStorage.getItem("firebaseToken");
        if (!token) {
          console.error("No se encontró el token en localStorage.");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/productos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Productos recibidos:", response.data);
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error.response || error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className="p-container">
      <h2>Catálogo de Productos</h2>
      <DataTable value={productos} responsiveLayout="scroll">
        <Column field="nombreComercial" header="Nombre Comercial" />
        <Column field="precioVenta" header="Precio de Venta" />
        <Column
          header="Foto"
          body={(rowData) => {
            try {
              if (rowData.foto && rowData.foto.data) {
                const base64Image = btoa(
                  new Uint8Array(rowData.foto.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                );
                return (
                  <img
                    src={`data:image/jpeg;base64,${base64Image}`}
                    alt={rowData.nombreComercial || "Producto"}
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/100")
                    }
                  />
                );
              }
            } catch (error) {
              console.error("Error al renderizar la imagen:", error);
            }
            return <span>Sin imagen</span>;
          }}
        />
      </DataTable>
    </div>
  );
};

export default CatalogoProdu;
