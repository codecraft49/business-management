import React, { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useSearchParams, useNavigate } from "react-router-dom";

const API_CONFIG = {
  BASE_URL: "http://localhost:5000/api",
  ENDPOINTS: {
    resetPassword: "/auth/reset-password",
  },
};

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const emailFromUrl = searchParams.get("email");
  const navigate = useNavigate();
  // console.log(token);
  // console.log(emailFromUrl);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(null), 1500);
      return;
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.resetPassword}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailFromUrl,
          token,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setTimeout(() => {
          setSuccess(null);
          navigate("/authentication/sign-in");
        }, 1500);
      } else {
        setError(data.message || "Something went wrong.");
        setTimeout(() => setError(null), 1500);
      }
    } catch (err) {
      setError("An error occurred.");
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
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={4}>
                <MDInput
                  type="password"
                  label="New Password"
                  variant="standard"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </MDBox>
              <MDBox mb={4}>
                <MDInput
                  type="password"
                  label="Confirm Password"
                  variant="standard"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={handleResetPassword}>
                  Reset Password
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
    </>
  );
}

export default ResetPassword;
