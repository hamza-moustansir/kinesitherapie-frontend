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
        {/* Routes publiques */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />

        {/* Routes protégées */}
        <Route element={<ProtectedLayout />}>
          <Route
            path="/"
            element={
              <DashboardPage>
                <Dashboard />
              </DashboardPage>
            }
          />
          <Route
            path="/patients"
            element={
              <DashboardPage>
                <PatientsPage />
              </DashboardPage>
            }
          />
          
          <Route
            path="/calendrier"
            element={
              <DashboardPage>
                <CalendrierPage />
              </DashboardPage>
            }
          />
          <Route
            path="/salles"
            element={
              <DashboardPage>
                <SallePage />
              </DashboardPage>
            }
          />
        </Route>

        {/* Routes réservées aux administrateurs */}
        <Route element={<ProtectedLayout roles={['ADMIN']} />}>
        <Route
            path="/users"
            element={
              <DashboardPage>
                <UserPage />
              </DashboardPage>
            }
          />
        </Route>

        {/* Route catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;