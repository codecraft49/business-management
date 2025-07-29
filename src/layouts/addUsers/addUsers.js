import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAlert from "../../components/MDAlert";
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";
import axios from "axios";
import UsersTableData from "./Data/UsersTableData";

const API_CONFIG = {
  BASE_URL: "http://localhost:5000/api",
  ENDPOINTS: {
    ADDUSERS: "/auth/add-users",
    SEND_RESET_PASSWORD: "/auth/forgot-password",
  },
};

const addUsers = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { columns, rows, fetchUsers } = UsersTableData(null, setSuccess, setError);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_role: "",
    user_address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADDUSERS}`,
        formData
      );

      const data = await response.data;
      setSuccess(data.message);
      setTimeout(() => setSuccess(null), 1500);

      setFormData({
        user_name: "",
        user_email: "",
        user_phone: "",
        user_role: "",
        user_address: "",
      });

      fetchUsers();

      // Call API to send reset password mail
      await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEND_RESET_PASSWORD}`, {
        email: formData.user_email,
      });
    } catch (err) {
      const backendError = err.response?.data?.error || err.response?.data?.message || err.message;
      setError(backendError);
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
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <Card>
                <MDBox pt={2} px={2}>
                  <MDTypography variant="h4">Add User</MDTypography>
                </MDBox>
                <MDBox p={2} component="form" onSubmit={handleSubmit}>
                  <MDBox mb={2}>
                    <MDInput
                      label="Full Name"
                      name="user_name"
                      variant="standard"
                      fullWidth
                      value={formData.user_name}
                      onChange={handleChange}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      label="User Email"
                      name="user_email"
                      variant="standard"
                      fullWidth
                      value={formData.user_email}
                      onChange={handleChange}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      label="User Phone"
                      name="user_phone"
                      variant="standard"
                      fullWidth
                      value={formData.user_phone}
                      onChange={handleChange}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <select
                      name="user_role"
                      className="add-item-cust-select"
                      value={formData.user_role}
                      onChange={handleChange}
                    >
                      <option value="">Select User Type</option>
                      <option value="2">Sales Person</option>
                      <option value="3">Office Staff</option>
                      <option value="4">Customer</option>
                    </select>
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      label="User Address"
                      name="user_address"
                      variant="standard"
                      fullWidth
                      value={formData.user_address}
                      onChange={handleChange}
                    />
                  </MDBox>
                  <MDBox mt={4}>
                    <MDButton type="submit" variant="gradient" color="warning" fullWidth>
                      Add User
                    </MDButton>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </>
  );
};

export default addUsers;
