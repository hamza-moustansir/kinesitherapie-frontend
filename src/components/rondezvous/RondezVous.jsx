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
import { getPrestations } from "../../api/prestationApi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RendezVousPDF from "./RendezVousPDF";
import { Link } from "react-router-dom";

const RondezVous = () => {
  //------------------------------STATES------------------------------
  const { sallesData } = GetSallesData();
  const [stepNumber, setStepNumber] = useState(() => 1);
  const [goBackVisible, setGoBackVisible] = useState("invisible");
  const [steps, setSteps] = useState([
    { id: 1, title: "Les infos de patient", active: true },
    { id: 2, title: "Rondez-Vous", active: false },
    { id: 3, title: "Prestations", active: false },
    { id: 4, title: "Sommaire", active: false },
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
  const [isSalleEmpty, setIsSalleEmpty] = useState(false);
  const [isDateEmpty, setIsDateEmpty] = useState(false);
  const [salles, setSalles] = useState([]);
  const [prestations, setPrestations] = useState([]);
  const [status, setStatus] = useState("AVAILABLE");
  const [pdfData, setPdfData] = useState(null);
  const [showDownloadLink, setShowDownloadLink] = useState(false);

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
      nom: "REHABILITATION",
      type: "REHABILITATION",
      tarif: 200,
      selected: false,
    },
    {
      id: 2,
      nom: "SPORTS THERAPY",
      type: "SPORTS_THERAPY",
      tarif: 150,
      selected: false,
    },
    {
      id: 3,
      nom: "ORTHOPEDICS",
      type: "ORTHOPEDICS",
      tarif: 100,
      selected: false,
    },

    {
      id: 4,
      nom: "MANUAL THERAPY",
      type: "MANUAL_THERAPY",
      tarif: 100,
      selected: false,
    },
    {
      id: 5,
      nom: "WELLNESS",
      type: "WELLNESS",
      tarif: 150,
      selected: false,
    },
  ]);

  const [addons, setAddons] = useState([]);

  const [displayThankyou, setDisplayThankyou] = useState(false);

  // ---------------------------- CHECK USER ID ---------------------------
  const [patientExists, setPatientExists] = useState(null); // To store validation result
  const [loading, setLoading] = useState(false);

  const checkPatientExists = async (id) => {
    if (!id) return null; // Return null instead of false

    try {
      const response = await fetch(`http://localhost:8080/api/patients/${id}`);
      const data = await response.json();

      // If the API returns an error message, the patient does not exist
      if (data.error_message) {
        console.log(`Error: ${data.error_message}`);
        return null;
      }

      return data; // Return the full patient object
    } catch (error) {
      console.error("Error checking patient existence:", error);
      return null; // Return null in case of an error
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

    getPrestations().then((data) => {
      const updatedPrestations = data.map((prestation) => ({
        ...prestation,
        selected: false, // Ensure the selected property exists
      }));
      setAddonOptions(updatedPrestations);
    });
    console.log("Prestatins");
    console.log(prestations);

    const now = new Date();
    now.setHours(10, 0, 0, 0); // Set the time to 10:00 AM
    setAppointmentDate(now);
    setIsDateEmpty(false); // Set as not empty since we've already set a date
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
          const patientData = await checkPatientExists(yourInfo.patientID);

          if (!patientData) {
            setPatientExists(false);
            toast.error("Patient introuvable, vérifier ID");
            return;
          }

          setPatientExists(true);
          setPatient(patientData); // Now you correctly store the patient object
          toast.success("User Found");
          console.log("Found User ----------------------------------------");
          console.log(patientData);

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

          setPatient(createResponse.data);
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
      if (!selectedSalle) {
        setIsSalleEmpty(true);
        console.log("setIsSalleEmpty(True)");

        return;
      } else {
        setIsSalleEmpty(false);
      }

      if (!appointmentDate) {
        console.log("appointmentDate = {}");
        setIsDateEmpty(true);
        return;
      } else {
        setIsDateEmpty(false);
      }

      console.log("Salle sélectionnée:", selectedSalle);
      console.log("Date de l'appointement:", appointmentDate);
      //return;
    }

    if (stepNumber == 3) {
      console.log(addonOptions);
    }
    if (stepNumber == 4) {
      const requesteRendzVous = {
        patientId: patient?.id,
        salleId: selectedSalle?.id,
        dateHeure: appointmentDate,
        presetationIds: addonOptions,
      };
      console.log(requesteRendzVous);
      return;

      console.log(addonOptions);
    }

    setStepNumber((prevStep) => prevStep + 1);
  };

  const confirmHandler = () => {
    const requesteRendzVous = {
      patientId: patient?.id,
      salleId: selectedSalle?.id,
      dateHeure: appointmentDate,
      presetationIds: addonOptions.map((option) => option.id),
    };
    console.log(requesteRendzVous);
    setDisplayThankyou(true);

    setPdfData({
      patient: patient,
      salle: selectedSalle,
      dateHeure: appointmentDate,
      prestations: addonOptions.filter((option) => option.selected === true),
    });
    setShowDownloadLink(true);

    setDisplayThankyou(true);
  };

  const selectSalle = (salle) => {
    setSelectedSalle(salle);
    setIsSalleEmpty(false);
  };

  const changeAppointmentDate = (date) => {
    setAppointmentDate(date);
    setIsDateEmpty(false);
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

  const checkBox = (e) => {
    const id = parseInt(e.target.getAttribute("data-id"));
    const nom = e.target.getAttribute("data-title-name");
    const tarif = parseInt(e.target.getAttribute("data-price"));
    if (e.target.checked == true) {
      setAddons((prevAddons) => [
        ...prevAddons,
        { id: id, nom: nom, tarif: tarif },
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

              {showDownloadLink && pdfData && (
                <>
                  <PDFDownloadLink
                    document={<RendezVousPDF data={pdfData} />}
                    fileName="RendezVous.pdf"
                    className="font-medium bg-green-600 select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:bg-green-700 mt-4 ml-3"
                  >
                    {({ loading }) =>
                      loading ? "Génération en cours..." : "Télécharger PDF"
                    }
                  </PDFDownloadLink>
                  <Link
                    to="/patients"
                    className="text-blue-600 hover:underline"
                  >
                    Allez à la gestion des patients
                  </Link>
                </>
              )}
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
                  </div>
                )) ||
                  (stepNumber === 2 && (
                    <div>
                      <SelectSalle
                        salles={salles}
                        onSalleSelect={selectSalle}
                        isSalleEmpty={isSalleEmpty}
                      />
                      <SelectSchedule
                        onDateSelect={changeAppointmentDate}
                        isDateEmpty={isDateEmpty}
                        setIsDateEmpty={setIsDateEmpty}
                      />
                      {isSalleEmpty && (
                        <div className="text-red-500">
                          Salle non sélectionnée !
                        </div>
                      )}
                      {isDateEmpty && (
                        <div className="text-red-500">
                          Date non sélectionnée !
                        </div>
                      )}
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
                      selectedSalle={selectedSalle}
                      selectedDate={appointmentDate}
                      selectedPatient={patient}
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
                  <>
                    <button
                      onClick={confirmHandler}
                      className="font-medium bg-[#473dff] select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90"
                    >
                      Confirmer et Générer PDF
                    </button>
                  </>
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
