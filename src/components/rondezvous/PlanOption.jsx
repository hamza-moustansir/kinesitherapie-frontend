import React, { useEffect, useState } from "react";

const PlanOption = ({ id, logo, nom, tarif, onPlanSelect, selected }) => {
  const [bg, changeBg] = useState("");
  const [displayTwoMonths, setDisplayTwoMonths] = useState("invisible");

  useEffect(() => {
    if (selected) {
      changeBg("bg-[#f0f6ff]");
    } else {
      changeBg("");
    }
  }, [selected]);

  return (
    <div
      onClick={() => onPlanSelect(nom, tarif, id)}
      className={`${bg} border border-[#d6d9e6] rounded-xl flex flex-row md:flex-col justify-start md:justify-between items-left pt-5 px-5 pr-14 cursor-pointer hover:border-[#473dff] focus:bg-violet-700`}
    >
      <div>
        <div className="text-[#02295a] font-medium">{nom}</div>
        <div className="text-[14px] text-[#9699ab] mb-3">${tarif}</div>
      </div>
    </div>
  );
};

export default PlanOption;
