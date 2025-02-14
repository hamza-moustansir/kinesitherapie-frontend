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
    // Fetch the list of salles from the backend when the component loads
    const fetchSalles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/salles/available"
        );
        setSalles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching salles:", error);
        setErrorMessage("Error loading salles.");
      }
    };

    fetchSalles();
  }, []);

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
      <SectionHeading
        title="Select your plan"
        desc="You have the option of monthly or yearly billing."
      />
      <div className="grid md:grid-cols-3 md:grid-rows-1 gap-4">
        {planOptions.map((planOption) => (
          <PlanOption
            onPlanSelect={onPlanSelect}
            key={planOption.id}
            id={planOption.id}
            logo={planOption.logo}
            title={planOption.title}
            price={planOption.price}
            selected={planOption.selected}
            planDuration={planDuration}
          />
        ))}
      </div>
      <div
        className={`${errorDisplay} font-medium text-[#ed3548] mt-5 text-center`}
      >
        Please select a plan!
      </div>
      <div className="font-medium mt-8 bg-[#fafbff] text-[#02295a] p-2 rounded-xl">
        <div className="flex justify-center items-center space-x-5 text-[14px]">
          <div>Monthly</div>
          <div className="scale-75">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={onToggleDuration}
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={check}
              />
              <div className="border-2 border-black w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800"></div>
            </label>
          </div>
          <div>Yearly</div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
