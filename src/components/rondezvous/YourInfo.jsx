import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";
import { Link } from "react-router-dom";

const YourInfo = ({ yourInfo, onChangeYourInfo, isEmpty }) => {
  const [usePatientID, setUsePatientID] = useState(true);

  const formFields = [
    { id: 1, name: "nom", label: "Nom", placeholder: "e.g Yassin " },
    { id: 2, name: "prenom", label: "Prenom", placeholder: "e.g Zaher" },
    {
      id: 3,
      name: "email",
      label: "Adresse E-mail",
      placeholder: "e.g yassin@gmail.com",
    },
    {
      id: 4,
      name: "adresse",
      label: "Adresse",
      placeholder: "e.g Tanger Ville, 5000",
    },
    {
      id: 5,
      name: "telephone",
      label: "Numéro de téléphone",
      placeholder: "e.g +212 634 567 890",
    },
  ];

  return (
    <div>
      <SectionHeading
        title="Information des patients"
        desc="Entrer l’information patient"
      />

      <div className="flex items-center space-x-3 mb-4">
        <span className="text-gray-700">Entrer ID Patient</span>
        <button
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            usePatientID ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => setUsePatientID(!usePatientID)}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
              usePatientID ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>
        <span className="text-gray-700">Entrer toutes les informations</span>
      </div>

      <form>
        <div className="flex flex-col space-y-6 text-[14px]">
          {usePatientID ? (
            <div>
              <FormField
                onChangeYourInfo={onChangeYourInfo}
                name="patientID"
                label="ID du patient"
                placeholder="e.g 123456"
                value={yourInfo["patientID"]}
                isEmpty={isEmpty}
              />
              <p className="text-sm text-gray-500 mt-2">
                Vous ne vous souvenez pas de l'ID du patient ?{" "}
                <Link to="/patients" className="text-blue-600 hover:underline">
                  Allez à la gestion des patients
                </Link>
              </p>
            </div>
          ) : (
            formFields.map((formField) => (
              <FormField
                key={formField.id}
                onChangeYourInfo={onChangeYourInfo}
                name={formField.name}
                label={formField.label}
                placeholder={formField.placeholder}
                value={yourInfo[formField.name]}
                isEmpty={isEmpty}
              />
            ))
          )}
        </div>
      </form>
    </div>
  );
};

export default YourInfo;
