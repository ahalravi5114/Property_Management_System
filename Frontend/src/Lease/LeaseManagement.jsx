import { useState } from "react";
import LeaseCard from "./LeaseCard";
import LeaseForm from "./LeaseForm";
import { Typography, Box, Grid } from "@mui/material";

const LeaseManagement = () => {
  const [leases, setLeases] = useState([
    { tenantName: "John Doe", startDate: "2024-01-01", endDate: "2025-01-01", agreement: "#", status: "Active", address: "123 Maple St, Springfield, IL",image:"https://ik.imagekit.io/zcdsz07ad/documents.jpg?updatedAt=1739960886177"},
    { tenantName: "Alice Smith", startDate: "2023-03-15", endDate: "2024-03-15", agreement: "#", status: "Active", address: "123 Maple St, Springfield, IL",image:"https://ik.imagekit.io/zcdsz07ad/documents.jpg?updatedAt=1739960886177" },
    { tenantName: "David Johnson", startDate: "2023-07-10", endDate: "2024-07-10", agreement: "#", status: "Active", address: "123 Maple St, Springfield, IL",image:"https://ik.imagekit.io/zcdsz07ad/documents.jpg?updatedAt=1739960886177"},
    { tenantName: "Emma Williams", startDate: "2023-12-01", endDate: "2024-12-01", agreement: "#", status: "Active" , address: "123 Maple St, Springfield, IL",image:"https://ik.imagekit.io/zcdsz07ad/documents.jpg?updatedAt=1739960886177"}
  ]);

  const addLease = (lease) => {
    setLeases([...leases, lease]);
  };

  const updateLease = (index, status, newEndDate = null) => {
    const updatedLeases = [...leases];
    if (status === "renewed") {
      updatedLeases[index].endDate = newEndDate;
    } else {
      updatedLeases[index].status = "Terminated";
    }
    setLeases(updatedLeases);
  };

  return (
    <Box sx={{ ml: { xs: 0, md: "250px" }, p: 6, bgcolor: "#f4f4f4", minHeight: "100vh" }}> {/* Added background color and min height */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "#333" }}>Lease Management</Typography> {/* Improved typography color and margin */}
      <LeaseForm addLease={addLease} />
      <Grid container spacing={4} mt={4}> {/* Increased spacing */}
        {leases.map((lease, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}> {/* Added medium breakpoint for responsiveness */}
            <LeaseCard lease={lease} index={index} updateLease={updateLease} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LeaseManagement;