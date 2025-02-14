import React, { useState } from "react";

const SelectSalle = ({ salles, onSalleSelect }) => {
  // Créer un état pour la salle sélectionnée
  const [selectedSalle, setSelectedSalle] = useState("");

  // Handler pour mettre à jour l'état de la salle sélectionnée
  const handleSalleChange = (e) => {
    const salleId = e.target.value;
    setSelectedSalle(salleId);
    const selectedSalle = salles.find((salle) => salle.id === +salleId);
    onSalleSelect(selectedSalle);
    console.log(selectedSalle);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="salle"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Sélectionner la Salle
      </label>
      <select
        id="salle"
        value={selectedSalle} // Lier la valeur de select à l'état local
        onChange={handleSalleChange} // Utiliser le gestionnaire de changement
        className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          Sélectionner une salle
        </option>
        {salles.map((salle) => (
          <option key={salle.id} value={salle.id}>
            {salle.nom} - {salle.location} - {salle.nombre_lits} lits
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectSalle;
