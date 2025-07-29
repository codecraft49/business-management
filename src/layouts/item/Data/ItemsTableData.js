import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { useMaterialUIController } from "context";
import ItemData from "./ItemData";

export default function ItemsTableData() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const renderItemName = (name) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  );

  const renderWarehouse = (warehouse) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {warehouse}
      </MDTypography>
    </MDBox>
  );

  const renderDate = (date) => (
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {date}
    </MDTypography>
  );

  const renderPrice = (price) => (
    <MDTypography variant="caption" color="text" fontWeight="medium">
      {price}
    </MDTypography>
  );

  const renderActions = () => (
    <>
      <MDButton
        variant="text"
        color={darkMode ? "white" : "dark"}
        sx={{ minWidth: "35px", width: "35px", padding: 0 }}
      >
        <Icon fontSize="small">edit</Icon>
      </MDButton>
      <MDButton variant="text" color="error" sx={{ minWidth: "35px", width: "35px", padding: 0 }}>
        <Icon fontSize="small">delete</Icon>
      </MDButton>
    </>
  );

  return {
    columns: [
      { Header: "Item Name", accessor: "ItemName", align: "left" },
      { Header: "Warehouse", accessor: "Warehouse", align: "left" },
      { Header: "Date", accessor: "Date", align: "center" },
      { Header: "Purchase Price", accessor: "PurchasePrice", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: ItemData.map((item) => ({
      ItemName: renderItemName(item.name),
      Warehouse: renderWarehouse(item.Warehouse),
      Date: renderDate(item.Date),
      PurchasePrice: renderPrice(item.PurchasePrice),
      action: renderActions(),
    })),
  };
}
