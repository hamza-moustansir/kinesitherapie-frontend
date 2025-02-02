import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

const AppRouter = () => {
  const { user } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children, roles = [] }) => {
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
          <main className="flex-1 p-8">{children}</main>
        </div>
      </>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forbidden" element={<ForbiddenPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <PatientsPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/payments"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <PaymentsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;