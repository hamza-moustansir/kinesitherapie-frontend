import React from "react";

const SelectSalle = ({ salles, onSalleSelect, isSalleEmpty }) => {
  return (
    <div>
      <label>Select Salle</label>
      <select
        onChange={(e) =>
          onSalleSelect(salles.find((salle) => salle.id === +e.target.value))
        }
        disabled={isSalleEmpty}
      >
        <option value="" disabled>
          Select a salle
        </option>
        {salles.map((salle) => (
          <option key={salle.id} value={salle.id}>
            {salle.nom} - {salle.location} - {salle.nombre_lits} beds
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSalle;
