import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Dashboard from '../pages/Dashboard';
import PatientsPage from '../pages/PatientsPage';
import AppointmentsPage from '../pages/AppointmentsPage';
import PaymentsPage from '../pages/PaymentsPage';
import ForbiddenPage from '../pages/ForbiddenPage';
import Navbar from '../components/shared/Navbar';
import Sidebar from '../components/shared/Sidebar';

const ProtectedLayout = ({ roles = [] }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />

        {/* Protected routes  <Route element={<ProtectedLayout />}></Route> */}
         
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        

        {/* Admin-only routes */}
        <Route element={<ProtectedLayout roles={['Administrateur']} />}>
          <Route path="/payments" element={<PaymentsPage />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;