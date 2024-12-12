import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import AbmProductos from "./AbmProductos";
import AbmProveedores from "./AbmProveedores";
import AbmClientes from "./AbmClientes";
import AbmPedidos from "./AbmPedidos";
import SalesReport from "./ReporteVentas";
import CatalogoProdu from "./CatalogoProdu";
import SupplierProductReport from "./ReporteCompras";
import { Auth } from "./components/Auth";
import { Protected } from "./components/Protected";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("firebaseToken");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const items = [
    { label: "Productos", icon: "pi pi-box", url: "/AbmProductos" },
    { label: "Proveedores", icon: "pi pi-users", url: "/AbmProveedores" },
    { label: "Clientes", icon: "pi pi-user", url: "/AbmClientes" },
    { label: "Pedidos", icon: "pi pi-shopping-cart", url: "/AbmPedidos" },
    { label: "Catálogo", icon: "pi pi-list", url: "/CatalogoProdu" },
    { label: "Ventas", icon: "pi pi-chart-line", url: "/SalesReport" },
    { label: "Compras", icon: "pi pi-dollar", url: "/ReporteCompras" },
  ];

  const endContent = (
    <button className="p-button p-button-danger" onClick={cerrarSesion}>
      <i className="pi pi-sign-out" /> Cerrar sesión
    </button>
  );

  return (
    <>
      <div className="card">
        <Menubar model={items} end={endContent} />
      </div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <Protected />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AbmProductos"
          element={
            <ProtectedRoute>
              <AbmProductos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AbmProveedores"
          element={
            <ProtectedRoute>
              <AbmProveedores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AbmClientes"
          element={
            <ProtectedRoute>
              <AbmClientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AbmPedidos"
          element={
            <ProtectedRoute>
              <AbmPedidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CatalogoProdu"
          element={
            <ProtectedRoute>
              <CatalogoProdu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SalesReport"
          element={
            <ProtectedRoute>
              <SalesReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ReporteCompras"
          element={
            <ProtectedRoute>
              <SupplierProductReport />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("firebaseToken");
  return token ? children : <Auth />;
};

export default App;
