// src/pages/CalendrierPage.js
import React from 'react';
import Calendar from '../components/calendrier/Calendar';  // Assurez-vous que le chemin est correct

const CalendrierPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Calendrier des Rendez-vous</h1>
      
      {/* Intégration du composant Calendar */}
      <Calendar />
    </div>
  );
};

export default CalendrierPage;
