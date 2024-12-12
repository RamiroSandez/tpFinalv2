import React, { Component } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

class AbmProveedores extends Component {
  state = {
    data: [],
    form: {
      id: "",
      cuit: "",
      nombre: "",
    },
    modalInsertar: false,
    modalEditar: false,
  };

  toast = React.createRef();

  componentDidMount() {
    this.obtenerProveedores();
  }

  obtenerProveedores = async () => {
    try {
      // Obtener el token almacenado en localStorage
      const token = localStorage.getItem("firebaseToken");
      
      if (!token) {
        console.error("Token no encontrado en localStorage");
        return;
      }
  
      // Realizar la solicitud GET con el encabezado Authorization
      const response = await axios.get("http://localhost:3000/api/proveedores", {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token al encabezado
        },
      });
  
      // Actualizar el estado con los datos obtenidos
      this.setState({ data: response.data });
    } catch (error) {
      console.error("Error al obtener los proveedores:", error.response || error);
      if (error.response) {
        console.error("Status:", error.response.status); // Código de estado HTTP
        console.error("Headers:", error.response.headers); // Encabezados de respuesta
        console.error("Data:", error.response.data); // Mensaje de error del backend
      }
    }
  };
  

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
      form: { id: "", cuit: "", nombre: "" },
    });
  };

  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalEditar = (proveedor) => {
    this.setState({ modalEditar: true, form: { ...proveedor } });
  };

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  };

  guardarProveedor = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      if (!token) {
        console.error("No se encontró el token en localStorage.");
        return;
      }
  
      const nuevoProveedor = {
        cuit: this.state.form.cuit,
        nombre: this.state.form.nombre,
      };
  
      const response = await axios.post(
        "http://localhost:3000/api/proveedores",
        nuevoProveedor,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      this.setState((prevState) => ({
        data: [...prevState.data, response.data],
        modalInsertar: false,
      }));
  
      this.toast.current.show({
        severity: "success",
        summary: "Proveedor guardado",
        detail: "El proveedor ha sido registrado correctamente",
      });
    } catch (error) {
      console.error("Error al guardar el proveedor", error.response || error);
      this.toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo guardar el proveedor",
      });
    }
  };
  
  editarProveedor = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      if (!token) {
        console.error("No se encontró el token en localStorage.");
        return;
      }
  
      await axios.put(
        `http://localhost:3000/api/proveedores/${this.state.form.id}`,
        this.state.form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const updatedProveedores = this.state.data.map((proveedor) =>
        proveedor.id === this.state.form.id ? this.state.form : proveedor
      );
  
      this.setState({ data: updatedProveedores, modalEditar: false });
  
      this.toast.current.show({
        severity: "info",
        summary: "Proveedor actualizado",
        detail: "El proveedor ha sido editado correctamente",
      });
    } catch (error) {
      console.error("Error al editar el proveedor", error.response || error);
      this.toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo editar el proveedor",
      });
    }
  };
  
  eliminarProveedor = async (proveedor) => {
    if (window.confirm(`¿Estás seguro de eliminar el proveedor ${proveedor.id}?`)) {
      try {
        const token = localStorage.getItem("firebaseToken");
        if (!token) {
          console.error("No se encontró el token en localStorage.");
          return;
        }
  
        await axios.delete(
          `http://localhost:3000/api/proveedores/${proveedor.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        this.setState((prevState) => ({
          data: prevState.data.filter((p) => p.id !== proveedor.id),
        }));
  
        this.toast.current.show({
          severity: "warn",
          summary: "Proveedor eliminado",
          detail: "El proveedor ha sido eliminado",
        });
      } catch (error) {
        console.error("Error al eliminar el proveedor", error.response || error);
        this.toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudo eliminar el proveedor",
        });
      }
    }
  };
  

  render() {
    const footerModalInsertar = (
      <div>
        <Button
          label="Guardar"
          icon="pi pi-check"
          onClick={this.guardarProveedor}
          className="p-button-success"
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.ocultarModalInsertar}
          className="p-button-secondary"
        />
      </div>
    );

    const footerModalEditar = (
      <div>
        <Button
          label="Actualizar"
          icon="pi pi-check"
          onClick={this.editarProveedor}
          className="p-button-info"
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={this.ocultarModalEditar}
          className="p-button-secondary"
        />
      </div>
    );

    return (
      <div className="p-4">
        <Toast ref={this.toast} />
        <div className="p-d-flex p-jc-between p-ai-center mb-3">
          <h2>Gestión de Proveedores</h2>
          <Button
            label="Nuevo Proveedor"
            icon="pi pi-plus"
            onClick={this.mostrarModalInsertar}
            className="p-button-success"
          />
        </div>

        <DataTable
          value={this.state.data}
          responsiveLayout="scroll"
          paginator
          rows={5}
          emptyMessage="No hay proveedores registrados"
        >
          <Column field="id" header="ID" sortable></Column>
          <Column field="cuit" header="CUIT" sortable></Column>
          <Column field="nombre" header="Nombre" sortable></Column>
          <Column
            header="Acciones"
            body={(rowData) => (
              <div className="p-d-flex p-ai-center">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-info mr-2"
                  onClick={() => this.mostrarModalEditar(rowData)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-danger"
                  onClick={() => this.eliminarProveedor(rowData)}
                />
              </div>
            )}
          ></Column>
        </DataTable>

        {/* Modal para insertar proveedor */}
        <Dialog
          visible={this.state.modalInsertar}
          style={{ width: "30vw" }}
          header="Registrar Nuevo Proveedor"
          modal
          footer={footerModalInsertar}
          onHide={this.ocultarModalInsertar}
        >
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="cuit">CUIT</label>
              <InputText
                id="cuit"
                name="cuit"
                onChange={this.handleChange}
                value={this.state.form.cuit}
              />
            </div>
            <div className="p-field">
              <label htmlFor="nombre">Nombre</label>
              <InputText
                id="nombre"
                name="nombre"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </div>
          </div>
        </Dialog>

        {/* Modal para editar proveedor */}
        <Dialog
          visible={this.state.modalEditar}
          style={{ width: "30vw" }}
          header="Editar Proveedor"
          modal
          footer={footerModalEditar}
          onHide={this.ocultarModalEditar}
        >
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="cuit">CUIT</label>
              <InputText
                id="cuit"
                name="cuit"
                onChange={this.handleChange}
                value={this.state.form.cuit}
              />
            </div>
            <div className="p-field">
              <label htmlFor="nombre">Nombre</label>
              <InputText
                id="nombre"
                name="nombre"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default AbmProveedores;












