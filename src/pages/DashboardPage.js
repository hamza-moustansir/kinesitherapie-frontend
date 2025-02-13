import React from 'react';
import { useOutletContext } from 'react-router-dom';

const DashboardPage = ({ children }) => {
  const { isSidebarCollapsed } = useOutletContext(); // Récupérer l'état du sidebar

  return (
    <div className={`flex-grow p-6 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
      {children} {/* Afficher le composant enfant */}
    </div>
  );
};

export default DashboardPage;