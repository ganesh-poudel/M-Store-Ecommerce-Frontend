import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppState } from '../redux/store';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

const ProtectedRoute = () => {
  const authUser = useSelector((state: AppState) => state.authReducer);
  if (authUser && authUser.isAuthenticated ) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
