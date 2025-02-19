import { Card, CardContent, CardActions, Button, Typography, Box, TextField } from "@mui/material";
import { useState } from "react";
import moment from 'moment'; 

const LeaseCard = ({ lease, index, updateLease }) => {
  const [showRenew, setShowRenew] = useState(false);
  const [newEndDate, setNewEndDate] = useState("");

  const formattedStartDate = moment(lease.startDate).format('MMMM DD, YYYY');
  const formattedEndDate = moment(lease.endDate).format('MMMM DD, YYYY');


  return (
    <Card sx={{ 
      boxShadow: 3, 
      borderRadius: "12px", // Increased border radius
      p: 3, // Increased padding
      transition: "0.3s", 
      "&:hover": { boxShadow: 6 },
      height: "100%" // Ensure card takes full height of grid item
    }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>{lease.tenantName}</Typography> {/* Improved typography color */}
        <Typography variant="body2" color="text.secondary" gutterBottom>Start: {formattedStartDate}</Typography> {/* Used gutterBottom for spacing */}
        <Typography variant="body2" color="text.secondary" gutterBottom>End: {formattedEndDate}</Typography>
        <Typography variant="body2" color={lease.status === "Active" ? "success.main" : "error.main"} sx={{ fontWeight: "bold" }}>
          {lease.status}
        </Typography>
        <a href={lease.agreement} target="_blank" rel="noopener noreferrer" style={{ color: "#007BFF", textDecoration: "underline", display: "block", marginTop: "12px" }}> {/* Increased margin top */}
          View Agreement
        </a>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", pt: 0 }}> {/* Removed padding top */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setShowRenew(true)}
          sx={{ borderRadius: "8px" }} // Added border radius
        >
          Renew
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => updateLease(index, "terminated")}
          sx={{ borderRadius: "8px" }} // Added border radius
        >
          Terminate
        </Button>
      </CardActions>
      {showRenew && (
        <Box sx={{ p: 3, mt: 2, borderTop: "1px solid #eee" }}> {/* Added border and margin top */}
          <TextField
            type="date"
            fullWidth
            variant="outlined"
            sx={{ mb: 2, borderRadius: "4px" }} // Added border radius
            value={newEndDate}
            onChange={(e) => setNewEndDate(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={() => {
              updateLease(index, "renewed", newEndDate);
              setShowRenew(false);
            }}
            sx={{ borderRadius: "8px" }} // Added border radius
          >
            Confirm Renewal
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default LeaseCard;