import React, { useEffect, useState } from "react";

const AddonComponent = ({ id, nom, tarif, selected, onBoxCheck }) => {
  const [addonBg, setAddonBg] = useState("");
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (selected) {
      setAddonBg("bg-[#f0f6ff]");
      setCheck(true);
    } else {
      setAddonBg("");
      setCheck(false);
    }
    // console.log("check", check);
    // console.log("selected", selected);
  }, [selected, check]);

  // const toggleCheckbox = () => {
  //   if (selected) {
  //     setAddonBg("bg-[#d6d9e6]");
  //     setCheck(true);
  //   } else {
  //     setAddonBg("");
  //     setCheck(false);
  //   }
  // };

  return (
    <div
      // onClick={() => {
      //   onAddonSelect(id);
      //   toggleCheckbox();
      // }}
      className={`${addonBg} flex justify-between items-center border border-[#d6d9e6] space-x-5 md:space-x-40 py-3 pr-8 pl-6 rounded-xl hover:border-[#02295a]`}
    >
      <div className="flex items-center justify-between w-full space-x-6">
        <div className="flex items-center space-x-5 w-full">
          <input
            onChange={onBoxCheck}
            data-id={id}
            data-title-name={nom}
            data-price={tarif}
            className="w-4 h-4"
            type="checkbox"
            checked={check}
          />
          <div className="">
            <div className="font-bold text-[#02295a]">{nom}</div>
          </div>
        </div>
        <div className="text-[#adbeff] text-[14px] font-bold">+{tarif}DH</div>
      </div>
    </div>
  );
};

export default AddonComponent;
