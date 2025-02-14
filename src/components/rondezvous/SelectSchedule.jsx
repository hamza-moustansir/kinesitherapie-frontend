import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";

export default function SelectSchedule({
  onDateSelect,
  isDateEmpty,
  setIsDateEmpty,
}) {
  const today = new Date().toISOString().split("T")[0]; // Date du jour en format YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("10:00");

  const hours = Array.from({ length: 7 }, (_, i) => 10 + i);

  const [startDate, setStartDate] = useState(new Date());

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 = Dimanche, 6 = Samedi
  };

  const handleSubmit = () => {
    if (startDate && selectedTime) {
      const fullDateTime = new Date(startDate);
      const [hour, minute] = selectedTime.split(":");
      fullDateTime.setHours(hour);
      fullDateTime.setMinutes(minute);
      console.log("Date et heure sélectionnées:", fullDateTime);
      onDateSelect(fullDateTime);
      setIsDateEmpty(false);
    } else {
      console.log("Veuillez sélectionner une date et une heure.");
    }
  };

  return (
    <div className="mx-auto">
      <div className="pt-4">
        <h1 className="text-center font-semibold text-xl">
          Select a rendz vous
        </h1>
      </div>

      <div class="pt-5 border-t border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5 rtl:space-x-reverse">
        <div class="flex items-start space-x-4 rtl:space-x-reverse mb-5">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()} // Empêche la sélection d'une date passée
            filterDate={isWeekday} // Désactive les samedis et dimanches
            inline
          />
        </div>
        <div class="sm:ms-7 sm:ps-5 sm:border-s border-gray-200 dark:border-gray-800 w-full sm:max-w-[15rem] mt-5 sm:mt-0">
          <button
            onClick={handleSubmit}
            data-collapse-toggle="timetable"
            class="inline-flex items-center w-full py-2 px-5 me-2 justify-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg
              class="w-4 h-4 text-gray-800 dark:text-white me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                clip-rule="evenodd"
              />
            </svg>
            Choisir l'heure
          </button>
          <label class="sr-only">Choisir l'heure</label>

          <ul className="grid grid-cols-2 gap-2 mt-5">
            {hours.map((hour) => (
              <li key={hour}>
                <input
                  type="radio"
                  id={`${hour}:00`}
                  value={`${hour}:00`}
                  className="hidden peer"
                  name="timetable"
                  checked={selectedTime === `${hour}:00`}
                  onChange={() => setSelectedTime(`${hour}:00`)}
                />
                <label
                  htmlFor={`${hour}:00`}
                  className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white hover:text-white hover:bg-blue-500"
                >
                  {hour}:00
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
