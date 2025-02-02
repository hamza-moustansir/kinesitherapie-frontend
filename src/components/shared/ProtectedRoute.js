// components/shared/ProtectedRoute.js
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
  
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return children;
  };