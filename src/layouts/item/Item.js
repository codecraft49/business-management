import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import WarehouseData from "../warehouse/Data/WarehouseData";
import ItemData from "./Data/ItemData";
import DataTable from "examples/Tables/DataTable";
import Icon from "@mui/material/Icon";

const Item = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState(ItemData);
  const [formData, setFormData] = useState({
    item_name: "",
    warehouse: "",
    date: "",
    purchase_price: "",
    item_quantity: "",
  });

  useEffect(() => {
    setWarehouses(WarehouseData);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      name: formData.item_name,
      Warehouse: formData.warehouse,
      Date: formData.date,
      PurchasePrice: formData.purchase_price,
      ItemQuantity: formData.item_quantity,
    };

    setItems([...items, newItem]);

    setFormData({
      item_name: "",
      warehouse: "",
      date: "",
      purchase_price: "",
      item_quantity: "",
    });
  };

  // Render table columns/rows based on items state
  const columns = [
    { Header: "Item Name", accessor: "ItemName", align: "left" },
    { Header: "Warehouse", accessor: "Warehouse", align: "left" },
    { Header: "Date", accessor: "Date", align: "center" },
    { Header: "Purchase Price", accessor: "PurchasePrice", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },
  ];

  const rows = items.map((item) => ({
    ItemName: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.name}
      </MDTypography>
    ),
    Warehouse: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.Warehouse}
      </MDTypography>
    ),
    Date: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.Date}
      </MDTypography>
    ),
    PurchasePrice: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.PurchasePrice}
      </MDTypography>
    ),
    action: (
      <>
        <MDButton variant="text" color="dark" sx={{ minWidth: "35px", width: "35px", padding: 0 }}>
          <Icon fontSize="small">edit</Icon>
        </MDButton>
        <MDButton variant="text" color="error" sx={{ minWidth: "35px", width: "35px", padding: 0 }}>
          <Icon fontSize="small">delete</Icon>
        </MDButton>
      </>
    ),
  }));

  return (
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
                <MDTypography variant="h4">Add Item</MDTypography>
              </MDBox>
              <MDBox p={2} component="form" onSubmit={handleSubmit}>
                <MDBox mb={2}>
                  <MDInput
                    label="Item Name"
                    name="item_name"
                    variant="standard"
                    fullWidth
                    value={formData.item_name}
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <select
                    name="warehouse"
                    className="add-item-cust-select"
                    value={formData.warehouse}
                    onChange={handleChange}
                  >
                    <option value="">Select Warehouse</option>
                    {warehouses.map((w) => (
                      <option key={w.id} value={w.name}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    type="date"
                    name="date"
                    variant="standard"
                    fullWidth
                    value={formData.date}
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    label="Purchase Price"
                    name="purchase_price"
                    variant="standard"
                    fullWidth
                    value={formData.purchase_price}
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    label="Item Quantity"
                    name="item_quantity"
                    variant="standard"
                    fullWidth
                    value={formData.item_quantity}
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox mt={4}>
                  <MDButton type="submit" variant="gradient" color="warning" fullWidth>
                    Add Item
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Item;
