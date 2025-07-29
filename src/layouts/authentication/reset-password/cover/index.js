import React, { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-reset-cover.jpeg";
import MDAlert from "../../../../components/MDAlert";
import { useNavigate } from "react-router-dom";

const API_CONFIG = {
  BASE_URL: "http://localhost:5000/api",
  ENDPOINTS: {
    forgotPassword: "/auth/forgot-password",
  },
};

function Cover() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgot = async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.forgotPassword}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setSuccess(data.message);
      setTimeout(() => {
        setSuccess(null);
        navigate("/authentication/sign-in");
      }, 1500);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
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
      <CoverLayout coverHeight="50vh" image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            py={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
              Reset Password
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              You will receive an e-mail in maximum 60 seconds
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={4}>
                <MDInput
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={handleForgot}>
                  Send email
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
    </>
  );
}

export default Cover;
