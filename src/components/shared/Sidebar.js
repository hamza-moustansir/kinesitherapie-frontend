import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaHome, FaUserInjured, FaCalendarAlt,FaUser, FaMoneyBillWave } from 'react-icons/fa';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={`bg-white shadow-md fixed h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Bouton de bascule */}
      <button
        onClick={toggleSidebar}
        className="p-4 w-full text-left hover:bg-gray-50"
      >
        <FaBars className="w-6 h-6 text-gray-600" />
      </button>

      <div className="p-4">
        <div className="mt-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <FaHome className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Tableau de bord</span>}
          </NavLink>

          {user?.role === 'ADMIN' && (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <FaUser className="w-5 h-5" />
              {!isCollapsed && <span className="ml-2">Utilisateurs</span>}
            </NavLink>
          )}

          <NavLink
            to="/patients"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <FaUserInjured className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Patients</span>}
          </NavLink>

            <NavLink
              to="/salles"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md ${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <FaMoneyBillWave className="w-5 h-5" />
              {!isCollapsed && <span className="ml-2">Salles</span>}
            </NavLink>

            <NavLink
            to="/rondez-vous"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <FaCalendarAlt className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Rendez-vous</span>}
          </NavLink>

            <NavLink
            to="/calendrier"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md ${
                isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <FaCalendarAlt className="w-5 h-5" />
            {!isCollapsed && <span className="ml-2">Calendrier</span>}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
