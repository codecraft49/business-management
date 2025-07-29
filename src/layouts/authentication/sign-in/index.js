/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "axios";
import MDAlert from "../../../components/MDAlert";

const API_CONFIG = {
  BASE_URL: "http://localhost:5000/api",
  ENDPOINTS: {
    LOGIN: "/auth/login",
  },
};

function Basic() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`,
        formData,
        { withCredentials: true }
      );

      const data = await response.data;
      setSuccess(data.message);
      setTimeout(() => {
        setSuccess(null);
        if (data.user.user_role == 1) {
          // navigate("/dashboard");
          window.location.href = "/dashboard";
        } else if (data.user.user_role == 2) {
          // navigate("/profile");
          window.location.href = "/profile";
        } else {
          navigate("/authentication/sign-in");
        }
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      setTimeout(() => setError(null), 1500);
    }
  };

  const alertContent = (message) => (
    <MDTypography variant="body2" color="white">
      {message}
    </MDTypography>
  );

  return (
    <>
      <div className="alert-container">
        {error && (
          <MDAlert color="error" dismissible onClose={() => setError(null)}>
            {alertContent(error)}
          </MDAlert>
        )}
        {success && (
          <MDAlert color="success" dismissible onClose={() => setSuccess(null)}>
            {alertContent(success)}
          </MDAlert>
        )}
      </div>
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Login
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Login to get your access
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form" onSubmit={handleSubmit}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Email or Username"
                  name="emailOrUsername"
                  fullWidth
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  name="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="left">
                <MDTypography variant="button" color="text">
                  Forgot password?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/reset-password/cover"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Reset Password
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth type="submit">
                  Login
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
    </>
  );
}

export default Basic;
