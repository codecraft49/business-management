import { useEffect, useState, useCallback } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { useMaterialUIController } from "context";

const API_CONFIG = {
  BASE_URL: "http://localhost:5000/api",
  GETENDPOINTS: {
    GET_USERS: "/auth/get-users",
  },
  //   DELETEENDPOINTS: {
  //     DELETE_PRODUCT_CATEGORY: "/auth/delete-product-category",
  //   },
};

function UsersTableData(handleEditClick, setSuccess, setError) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [rows, setRows] = useState([]);

  const roleLabels = {
    2: "Sales Person",
    3: "Office Staff",
    4: "Customer",
  };

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.GETENDPOINTS.GET_USERS}`);
      const data = await response.json();

      const formattedRows = data.map((users) => ({
        name: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox lineHeight={1}>
              <MDTypography variant="caption" sx={{ display: "none" }}>
                {users.user_id}
              </MDTypography>
              <MDTypography display="block" variant="button" fontWeight="medium">
                {users.user_name}
              </MDTypography>
              <MDTypography variant="caption">{users.user_email}</MDTypography>
            </MDBox>
          </MDBox>
        ),
        phone: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox lineHeight={1}>
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {users.user_phone}
              </MDTypography>
            </MDBox>
          </MDBox>
        ),
        user_type: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox lineHeight={1}>
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {roleLabels[users.user_role] || "Unknown"}
              </MDTypography>
            </MDBox>
          </MDBox>
        ),
        address: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox lineHeight={1}>
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {users.user_address}
              </MDTypography>
            </MDBox>
          </MDBox>
        ),
        action: (
          <>
            <MDButton
              variant="text"
              color={darkMode ? "white" : "dark"}
              sx={{ minWidth: "35px", width: "35px", padding: 0 }}
            >
              <Icon fontSize="small">edit</Icon>
            </MDButton>
            <MDButton
              variant="text"
              color="error"
              sx={{ minWidth: "35px", width: "35px", padding: 0 }}
            >
              <Icon fontSize="small">delete</Icon>
            </MDButton>
          </>
        ),
      }));

      setRows(formattedRows);
    } catch (err) {
      console.error("Failed to fetch categorys", err);
    }
  }, [darkMode]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Phone", accessor: "phone", align: "left" },
    { Header: "User Type", accessor: "user_type", align: "left" },
    { Header: "Address", accessor: "address", align: "left" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  return { columns, rows, fetchUsers };
}

export default UsersTableData;
