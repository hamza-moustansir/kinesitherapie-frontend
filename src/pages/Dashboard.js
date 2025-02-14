import React, { useEffect, useState } from 'react';
import { FaUserInjured, FaCalendarAlt,FaUser, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [salleCount, setSalleCount] = useState(0);

  useEffect(() => {
    // Récupérer les données du nombre d'utilisateurs, de patients et de salles
    const fetchCounts = async () => {
      try {
          // Include credentials in each request
          const userResponse = await axios.get('http://localhost:8080/api/utilisateurs/count', {
              withCredentials: true // Include credentials (cookies, authorization headers, etc.)
          });
          const patientResponse = await axios.get('http://localhost:8080/api/patients/count', {
              withCredentials: true
          });
          const salleResponse = await axios.get('http://localhost:8080/api/salles/count', {
              withCredentials: true
          });
  
          // Assuming the API returns an object like { count: <number> }
          setUserCount(userResponse.data);
          setPatientCount(patientResponse.data);
          setSalleCount(salleResponse.data);
      } catch (error) {
          console.error("Erreur lors de la récupération des données", error);
      }
  };

    fetchCounts();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Carte Utilisateurs */}
        <Link
          to="/users"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaUser className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Utilisateurs</h2>
              <p className="text-gray-600">Nombre total d'utilisateurs</p>
              <h3 className="text-2xl font-semibold text-gray-800">{userCount}</h3>
            </div>
          </div>
        </Link>

        {/* Carte Patients */}
        <Link
          to="/patients"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaUserInjured className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Patients</h2>
              <p className="text-gray-600">Gérer les dossiers patients</p>
              <h3 className="text-2xl font-semibold text-gray-800">{patientCount}</h3>
            </div>
          </div>
        </Link>

        {/* Carte Salles */}
        <Link
          to="/salles"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FaCalendarAlt className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Salles</h2>
              <p className="text-gray-600">Nombre total de salles</p>
              <h3 className="text-2xl font-semibold text-gray-800">{salleCount}</h3>
            </div>
          </div>
        </Link>

        {/* Carte Statistiques */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaChartLine className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Statistiques</h2>
              <p className="text-gray-600">Analyse des données</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section récapitulative */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Activité récente
          </h2>
          <p className="text-gray-600">Aucune activité récente pour le moment.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Notifications
          </h2>
          <p className="text-gray-600">Aucune nouvelle notification.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
