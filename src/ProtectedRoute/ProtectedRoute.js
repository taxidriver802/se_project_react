import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token');
  return isLoggedIn ? children : <Navigate to="/" replace={true} />;
};

export default ProtectedRoute;
