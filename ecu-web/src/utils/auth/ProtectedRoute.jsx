import PropTypes from "prop-types";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  return isAuthenticated ? (
    Component ? (
      <Component {...rest} />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
};

export default ProtectedRoute;
