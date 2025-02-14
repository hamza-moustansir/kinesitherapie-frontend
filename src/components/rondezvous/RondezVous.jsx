import React, { useEffect, useState } from "react";
import YourInfo from "./YourInfo";
import Plan from "./Plan";
import BackgroundSidebar from "../../assets/images/bg-sidebar-desktop.svg";
import BackgroundSidebarMobile from "../../assets/images/bg-sidebar-mobile.svg";
import Step from "./Step";
import Addons from "./Addons";
import Summary from "./Summary";
import Thankyou from "./Thankyou";

import arcadeLogo from "../../assets/images/icon-arcade.svg";
import advancedLogo from "../../assets/images/icon-advanced.svg";
import proLogo from "../../assets/images/icon-pro.svg";
import { useSelector } from "react-redux";
import { createPatient } from "../../api/patientApi";
import toast from "react-hot-toast";
import { getSalles } from "../../api/salleApi";
import SelectSalle from "./SalleSelect";
import { createRendezVous } from "../../api/rendzVousApi";
import SelectSchedule from "./SelectSchedule";
import GetSallesData from "../../hooks/GetSallesData";

const RondezVous = () => {
  //------------------------------STATES------------------------------
  const { sallesData } = GetSallesData();
  const [stepNumber, setStepNumber] = useState(() => 1);
  const [goBackVisible, setGoBackVisible] = useState("invisible");
  const [steps, setSteps] = useState([
    { id: 1, title: "YOUR INFO", active: true },
    { id: 2, title: "SELECT PLAN", active: false },
    { id: 3, title: "ADD-ONS", active: false },
    { id: 4, title: "SUMMARY", active: false },
  ]);

  const [yourInfo, setYourInfo] = useState({
    patientID: "",
    nom: "",
    prenom: "",
    email: "",
    adresse: "",
    telephone: "",
  });

  const [usePatientID, setUsePatientID] = useState(true); // Sync with the toggle

  const [isEmpty, setIsEmpty] = useState(false);
  const [patient, setPatient] = useState({});
  const [isPlanEmpty, setIsPlanEmpty] = useState(false);
  const [planDuration, setPlanDuration] = useState("mo");
  const [planDurationName, setPlanDurationName] = useState("Monthly");
  const [selectedSalle, setSelectedSalle] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [salles, setSalles] = useState([]);
  const [status, setStatus] = useState("AVAILABLE");
  const [isSalleEmpty, setIsSalleEmpty] = useState(true);

  const [plan, setPlan] = useState({
    title: "",
    price: 0,
    yearly: false,
  });

  const [planOptions, setPlanOptions] = useState([
    {
      id: 1,
      logo: arcadeLogo,
      title: "Arcade",
      price: 9,
      monthlyPrice: 9,
      yearlyPrice: 90,
      selected: false,
    },
    {
      id: 2,
      logo: advancedLogo,
      title: "Advanced",
      price: 12,
      monthlyPrice: 12,
      yearlyPrice: 120,
      selected: false,
    },
    {
      id: 3,
      logo: proLogo,
      title: "Pro",
      price: 15,
      monthlyPrice: 15,
      yearlyPrice: 150,
      selected: false,
    },
  ]);

  const [addonOptions, setAddonOptions] = useState([
    {
      id: 1,
      title: "Online service",
      desc: "Access to multiplayer games",
      price: 1,
      monthlyPrice: 1,
      yearlyPrice: 10,
      selected: false,
    },
    {
      id: 2,
      title: "Larger storage",
      desc: "Extra 1TB of cloud save",
      price: 2,
      monthlyPrice: 2,
      yearlyPrice: 20,
      selected: false,
    },
    {
      id: 3,
      title: "Customizable profile",
      desc: "Custom theme on your profile",
      price: 2,
      monthlyPrice: 2,
      yearlyPrice: 20,
      selected: false,
    },
  ]);

  const [addons, setAddons] = useState([]);

  const [displayThankyou, setDisplayThankyou] = useState(false);

  // ---------------------------- CHECK USER ID ---------------------------
  const [patientExists, setPatientExists] = useState(null); // To store validation result
  const [loading, setLoading] = useState(false);
  const checkPatientExists = async (id) => {
    if (!id) return false;

    try {
      const response = await fetch(`http://localhost:8080/api/patients/${id}`);
      const exists = await response.json();
      return exists; // Return true or false
    } catch (error) {
      console.error("Erreur lors de la vérification du patient:", error);
      return false;
    }
  };

  //------------------------------SIDE EFFECTS------------------------------
  useEffect(() => {
    setSteps((prevSteps) => {
      const updatedSteps = prevSteps.map((step) => {
        if (step.id === stepNumber) {
          return { ...step, active: true };
        } else {
          return { ...step, active: false };
        }
      });
      return updatedSteps;
    });
    if (stepNumber > 1) {
      setGoBackVisible("visible");
    } else {
      setGoBackVisible("invisible");
    }

    // console.log(steps);
    // console.log(stepNumber);
    // console.log(yourInfo);
    // console.log(plan);
    //console.log(addons);
    // console.log(planOptions);
    // console.log(addonOptions);
    // console.log(plan);
    // console.log(isPlanEmpty);
    // console.log(displayThankyou);
    // console.log(planDuration);
  }, [
    stepNumber,
    yourInfo,
    plan,
    addons,
    addonOptions,
    planOptions,
    isPlanEmpty,
    displayThankyou,
  ]);

  useEffect(() => {
    // Fetch salles when component mounts
    getSalles().then((data) => setSalles(data));
    console.log("SAAAAAAAAALES");
    console.log(salles);
  }, []);

  //------------------------------FUNCTIONS------------------------------
  const nextStep = async () => {
    if (stepNumber === 1) {
      // If using patient ID
      if (yourInfo.patientID.trim().length !== 0) {
        console.log("User ID SET");

        if (yourInfo.patientID.trim().length === 0) {
          setIsEmpty(true);
          return;
        }

        try {
          const patientExists = await checkPatientExists(yourInfo.patientID);

          if (!patientExists) {
            setPatientExists(false);
            setIsEmpty(true); // If patient doesn't exist, display error
            return;
          }

          setPatientExists(true);
          setPatient(patientExists);
          toast.success("User Found");
          console.log("Found User ----------------------------------------");
          console.log(patientExists);

          setIsEmpty(false);
        } catch (error) {
          console.error("Error checking patient:", error);
          toast.error("Patient introuvable, vérifier ID");
          setIsEmpty(true);
          return;
        }
      } else {
        // If using the full form
        if (
          yourInfo.nom.trim().length === 0 ||
          yourInfo.prenom.trim().length === 0 ||
          yourInfo.email.trim().length === 0 ||
          yourInfo.adresse.trim().length === 0 ||
          yourInfo.telephone.trim().length === 0
        ) {
          setIsEmpty(true);
          return;
        }
        try {
          // Create new patient if full form is completed
          const createResponse = await createPatient({
            nom: yourInfo.nom,
            prenom: yourInfo.prenom,
            email: yourInfo.email,
            adresse: yourInfo.adresse,
            telephone: yourInfo.telephone,
          });

          setPatient(createResponse);
          console.log("Created User ----------------------------------------");
          console.log(createResponse);

          toast.success("L’utilisateur est créé avec succès ");
          setIsEmpty(false);
        } catch (createError) {
          console.error("Error creating patient:", createError);
          setIsEmpty(false);
          toast.error("Erreur de création du patient");
          return;
        }
      }
    }

    if (stepNumber == 2) {
      if (plan.title.length == 0) {
        setIsPlanEmpty(true);
        return;
      } else {
        setIsPlanEmpty(false);
      }
    }

    setStepNumber((prevStep) => prevStep + 1);
  };

  const selectSalle = (salle) => {
    setSelectedSalle(salle);
    setIsSalleEmpty(false);
  };

  const changeAppointmentDate = (date) => {
    setAppointmentDate(date);
  };

  const createRdv = async () => {
    if (!selectedSalle || !appointmentDate) {
      alert("Please select both salle and appointment date");
      return;
    }

    const appointmentData = {
      patientId: patient.id, // Assuming patient ID is available
      salleId: selectedSalle.id,
      dateHeure: appointmentDate, // The selected date and time
      status: status,
    };

    try {
      await createRendezVous(appointmentData);
      alert("Rendez-vous successfully created!");
    } catch (error) {
      console.error("Error creating rendez-vous:", error);
    }
  };

  const prevStep = () => {
    setStepNumber((prevStep) => prevStep - 1);
  };

  const changeClick = () => {
    setStepNumber((prevStep) => prevStep - 2);
  };

  const changeYourInfo = (event) => {
    setYourInfo((prevInfo) => {
      return { ...prevInfo, [event.target.name]: event.target.value };
    });
  };

  const selectPlan = (title, price, id) => {
    setPlanOptions((prevPlanOptions) => {
      const updatedPlanOptions = prevPlanOptions.map((planOption) => {
        if (planOption.id == id) {
          return { ...planOption, selected: true };
        } else {
          return { ...planOption, selected: false };
        }
      });
      return updatedPlanOptions;
    });

    setPlan((prevPlan) => {
      return { ...prevPlan, title: title, price: price };
    });
  };
  const toggleDuration = () => {
    if (plan.yearly == false) {
      setPlan((prevPlan) => {
        setPlanDuration("yr");
        setPlanDurationName("Yearly");

        setPlanOptions((prevPlanOptions) => {
          const updatedPlanOptions = prevPlanOptions.map((planOption) => {
            return { ...planOption, price: planOption.yearlyPrice };
          });
          return updatedPlanOptions;
        });

        setAddonOptions((prevAddonOptions) => {
          const updatedAddonOptions = prevAddonOptions.map((addonOption) => {
            return { ...addonOption, price: addonOption.yearlyPrice };
          });
          return updatedAddonOptions;
        });

        return { ...prevPlan, yearly: true };
      });
    } else {
      setPlan((prevPlan) => {
        setPlanDuration("mo");
        setPlanDurationName("Monthly");

        setPlanOptions((prevPlanOptions) => {
          const updatedPlanOptions = prevPlanOptions.map((planOption) => {
            return { ...planOption, price: planOption.monthlyPrice };
          });
          return updatedPlanOptions;
        });

        setAddonOptions((prevAddonOptions) => {
          const updatedAddonOptions = prevAddonOptions.map((addonOption) => {
            return { ...addonOption, price: addonOption.monthlyPrice };
          });
          return updatedAddonOptions;
        });

        return { ...prevPlan, yearly: false };
      });
    }

    // setPlan((prevPlan) => {
    //   return { ...prevPlan, yearly: !plan.yearly };
    // });
  };

  const checkBox = (e) => {
    const id = parseInt(e.target.getAttribute("data-id"));
    const title = e.target.getAttribute("data-title-name");
    const price = parseInt(e.target.getAttribute("data-price"));
    if (e.target.checked == true) {
      setAddons((prevAddons) => [
        ...prevAddons,
        { id: id, title: title, price: price },
      ]);
    } else {
      setAddons((prevAddons) => {
        return prevAddons.filter((addon) => addon.id != id);
      });
    }

    setAddonOptions((prevAddons) => {
      const updatedAddons = prevAddons.map((addon) => {
        if (addon.id == id) {
          if (addon.selected == false) {
            return { ...addon, selected: true };
          } else {
            return { ...addon, selected: false };
          }
        } else {
          return addon;
        }
      });
      return updatedAddons;
    });
  };

  // const selectAddon = (id) => {
  //   setAddonOptions((prevAddons) => {
  //     const updatedAddons = prevAddons.map((addon) => {
  //       if (addon.id == id) {
  //         if (addon.selected == false) {
  //           return { ...addon, selected: true };
  //         } else {
  //           return { ...addon, selected: false };
  //         }
  //       } else {
  //         return addon;
  //       }
  //     });
  //     return updatedAddons;
  //   });
  // };

  /* <Plan
    currentPatient={patient}
    onPlanSelect={selectPlan}
    onToggleDuration={toggleDuration}
    currentStep={stepNumber}
    planOptions={planOptions}
    isPlanEmpty={isPlanEmpty}
    planDuration={planDuration}
  /> */

  return (
    <div className="container">
      <div className="bg-[#d6d9e6] md:bg-white rounded-xl md:p-3 md:flex justify-center">
        <div className="relative">
          <img
            className="hidden md:block"
            src={BackgroundSidebar}
            alt="sidebar"
          />
          <img
            className="block md:hidden w-full"
            src={BackgroundSidebarMobile}
            alt="topbar"
          />

          <div className="flex justify-center mt-8 absolute inset-0 space-x-10 md:space-x-0 md:block md:mt-0 md:pl-6 md:pt-8 md:space-y-7">
            {steps.map((step) => (
              <Step
                key={step.id}
                number={step.id}
                title={step.title}
                active={step.active}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between absolute top-40 w-[450px] md:static mb-40 rounded-2xl mx-8 px-16 pt-10 pb-16 bg-white md:px-0 md:py-5 md:mx-28 md:w-100 md:my-2">
          {(displayThankyou && (
            //<div className="flex flex-col justify-between absolute top-40 w-[450px] md:static mb-40 rounded-2xl mx-8 px-16 pt-10 pb-16 bg-white md:px-0 md:py-5 md:mx-28 md:w-100 md:my-2">
            <>
              <Thankyou />
            </>
            //</div>
          )) || (
            // <div className="flex flex-col justify-between absolute top-40 w-[450px] md:static mb-40 rounded-2xl mx-8 px-16 pt-10 pb-16 bg-white md:px-0 md:py-5 md:mx-28 md:w-100 md:my-2">
            <>
              <div>
                {(stepNumber === 1 && (
                  <div>
                    <YourInfo
                      onChangeYourInfo={changeYourInfo}
                      yourInfo={yourInfo}
                      currentStep={stepNumber}
                      isEmpty={isEmpty}
                    />
                    {loading && (
                      <p className="text-gray-500">Vérification en cours...</p>
                    )}
                    {patientExists === false && (
                      <p className="text-red-500">
                        Patient non trouvé. Veuillez entrer les informations.
                      </p>
                    )}
                  </div>
                )) ||
                  (stepNumber === 2 && (
                    <div>
                      <SelectSalle
                        salles={salles}
                        onSalleSelect={selectSalle}
                        isSalleEmpty={isSalleEmpty}
                      />
                      <SelectSchedule onDateSelect={setAppointmentDate} />
                      <button
                        onClick={createRdv}
                        disabled={isSalleEmpty || !appointmentDate}
                      >
                        Create Rendez-vous
                      </button>
                    </div>
                  )) ||
                  (stepNumber === 3 && (
                    <Addons
                      onBoxCheck={checkBox}
                      currentStep={stepNumber}
                      addonOptions={addonOptions}
                      planDuration={planDuration}
                    />
                  )) ||
                  (stepNumber === 4 && (
                    <Summary
                      selectedPlan={plan}
                      selectedAddons={addons}
                      currentStep={stepNumber}
                      planDuration={planDuration}
                      planDurationName={planDurationName}
                      onChangeClick={changeClick}
                    />
                  ))}
              </div>
              <div className="flex justify-between fixed px-16 bottom-0 left-0 w-full bg-white p-5 md:static md:p-0 md:static items-center w-[700px]]">
                {/* {stepNumber != 1 && (
              <div
                onClick={prevStep}
                className={`font-medium text-[#9699ab] cursor-pointer transition duration-100 hover:text-[#02295a] ${goBackVisible}`}
              >
                Go back
              </div>
            )} */}
                <div
                  onClick={prevStep}
                  className={`font-medium text-[#9699ab] select-none cursor-pointer transition duration-100 hover:text-[#02295a] ${goBackVisible}`}
                >
                  Go back
                </div>

                {stepNumber === 4 ? (
                  <div
                    onClick={() => setDisplayThankyou(true)}
                    className="font-medium bg-[#473dff] select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90"
                  >
                    Confirm
                  </div>
                ) : (
                  <div
                    onClick={nextStep}
                    className="font-medium bg-[#02295a] select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90"
                  >
                    Next Step
                  </div>
                )}
              </div>
            </>
            // </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RondezVous;
