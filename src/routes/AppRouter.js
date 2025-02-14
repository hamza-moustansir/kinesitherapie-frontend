import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import PatientsPage from '../pages/PatientsPage';
import UserPage from '../pages/UserPage';
import CalendrierPage from '../pages/CalendrierPage';
import PaymentsPage from '../pages/PaymentsPage';
import ForbiddenPage from '../pages/ForbiddenPage';
import Navbar from '../components/shared/Navbar';
import Sidebar from '../components/shared/Sidebar';
import DashboardPage from '../pages/DashboardPage'; // Importer DashboardPage
import SallePage from '../pages/SallePage';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import ForbiddenPage from "../pages/ForbiddenPage";
import PatientsPage from "../pages/PatientsPage";
import AppointmentsPage from "../pages/AppointmentsPage";
import PaymentsPage from "../pages/PaymentsPage";

import Navbar from "../components/shared/Navbar";
import Sidebar from "../components/shared/Sidebar";
import RondezVous from "../components/rondezvous/RondezVous";

const ProtectedLayout = ({ roles = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div className="flex-grow">
          <Outlet context={{ isSidebarCollapsed }} /> {/* Passer l'état du sidebar */}
        </div>
      </div>
    </>
  );
};

const AppRouter = () => {
  return (
      <BrowserRouter>
          <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forbidden" element={<ForbiddenPage />} />

              {/* Protected Routes */}
              <Route element={<ProtectedLayout />}>
                  <Route path="/" element={<DashboardPage><Dashboard /></DashboardPage>} />
                  <Route path="/patients" element={<DashboardPage><PatientsPage /></DashboardPage>} />
                  <Route path="/calendrier" element={<DashboardPage><CalendrierPage /></DashboardPage>} />
                  <Route path="/salles" element={<DashboardPage><SallePage /></DashboardPage>} />
                  <Route path="/appointments" element={<AppointmentsPage />} />
                  <Route path="/rondezvous" element={<RondezVous />} />
              </Route>

              {/* Admin-only routes */}
              <Route element={<ProtectedLayout roles={["Administrateur"]} />}>
                  <Route path="/payments" element={<PaymentsPage />} />
              </Route>

              {/* Admin User Management */}
              <Route element={<ProtectedLayout roles={["ADMIN"]} />}>
                  <Route path="/users" element={<DashboardPage><UserPage /></DashboardPage>} />
              </Route>

              {/* Catch-All Route */}
              <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
      </BrowserRouter>
  );
};

export default AppRouter;
