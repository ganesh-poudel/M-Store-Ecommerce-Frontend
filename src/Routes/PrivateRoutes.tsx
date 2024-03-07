import { Navigate, Outlet } from "react-router-dom";
import { AppState } from "../redux/store";
import { useSelector } from "react-redux";
import { ROLE } from "../utils/roles";

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
  // } else if ((authUser && authUser.isAuthenticated) || role === authUser.role) {
  //    return <Outlet />;
  // }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
