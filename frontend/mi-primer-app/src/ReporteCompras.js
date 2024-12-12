import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import "chart.js/auto";

const PedidosReport = () => {
  const [pedidosData, setPedidosData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("firebaseToken");
        if (!token) {
          console.error("Token no encontrado.");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/pedidos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Pedidos obtenidos:", response.data);

        const formattedData = response.data.map((pedido) => ({
          date: new Date(pedido.fechaCarga),
          id: pedido.id,
          listaProductos: pedido.listaProductos,
          cliente: pedido.cliente,
          saldoTotal: pedido.saldoTotal,
        }));

        setPedidosData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };

    fetchPedidos();
  }, []);

  const applyFilters = useCallback(() => {
    let data = pedidosData;

    if (filters.startDate) {
      data = data.filter((pedido) => pedido.date >= filters.startDate);
    }
    if (filters.endDate) {
      data = data.filter((pedido) => pedido.date <= filters.endDate);
    }

    setFilteredData(data);
  }, [filters, pedidosData]);

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const chartData = {
    labels: filteredData.map((pedido) =>
      pedido.date ? pedido.date.toLocaleDateString() : "Sin fecha"
    ),
    datasets: [
      {
        label: "Saldo Total",
        data: filteredData.map((pedido) => pedido.saldoTotal),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-container">
      <h1 className="p-text-bold">Reporte de Pedidos</h1>

      {/* Filtros */}
      <div className="p-grid p-fluid">
        <div className="p-col-6">
          <label>Desde:</label>
          <Calendar
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.value)}
            dateFormat="dd/mm/yy"
            showIcon
          />
        </div>
        <div className="p-col-6">
          <label>Hasta:</label>
          <Calendar
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.value)}
            dateFormat="dd/mm/yy"
            showIcon
          />
        </div>
      </div>

      {/* Gráfico */}
      <div
        className="chart-container"
        style={{ maxWidth: "600px", margin: "20px auto" }}
      >
        <Line data={chartData} width={300} height={200} />
      </div>

      {/* Tabla de Pedidos */}
      <DataTable value={filteredData} responsiveLayout="scroll" className="p-mt-4">
        <Column
          field="date"
          header="Fecha"
          body={(rowData) =>
            rowData.date ? rowData.date.toLocaleDateString() : "Sin fecha"
          }
        />
        <Column field="id" header="ID" />
        <Column field="listaProductos" header="Lista de Productos" />
        <Column field="cliente" header="Cliente" />
        <Column
          field="saldoTotal"
          header="Saldo Total"
          body={(rowData) =>
            rowData.saldoTotal ? `$${rowData.saldoTotal.toFixed(2)}` : "$0.00"
          }
        />
      </DataTable>
    </div>
  );
};

export default PedidosReport;
