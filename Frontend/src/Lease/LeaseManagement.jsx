import { useState } from "react";
import LeaseCard from "./LeaseCard";
import LeaseForm from "./LeaseForm";
import { Typography, Box, Grid, Button, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useSnackbar } from "notistack"; // Import Notistack for notifications

const LeaseManagement = () => {
  const { enqueueSnackbar } = useSnackbar(); // Initialize notification system

  const [leases, setLeases] = useState([
    { tenantName: "John Doe", startDate: "2024-01-01", endDate: "2025-01-01", agreement: "#", status: "Active", address: "123 Maple St, Springfield, IL", image:"https://ik.imagekit.io/zcdsz07ad/documents.jpg?updatedAt=1739960886177" },
    { tenantName: "Alice Smith", startDate: "2023-03-15", endDate: "2024-03-15", agreement: "#", status: "Active", address: "123 Maple St, Springfield, IL", image:"https://ik.imagekit.io/zcdsz07ad/documents.jpg?updatedAt=1739960886177" },
    { tenantName: "David Johnson", startDate: "2023-07-10", endDate: "2024-07-10", agreement: "#", status: "Terminated", address: "123 Maple St, Springfield, IL", image:"https://ik.imagekit.io/zcdsz07ad/documents.jpg?updatedAt=1739960886177" },
    { tenantName: "Emma Williams", startDate: "2023-12-01", endDate: "2024-12-01", agreement: "#", status: "Active", address: "123 Maple St, Springfield, IL", image:"https://ik.imagekit.io/zcdsz07ad/documents.jpg?updatedAt=1739960886177" }
  ]);

  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [drawerOpen, setDrawerOpen] = useState(false); // State for notification panel

  const addLease = (lease) => {
    setLeases([...leases, lease]);
    const message = "Lease added successfully!";
    enqueueSnackbar(message, { variant: "success" });
    addNotification(message);
  };

  const updateLease = (index, status, newEndDate = null) => {
    const updatedLeases = [...leases];
    let message = "";

    if (status === "renewed") {
      updatedLeases[index].endDate = newEndDate;
      message = "Lease renewed successfully!";
      enqueueSnackbar(message, { variant: "info" });
    } else {
      updatedLeases[index].status = "Terminated";
      message = "Lease terminated!";
      enqueueSnackbar(message, { variant: "error" });
    }

    setLeases(updatedLeases);
    addNotification(message);
  };

  // Function to add a notification to the list
  const addNotification = (message) => {
    setNotifications((prev) => [...prev, { message, time: new Date().toLocaleTimeString() }]);
  };

  // Function to clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <Box sx={{ ml: { xs: 0, md: "250px" }, p: 6, bgcolor: "#f4f4f4", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "#333" }}>
        Lease Management
      </Typography>

      {/* Buttons for Notifications & Lease Form */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <LeaseForm addLease={addLease} />
        <Button variant="contained" color="primary" onClick={() => setDrawerOpen(true)}>
          View Notifications ({notifications.length})
        </Button>
      </Box>

      {/* Lease Cards */}
      <Grid container spacing={4} mt={4}>
        {leases.map((lease, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <LeaseCard lease={lease} index={index} updateLease={updateLease} />
          </Grid>
        ))}
      </Grid>

      {/* Notification Panel Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 350, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Lease Notifications 🔔
          </Typography>

          <Button variant="contained" color="error" onClick={clearNotifications} sx={{ mb: 2 }}>
            Clear All
          </Button>

          <List>
            {notifications.length > 0 ? (
              notifications.map((note, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText primary={note.message} secondary={`Time: ${note.time}`} />
                  </ListItem>
                  <Divider />
                </div>
              ))
            ) : (
              <Typography>No notifications available.</Typography>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default LeaseManagement;
