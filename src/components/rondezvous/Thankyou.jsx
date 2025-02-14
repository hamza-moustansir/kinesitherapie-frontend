import React from "react";
import thankyouIcon from "../../assets/images/icon-thank-you.svg";

const Thankyou = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-5 text-center mt-28">
      <div>
        <img src={thankyouIcon} alt="Thank you" />
      </div>
      <div className="font-bold text-[#02295a] text-3xl">Merci!</div>
      <p className="text-[#9699ab] text-[14px] w-96">
        Merci de confirmer votre abonnement! Nous espérons que vous apprécierez
        notre plateforme. Si jamais vous avez besoin d’aide. N’hésitez pas à
        nous écrire à yassin@gmail.com
      </p>
    </div>
  );
};

export default Thankyou;
