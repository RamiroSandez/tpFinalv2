import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

const AbmProductos = () => {
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    nombreComercial: "",
    unidadMedida: "",
    precioCompra: "",
    precioVenta: "",
    proveedor: null,
    foto: null,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    obtenerProductos();
    obtenerProveedores();
  }, []);

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
  
      // Configuramos productos directamente sin fotoURL
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error.response || error);
    }
  };
  
  
  const obtenerProveedores = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      if (!token) {
        console.error("No se encontró el token en localStorage.");
        return;
      }
  
      const response = await axios.get("http://localhost:3000/api/proveedores", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Proveedores obtenidos:", response.data);
      setProveedores(
        response.data.map((proveedor) => ({
          id: proveedor.id,
          nombre: proveedor.nombre,
        }))
      );
    } catch (error) {
      console.error("Error al obtener los proveedores:", error.response || error);
    }
  };
  
  const editarProducto = async () => {
    const formData = new FormData();
  
    formData.append("nombreComercial", form.nombreComercial);
    formData.append("nombre", form.nombre);
    formData.append("unidadMedida", form.unidadMedida);
    formData.append("precioCompra", form.precioCompra);
    formData.append("precioVenta", form.precioVenta);
    formData.append("proveedor", form.proveedor);
  
    if (form.foto) {
      console.log("Archivo seleccionado para edición:", form.foto);
      formData.append("foto", form.foto);
    } else {
      console.warn("No se seleccionó ninguna foto nueva.");
    }
  
    try {
      const token = localStorage.getItem("firebaseToken");
      if (!token) {
        console.error("No se encontró el token en localStorage.");
        return;
      }
  
      const response = await axios.put(
        `http://localhost:3000/api/productos/${form.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Producto actualizado con éxito:", response.data);
      setModalVisible(false);
      obtenerProductos();
    } catch (error) {
      console.error("Error al actualizar producto:", error.response || error);
    }
  };
  
  const guardarProducto = async () => {
    const formData = new FormData();
  
    formData.append("nombreComercial", form.nombreComercial);
    formData.append("nombre", form.nombre);
    formData.append("unidadMedida", form.unidadMedida);
    formData.append("precioCompra", form.precioCompra);
    formData.append("precioVenta", form.precioVenta);
    formData.append("proveedor", form.proveedor);
  
    if (form.foto) {
      console.log("Archivo seleccionado en frontend:", form.foto);
      formData.append("foto", form.foto);
    } else {
      console.error("Ninguna foto seleccionada en el frontend.");
    }
  
    try {
      const token = localStorage.getItem("firebaseToken");
      if (!token) {
        console.error("No se encontró el token en localStorage.");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:3000/api/productos",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Producto guardado con éxito:", response.data);
      setModalVisible(false);
      obtenerProductos();
    } catch (error) {
      console.error("Error al guardar producto:", error.response || error);
    }
  };
  
  const eliminarProducto = async (producto) => {
    try {
      const token = localStorage.getItem("firebaseToken");
      if (!token) {
        console.error("No se encontró el token en localStorage.");
        return;
      }
  
      await axios.delete(`http://localhost:3000/api/productos/${producto.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      obtenerProductos();
      console.log(`Producto con ID ${producto.id} eliminado con éxito.`);
    } catch (error) {
      console.error("Error al eliminar producto:", error.response || error);
    }
  };
  

  const abrirModal = (producto) => {
    setForm(
      producto || {
        id: "",
        nombre: "",
        nombreComercial: "",
        unidadMedida: "",
        precioCompra: "",
        precioVenta: "",
        proveedor: null,
        foto: null,
      }
    );
    setEditMode(!!producto);
    setModalVisible(true);
  };

  const resetForm = () => {
    setForm({
      id: "",
      nombre: "",
      nombreComercial: "",
      unidadMedida: "",
      precioCompra: "",
      precioVenta: "",
      proveedor: "",
      foto: null,
    });
  };

  return (
    <div className="p-container">
      <Button
        label="Nuevo Producto"
        icon="pi pi-plus"
        onClick={() => abrirModal(null)}
      />

      <DataTable value={productos} responsiveLayout="scroll">
        <Column field="id" header="Id" />
        <Column field="nombre" header="Nombre" />
        <Column field="nombreComercial" header="Nombre Comercial" />
        <Column field="unidadMedida" header="Unidad de Medida" />
        <Column field="precioCompra" header="Precio Compra" />
        <Column field="precioVenta" header="Precio Venta" />
        <Column
  field="proveedor"
  header="Proveedor"
/>




{/* <Column
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
        const imageUrl = `data:image/png;base64,${base64Image}`;
        return (
          <img
            src={imageUrl}
            alt="Vista previa"
            style={{ width: "100px", height: "auto" }}
          />
        );
      }
    } catch (error) {
      console.error("Error al renderizar la imagen:", error);
    }
    return "Sin imagen";
  }}
/> */}

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
            style={{ width: "100px", height: "auto", objectFit: "cover" }}
            onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
          />
        );
      }
    } catch (error) {
      console.error("Error al renderizar la imagen:", error);
    }
    return <span>Sin imagen</span>;
  }}
/>










        <Column
          header="Acciones"
          body={(rowData) => (
            <>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info"
                onClick={() => abrirModal(rowData)}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => eliminarProducto(rowData)}
              />
            </>
          )}
        />
      </DataTable>

      <Dialog
        header={editMode ? "Editar Producto" : "Nuevo Producto"}
        visible={modalVisible}
        onHide={() => setModalVisible(false)}
      >
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>

          <div className="p-field">
            <label htmlFor="nombreComercial">Nombre Comercial</label>
            <InputText
              id="nombreComercial"
              name="nombreComercial"
              value={form.nombreComercial}
              onChange={(e) =>
                setForm({ ...form, nombreComercial: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="unidadMedida">Unidad de Medida</label>
            <InputText
              id="unidadMedida"
              name="unidadMedida"
              value={form.unidadMedida}
              onChange={(e) =>
                setForm({ ...form, unidadMedida: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="precioCompra">Precio Compra</label>
            <InputText
              id="precioCompra"
              name="precioCompra"
              value={form.precioCompra}
              onChange={(e) =>
                setForm({ ...form, precioCompra: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="precioVenta">Precio Venta</label>
            <InputText
              id="precioVenta"
              name="precioVenta"
              value={form.precioVenta}
              onChange={(e) =>
                setForm({ ...form, precioVenta: e.target.value })
              }
            />
          </div>

          <div className="p-field">
            <label htmlFor="proveedor">Proveedor</label>
            <Dropdown
              id="proveedor"
              name="proveedor"
              value={form.proveedor} 
              options={proveedores.map((prov) => ({ label: prov.nombre, value: prov.nombre }))} 
              onChange={(e) => setForm({ ...form, proveedor: e.value })} 
              placeholder="Seleccionar Proveedor"
            />








          </div>

          <div className="p-field">
            <label htmlFor="foto">Foto</label>
            <FileUpload
              id="foto"
              mode="basic"
              name="foto"
              accept="image/*"
              auto={false}
              customUpload
              uploadHandler={(e) => {
                console.log("Archivo seleccionado:", e.files[0]);
                setForm({ ...form, foto: e.files[0] });
              }}
            />



          </div>

          <Button
            label={editMode ? "Actualizar" : "Guardar"}
            icon={editMode ? "pi pi-refresh" : "pi pi-save"}
            className="p-mt-2"
            onClick={editMode ? editarProducto : guardarProducto}
          />

        </div>
      </Dialog>
    </div>
  );
};

export default AbmProductos;
