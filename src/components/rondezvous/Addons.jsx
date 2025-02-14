import React, { useState, useEffect } from "react";
import AddonComponent from "./AddonComponent";
import SectionHeading from "./SectionHeading";

const Addons = ({ currentStep, onBoxCheck, planDuration, addonOptions }) => {
  const [bg, setBg] = useState("black");

  useEffect(() => {}, []);

  return (
    <div>
      <SectionHeading
        title="Pick add-ons"
        desc="Add-ons help enhance your gaming experience."
      />
      <div className="space-y-5">
        {addonOptions.map((addon) => (
          <AddonComponent
            onBoxCheck={onBoxCheck}
            key={addon.id}
            id={addon.id}
            nom={addon.nom}
            type={addon.type}
            tarif={addon.tarif}
            selected={addon.selected}
          />
        ))}
      </div>
    </div>
  );
};

export default Addons;
