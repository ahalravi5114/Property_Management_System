import { Avatar, Button, Card, CardContent, Tab, Tabs, Typography, Box } from "@mui/material";
import { Phone as PhoneIcon, Email as EmailIcon, LocationOn as LocationIcon } from "@mui/icons-material";
import { useState } from "react";

const TenantProfile = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ bgcolor: "#F5F5F5", minHeight: "100vh", p: 3, display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: "90%", maxWidth: 800, p: 3, boxShadow: 3 }}>
        
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar src="https://via.placeholder.com/100" sx={{ width: 80, height: 80 }} />
          <Box>
            <Typography variant="h5" fontWeight="bold" color="#1C1C1C">John Doe</Typography>
            <Typography variant="body2" color="#4A4A4A">Tenant</Typography>
          </Box>
        </Box>

        <Box display="flex" gap={2} alignItems="center">
          <PhoneIcon color="primary" />
          <Typography variant="body1" color="#4A4A4A">+123 456 7890</Typography>
        </Box>
        <Box display="flex" gap={2} alignItems="center" mt={1}>
          <EmailIcon color="primary" />
          <Typography variant="body1" color="#4A4A4A">johndoe@example.com</Typography>
        </Box>
        <Box display="flex" gap={2} alignItems="center" mt={1}>
          <LocationIcon color="primary" />
          <Typography variant="body1" color="#4A4A4A">123 Main St, City, Country</Typography>
        </Box>

        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mt: 3 }}>
          <Tab label="Personal" />
          <Tab label="Lease" />
          <Tab label="Payment" />
        </Tabs>

        <CardContent>
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" color="#1C1C1C">Personal Details</Typography>
              <Typography variant="body1" color="#4A4A4A">Date of Birth: Jan 1, 1990</Typography>
              <Typography variant="body1" color="#4A4A4A">Nationality: American</Typography>
            </Box>
          )}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" color="#1C1C1C">Lease Details</Typography>
              <Typography variant="body1" color="#4A4A4A">Lease Start: Jan 1, 2024</Typography>
              <Typography variant="body1" color="#4A4A4A">Rent Amount: $1200/month</Typography>
            </Box>
          )}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" color="#1C1C1C">Payment Details</Typography>
              <Typography variant="body1" color="#4A4A4A">Last Payment: Feb 1, 2025</Typography>
              <Typography variant="body1" color="#4A4A4A">Outstanding Balance: $0</Typography>
            </Box>
          )}
        </CardContent>

        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="contained" sx={{ bgcolor: "#2E8B57", color: "#FFF" }}>Edit Profile</Button>
          <Button variant="contained" color="error">Logout</Button>
        </Box>

      </Card>
    </Box>
  );
};

export default TenantProfile;
