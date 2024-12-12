import React, { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

const SupplierProductReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    supplier: "",
    product: "",
  });

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const token = localStorage.getItem("firebaseToken");
        if (!token) {
          console.error("No se encontró el token en localStorage.");
          return;
        }

        // Obtener datos de productos
        const response = await axios.get("http://localhost:3000/api/productos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formattedData = response.data.map((item) => ({
          date: item.createdAt.slice(0, 10),
          supplier: item.proveedor,
          product: item.nombre,
          amount: item.precioVenta,
        }));
        setSalesData(formattedData);
        setFilteredData(formattedData);

        // Extraer productos y fechas únicas
        const uniqueProducts = [...new Set(response.data.map((item) => item.nombre))];
        const uniqueDates = [...new Set(response.data.map((item) => item.createdAt.slice(0, 10)))];
        setProducts(uniqueProducts);
        setDates(uniqueDates);

        // Obtener proveedores
        const suppliersResponse = await axios.get("http://localhost:3000/api/proveedores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuppliers(suppliersResponse.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchSalesData();
  }, []);

  const applyFilters = useCallback(() => {
    let data = salesData;

    if (filters.date) {
      data = data.filter((sale) => sale.date === filters.date);
    }

    if (filters.supplier) {
      data = data.filter((sale) => sale.supplier === filters.supplier);
    }

    if (filters.product) {
      data = data.filter((sale) => sale.product === filters.product);
    }

    setFilteredData(data);
  }, [filters, salesData]);

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const chartData = {
    labels: filteredData.map((sale) => sale.date),
    datasets: [
      {
        label: "Ventas",
        data: filteredData.map((sale) => sale.amount),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-container">
      <h1 className="p-text-bold">Reporte de Ventas</h1>
      <div className="p-field">
        <label>Fecha:</label>
        <select
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-inputtext"
        >
          <option value="">Todas</option>
          {dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <div className="p-field">
        <label>Proveedor:</label>
        <select
          name="supplier"
          value={filters.supplier}
          onChange={handleFilterChange}
          className="p-inputtext"
        >
          <option value="">Todos</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.nombre}>
              {supplier.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="p-field">
        <label>Producto:</label>
        <select
          name="product"
          value={filters.product}
          onChange={handleFilterChange}
          className="p-inputtext"
        >
          <option value="">Todos</option>
          {products.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
      <div className="chart-container" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Line data={chartData} width={300} height={200} />
      </div>
    </div>
  );
};

export default SupplierProductReport;
