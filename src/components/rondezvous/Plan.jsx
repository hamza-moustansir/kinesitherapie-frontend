import React, { useState, useEffect } from "react";
import PlanOption from "./PlanOption";
import SectionHeading from "./SectionHeading";
import axios from "axios";

const Plan = ({
  currentPatient,
  currentStep,
  onPlanSelect,
  onToggleDuration,
  planOptions,
  isPlanEmpty,
  planDuration,
}) => {
  const [errorDisplay, setErrorDisplay] = useState("invisible");
  const [check, setCheck] = useState(false);
  const [dateHeure, setDateHeure] = useState("");
  const [salles, setSalles] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isPlanEmpty) {
      setErrorDisplay("block");
    } else {
      setErrorDisplay("invisible");
    }

    if (planDuration == "mo") {
      setCheck(false);
    } else {
      setCheck(true);
    }
  }, [isPlanEmpty, planDuration]);

  return (
    <div>
      <SectionHeading title="Sélectionnez votre thérapie" />
      <div className="grid md:grid-cols-3 md:grid-rows-1 gap-4">
        {planOptions.map((planOption) => (
          <PlanOption
            onPlanSelect={onPlanSelect}
            key={planOption.id}
            id={planOption.id}
            nom={planOption.nom}
            tarif={planOption.tarif}
            selected={planOption.selected}
          />
        ))}
      </div>
      <div
        className={`${errorDisplay} font-medium text-[#ed3548] mt-5 text-center`}
      >
        Veuillez sélectionner une thérapie!
      </div>
    </div>
  );
};

export default Plan;
