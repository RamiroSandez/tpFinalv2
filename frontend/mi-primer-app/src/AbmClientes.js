import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const AbmClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ id: "", cuit: "", nombre: "" });
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  useEffect(() => {
    obtenerClientes();
    cargarClientesDesdeLocalStorage();
  }, []);

  const cargarClientesDesdeLocalStorage = () => {
    const clientesGuardados = localStorage.getItem("clientes");
    if (clientesGuardados) {
      setClientes(JSON.parse(clientesGuardados));
    }
  };

  const obtenerClientes = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      const response = await axios.get("http://localhost:3000/api/clientes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClientes(response.data);
    } catch (error) {
      console.error("Error al obtener los clientes", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarCliente = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      const nuevoCliente = { cuit: form.cuit, nombre: form.nombre };
      const response = await axios.post(
        "http://localhost:3000/api/clientes",
        nuevoCliente,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClientes([...clientes, response.data]);
      setForm({ id: "", cuit: "", nombre: "" });
      setModalInsertar(false);
    } catch (error) {
      console.error("Error al guardar el cliente", error);
    }
  };

  const editarCliente = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      await axios.put(
        `http://localhost:3000/api/clientes/${form.id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClientes(
        clientes.map((cliente) =>
          cliente.id === form.id ? form : cliente
        )
      );
      setModalEditar(false);
    } catch (error) {
      console.error("Error al editar el cliente", error);
    }
  };

  const eliminarCliente = async (cliente) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de eliminar el cliente con ID ${cliente.id}?`
    );
    if (confirmacion) {
      try {
        const token = localStorage.getItem("firebaseToken");
        await axios.delete(
          `http://localhost:3000/api/clientes/${cliente.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setClientes(clientes.filter((p) => p.id !== cliente.id));
      } catch (error) {
        console.error("Error al eliminar el cliente", error);
      }
    }
  };

  return (
    <div className="p-container">
      <Button
        label="Guardar Nuevo Cliente"
        icon="pi pi-plus"
        onClick={() => setModalInsertar(true)}
      />

      <DataTable value={clientes} responsiveLayout="scroll">
        <Column field="id" header="Id" />
        <Column field="cuit" header="Cuit" />
        <Column field="nombre" header="Nombre" />
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
                onClick={() => eliminarCliente(rowData)}
              />
            </>
          )}
        />
      </DataTable>

      <Dialog
        header="Ingresar Nuevo Cliente"
        visible={modalInsertar}
        onHide={() => setModalInsertar(false)}
      >
        <div className="p-field">
          <label>Cuit</label>
          <InputText
            name="cuit"
            value={form.cuit}
            onChange={handleChange}
          />
        </div>
        <div className="p-field">
          <label>Nombre</label>
          <InputText
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <Button label="Guardar" icon="pi pi-save" onClick={guardarCliente} />
      </Dialog>

      <Dialog
        header="Editar Cliente"
        visible={modalEditar}
        onHide={() => setModalEditar(false)}
      >
        <div className="p-field">
          <label>Cuit</label>
          <InputText
            name="cuit"
            value={form.cuit}
            onChange={handleChange}
          />
        </div>
        <div className="p-field">
          <label>Nombre</label>
          <InputText
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <Button label="Editar" icon="pi pi-check" onClick={editarCliente} />
      </Dialog>
    </div>
  );
};

export default AbmClientes;