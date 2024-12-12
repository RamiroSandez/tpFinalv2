import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { format } from "date-fns";

import { Dropdown } from "primereact/dropdown"; 



const AbmPedidos = () => {
  // State definitions
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: "",
    listaProductos: "",
    cliente: "",
    fechaCarga: "",
    fechaEntrega: "",
    saldoTotal: "",
  });
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    obtenerPedidos();
    obtenerClientes();
    obtenerProductos();
  }, []);








const formatDate = (date) => {
  if (!date) return "N/A";
  return format(new Date(date), "dd/MM/yyyy");
};

  const obtenerClientes = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      if (!token) {
        console.error("No se encontró el token en localStorage.");
        return;
      }
  
      const response = await axios.get("http://localhost:3000/api/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClientes(response.data);
      console.log("Clientes obtenidos:", response.data);
    } catch (error) {
      console.error("Error al obtener los clientes:", error.response || error);
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      }
    }
  };



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
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };


  
  const obtenerPedidos = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      if (!token) {
        console.error("No se encontró el token en localStorage.");
        return;
      }
  
      const response = await axios.get("http://localhost:3000/api/pedidos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPedidos(response.data);
      console.log("Pedidos obtenidos:", response.data);
    } catch (error) {
      console.error("Error al obtener los pedidos:", error.response || error);
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      }
    }
  };
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const guardarPedido = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      if (!token) {
        console.error("No se encontró el token en localStorage.");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:3000/api/pedidos",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setPedidos([...pedidos, response.data]);
      setForm({
        id: "",
        listaProductos: "",
        cliente: "",
        fechaCarga: "",
        fechaEntrega: "",
        saldoTotal: "",
      });
      setModalInsertar(false);
      console.log("Pedido guardado con éxito:", response.data);
    } catch (error) {
      console.error("Error al guardar el pedido:", error.response || error);
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      }
    }
  };
  
  const editarPedido = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      if (!token) {
        console.error("No se encontró el token en localStorage.");
        return;
      }
  
      await axios.put(
        `http://localhost:3000/api/pedidos/${form.id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setPedidos(
        pedidos.map((pedido) =>
          pedido.id === form.id ? { ...pedido, ...form } : pedido
        )
      );
      setModalEditar(false);
      console.log("Pedido editado con éxito:", form);
    } catch (error) {
      console.error("Error al editar el pedido:", error.response || error);
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      }
    }
  };
  
  const eliminarPedido = async (pedido) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de eliminar el pedido con ID ${pedido.id}?`
    );
    if (confirmacion) {
      try {
        const token = localStorage.getItem("firebaseToken");
        if (!token) {
          console.error("No se encontró el token en localStorage.");
          return;
        }
  
        await axios.delete(
          `http://localhost:3000/api/pedidos/${pedido.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        setPedidos(pedidos.filter((p) => p.id !== pedido.id));
        console.log(`Pedido con ID ${pedido.id} eliminado con éxito.`);
      } catch (error) {
        console.error("Error al eliminar el pedido:", error.response || error);
        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", error.response.data);
        }
      }
    }
  };
  

  return (
    <div className="p-container">
      <Button
        label="Guardar Nuevo Pedido"
        icon="pi pi-plus"
        onClick={() => setModalInsertar(true)}
      />

      <DataTable value={pedidos} responsiveLayout="scroll">
        <Column field="id" header="Id" />
        <Column
          field="listaProductos"
          header="Lista de Productos"
          body={(rowData) => rowData.listaProductos || "Sin productos"}
        />
        <Column
          field="cliente"
          header="Cliente"
          body={(rowData) => rowData.cliente || "N/A"}
        />
        <Column
          field="fechaCarga"
          header="Fecha Carga"
          body={(rowData) => formatDate(rowData.fechaCarga)}
        />
        <Column
          field="fechaEntrega"
          header="Fecha Entrega"
          body={(rowData) => formatDate(rowData.fechaEntrega)}
        />
        <Column field="saldoTotal" header="Saldo Total" />
        <Column
          header="Acciones"
          body={(rowData) => (
            <>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info"
                onClick={() => {
                  setForm(rowData);
                  setModalEditar(true);
                }}
              />
              <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => eliminarPedido(rowData)}
              />
            </>
          )}
        />
      </DataTable>

      <Dialog
        header={modalInsertar ? "Ingresar Nuevo Pedido" : "Editar Pedido"}
        visible={modalInsertar || modalEditar}
        onHide={() => {
          setModalInsertar(false);
          setModalEditar(false);
          setForm({
            id: "",
            listaProductos: "",
            cliente: "",
            fechaCarga: "",
            fechaEntrega: "",
            saldoTotal: "",
          });
        }}
        style={{ width: "500px" }}
        className="p-fluid"
      >
        <div className="p-field">
          <label htmlFor="listaProductos">Lista de Productos</label>
          <Dropdown
            id="listaProductos"
            name="listaProductos"
            value={form.listaProductos}
            onChange={(e) => setForm({ ...form, listaProductos: e.value })}
            options={productos.map((producto) => ({
              label: producto.nombre,
              value: producto.nombre,
            }))}
            placeholder="Seleccione un producto"
            className="p-inputtext"
          />
        </div>
        <div className="p-field">
          <label htmlFor="cliente">Cliente</label>
          <select
            id="cliente"
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            className="p-inputtext p-dropdown"
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.nombre}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="p-field">
          <label htmlFor="fechaCarga">Fecha de Carga</label>
          <Calendar
            id="fechaCarga"
            name="fechaCarga"
            value={form.fechaCarga}
            onChange={(e) => setForm({ ...form, fechaCarga: e.value })}
            dateFormat="yy-mm-dd"
            placeholder="Seleccione una fecha"
            showIcon
          />
        </div>
        <div className="p-field">
          <label htmlFor="fechaEntrega">Fecha de Entrega</label>
          <Calendar
            id="fechaEntrega"
            name="fechaEntrega"
            value={form.fechaEntrega}
            onChange={(e) => setForm({ ...form, fechaEntrega: e.value })}
            dateFormat="yy-mm-dd"
            placeholder="Seleccione una fecha"
            showIcon
          />
        </div>
        <div className="p-field">
          <label htmlFor="saldoTotal">Saldo Total</label>
          <InputText
            id="saldoTotal"
            name="saldoTotal"
            value={form.saldoTotal}
            onChange={handleChange}
            placeholder="Ingrese el saldo total"
          />
        </div>
        <div className="p-d-flex p-jc-end p-mt-3">
          <Button
            label="Cancelar"
            icon="pi pi-times"
            className="p-button-text p-mr-2"
            onClick={() => {
              setModalInsertar(false);
              setModalEditar(false);
              setForm({
                id: "",
                listaProductos: "",
                cliente: "",
                fechaCarga: "",
                fechaEntrega: "",
                saldoTotal: "",
              });
            }}
          />
          <Button
            label={modalInsertar ? "Guardar" : "Actualizar"}
            icon="pi pi-check"
            className="p-button-primary"
            onClick={modalInsertar ? guardarPedido : editarPedido}
          />
        </div>
      </Dialog>
    </div>
  );
};



export default AbmPedidos;