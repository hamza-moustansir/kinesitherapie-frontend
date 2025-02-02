import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-64 bg-white shadow-md fixed h-full">
      <div className="p-4">
        <div className="mt-4 space-y-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
            }
          >
            Tableau de bord
          </NavLink>
          
          <NavLink
            to="/patients"
            className={({ isActive }) => 
              `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
            }
          >
            Patients
          </NavLink>
          
          <NavLink
            to="/appointments"
            className={({ isActive }) => 
              `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
            }
          >
            Rendez-vous
          </NavLink>
          
          {user?.role === 'ADMIN' && (
            <NavLink
              to="/payments"
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
              }
            >
              Paiements
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;