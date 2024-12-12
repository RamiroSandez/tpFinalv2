import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import "./drop.css";

function DropMedida() {
  const [selectedMedida, setSelectedMedida] = useState(null);
  const medida = [
    { name: "Unidad" },
    { name: "Cm3" },
    { name: "Ml" },
    { name: "L" },
    { name: "Kg." },
  ];

  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedMedida}
        onChange={(e) => setSelectedMedida(e.value)}
        options={medida}
        optionLabel="name"
        placeholder="Seleccionar Medida"
        panelClassName="custom-dropdown-panel"
      />
    </div>
  );
}

export default DropMedida;
