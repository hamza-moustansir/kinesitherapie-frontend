import React, { useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";

const Summary = ({
  selectedSalle,
  selectedDate,
  selectedPatient,
  currentStep,
  selectedPlan,
  selectedAddons,
  onChangeClick,
  planDuration,
  planDurationName,
}) => {
  const [planPrice, setPlanPrice] = useState(() => selectedPlan.price);
  const [addonsPrice, setAddonsPrice] = useState(() => {
    if (selectedAddons.length == 0) {
      return 0;
    } else {
      let totalAddonsPrice = 0;
      selectedAddons.map((addon) => {
        totalAddonsPrice += addon.tarif;
      });
      return totalAddonsPrice;
    }
  });
  const [grandTotal, setGrandTotal] = useState(() => planPrice + addonsPrice);

  useEffect(() => {
    // console.log(planPrice);
    // console.log(addonsPrice);
    // console.log(grandTotal);
    // console.log(selectedPlan);
    // console.log(selectedAddons);
  }, [selectedPlan, selectedAddons]);

  return (
    <div>
      <SectionHeading
        title="Paiement"
        desc="Vérifiez que tout est en ordre avant de confirmer."
      />
      <div>
        <div className="bg-[#f0f6ff] rounded-xl p-5 mb-5">
          <div className="font-medium text-[#02295a] ">
            <div className=" flex justify-between items-center mb-3">
              <div>Nom du patient:</div>
              <div className="font-medium flex justify-between">
                <p className="pr-2">{selectedPatient.nom}</p>
                <p>{selectedPatient.prenom}</p>
              </div>
            </div>
            <div className=" flex justify-between items-center mb-3">
              <div>La Date de rendez-vous:</div>
              <div className="font-medium">
                {selectedDate
                  ? `${selectedDate.toLocaleDateString(
                      "fr-FR"
                    )} à ${selectedDate.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Pas de date sélectionnée"}
              </div>
            </div>

            <div className=" flex justify-between items-center mb-3">
              <div>La Salle:</div>
              <div className="font-medium flex justify-between flex-col">
                <p>{selectedSalle.name}</p>
                <p>{selectedSalle.location}</p>
              </div>
            </div>
          </div>
          <div className="space-y-3 mb-10 text-[14px] border-t-2 pt-4 text-[#9699ab]">
            {selectedAddons.map((addon) => (
              <div key={addon.id} className="flex justify-between items-center">
                <div>{addon.nom}</div>
                <div>+${addon.tarif}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center px-5">
          <div className="text-[#9699ab] text-[14px]">Total à payer </div>
          <div className="text-[#473dff] font-bold">{grandTotal}DH</div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
