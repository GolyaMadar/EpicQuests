import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

const RequireAuth = () => {
  const { token, isLoggedIn } = UseAuth();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/user/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
