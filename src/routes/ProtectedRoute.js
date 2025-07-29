import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const [state, setState] = useState({
    loading: true,
    authenticated: false,
    role: null,
  });

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/verify-token", {
          withCredentials: true,
        });

        if (!ignore && res.data.valid) {
          setState({
            loading: false,
            authenticated: true,
            role: Number(res.data.user.user_role), // 🔑 normalise to number
          });
        } else if (!ignore) {
          setState({ loading: false, authenticated: false, role: null });
        }
      } catch {
        if (!ignore) {
          setState({ loading: false, authenticated: false, role: null });
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, []); // ← no dependency on allowedRoles, it never changes

  if (state.loading) return <div></div>;

  if (!state.authenticated) return <Navigate to="/authentication/sign-in" replace />;

  // Not allowed for this set of roles
  if (!allowedRoles.includes(state.role)) {
    return <Navigate to={state.role === 1 ? "/dashboard" : "/profile"} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
