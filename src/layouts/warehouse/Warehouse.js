import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import Modal from "react-bootstrap/Modal";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarehouseData from "./Data/WarehouseData";
import ItemData from "../item/Data/ItemData";

const Warehouse = () => {
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [formData, setFormData] = useState({ warehouse_name: "", warehouse_address: "" });
  const [itemData, setItemData] = useState({
    item_name: "",
    date: "",
    purchase_price: "",
    item_quantity: "",
  });
  const [itemsByWarehouse, setItemsByWarehouse] = useState({});

  useEffect(() => {
    // Load mock data from WarehouseData.js
    setWarehouses(WarehouseData);
  }, []);

  const handleShowWarehouseModal = () => setShowWarehouseModal(true);
  const handleCloseWarehouseModal = () => setShowWarehouseModal(false);

  const handleShowItemModal = () => setShowItemModal(true);
  const handleCloseItemModal = () => setShowItemModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWarehouseSubmit = (e) => {
    e.preventDefault();
    const newWarehouse = {
      id: Date.now(),
      name: formData.warehouse_name,
      address: formData.warehouse_address,
    };
    setWarehouses((prev) => [...prev, newWarehouse]);
    setFormData({ warehouse_name: "", warehouse_address: "" });
    handleCloseWarehouseModal();
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    if (!selectedWarehouse) return;

    const newItem = {
      id: Date.now(),
      ...itemData,
    };

    setItemsByWarehouse((prev) => ({
      ...prev,
      [selectedWarehouse.id]: [...(prev[selectedWarehouse.id] || []), newItem],
    }));

    setItemData({ item_name: "", date: "", purchase_price: "", item_quantity: "" });
    handleCloseItemModal();
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedWarehouse(
      selectedId ? warehouses.find((w) => w.id.toString() === selectedId) : null
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <MDBox px={2}>
              <MDButton variant="gradient" color="success" onClick={handleShowWarehouseModal}>
                <Icon>add</Icon>&nbsp;Add Warehouse
              </MDButton>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MDBox px={2} display="flex" justifyContent="end">
              <select
                name="warehouse"
                id="warehouse"
                className="cust-select"
                onChange={handleSelectChange}
                value={selectedWarehouse?.id || ""}
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </MDBox>
          </Grid>

          {/* Warehouse Modal */}
          <Modal
            show={showWarehouseModal}
            onHide={handleCloseWarehouseModal}
            centered
            className="add-warehouse-model"
          >
            <Modal.Header closeButton />
            <Modal.Body>
              <MDBox pt={2} px={2}>
                <MDTypography variant="h4">Add Warehouse</MDTypography>
              </MDBox>
              <MDBox p={2} component="form" onSubmit={handleWarehouseSubmit}>
                <MDBox mb={2}>
                  <MDInput
                    label="Warehouse Name"
                    name="warehouse_name"
                    variant="standard"
                    fullWidth
                    value={formData.warehouse_name}
                    onChange={handleInputChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    label="Warehouse Address"
                    name="warehouse_address"
                    variant="standard"
                    fullWidth
                    value={formData.warehouse_address}
                    onChange={handleInputChange}
                  />
                </MDBox>
                <MDBox mt={4}>
                  <MDButton type="submit" variant="gradient" color="warning" fullWidth>
                    Add Warehouse
                  </MDButton>
                </MDBox>
              </MDBox>
            </Modal.Body>
          </Modal>

          {/* Item Modal */}
          <Modal
            show={showItemModal}
            onHide={handleCloseItemModal}
            centered
            className="add-warehouse-model"
          >
            <Modal.Header closeButton />
            <Modal.Body>
              <MDBox pt={2} px={2}>
                <MDTypography variant="h4">Add Item</MDTypography>
              </MDBox>
              <MDBox p={2} component="form" onSubmit={handleItemSubmit}>
                <MDBox mb={2}>
                  <select
                    name="itemSelect"
                    className="add-item-cust-select"
                    value={itemData.item_name}
                    onChange={(e) => {
                      const selectedItem = ItemData.find(
                        (item) =>
                          item.name === e.target.value && item.Warehouse === selectedWarehouse?.name
                      );
                      if (selectedItem) {
                        setItemData({
                          item_name: selectedItem.name,
                          date: selectedItem.Date,
                          purchase_price: selectedItem.PurchasePrice,
                          item_quantity: selectedItem.ItemQuantity,
                        });
                      }
                    }}
                  >
                    <option value="">Select Item</option>
                    {ItemData.filter((item) => item.Warehouse === selectedWarehouse?.name).map(
                      (item) => (
                        <option key={item.id + item.name} value={item.name}>
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                </MDBox>
                <MDBox mt={4}>
                  <MDButton type="submit" variant="gradient" color="warning" fullWidth>
                    Add Item
                  </MDButton>
                </MDBox>
              </MDBox>
            </Modal.Body>
          </Modal>

          {/* Item Display */}
          {selectedWarehouse && (
            <Grid item xs={12}>
              <Card style={{ minHeight: "450px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <MDBox px={2} pt={2}>
                      <MDTypography variant="h4">{selectedWarehouse.name}</MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={6}>
                    <MDBox px={2} pt={2} display="flex" justifyContent="end">
                      <MDButton variant="gradient" color="success" onClick={handleShowItemModal}>
                        <Icon>add</Icon>&nbsp;Add Item
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>

                <MDBox
                  p={2}
                  sx={{
                    position: "relative",
                    height: "450px",
                    overflow: "hidden",
                  }}
                >
                  {(itemsByWarehouse[selectedWarehouse.id] || []).map((item, index) => (
                    <Draggable
                      key={item.id}
                      bounds="parent"
                      defaultPosition={{
                        x: 10 + ((index * 110) % 400),
                        y: 10 + Math.floor(index / 4) * 110,
                      }}
                    >
                      <div
                        className="box"
                        style={{
                          width: 140,
                          height: 140,
                          backgroundColor: "#90caf9",
                          padding: 10,
                          position: "absolute",
                        }}
                      >
                        <InfoOutlinedIcon className="item-info" />
                        <h5>{item.item_name}</h5>
                        <p>Purchase Price: {item.purchase_price}</p>
                        <p>Date: {item.date}</p>
                        <p>Qty: {item.item_quantity}</p>
                      </div>
                    </Draggable>
                  ))}
                </MDBox>
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default Warehouse;
