// src/routes/PublicOnlyRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const PublicOnlyRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/verify-token", {
          withCredentials: true,
        });

        if (res.data.valid) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (isLoading) return <div></div>;

  return isLoggedIn ? <Navigate to="/dashboard" /> : children;
};

// Remove the unused prop-type
PublicOnlyRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PublicOnlyRoute;
