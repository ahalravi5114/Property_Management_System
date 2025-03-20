import { Card, CardContent, CardActions, Button, Typography, Box, TextField, Grid } from "@mui/material";
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
      borderRadius: "12px", 
      p: 3, 
      transition: "0.3s", 
      "&:hover": { boxShadow: 6 },
      height: "100%"
    }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Box 
              component="img"
              src={lease.image}
              alt="Property"
              sx={{ width:100, height:100 , borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>{lease.tenantName}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>Start: {formattedStartDate}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>End: {formattedEndDate}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>Address: {lease.address}</Typography>
            <Typography variant="body2" color={lease.status === "Active" ? "success.main" : "error.main"} sx={{ fontWeight: "bold" }}>
              {lease.status}
            </Typography>
            <a href={lease.agreement} target="_blank" rel="noopener noreferrer" style={{ color: "#007BFF", textDecoration: "underline", display: "block", marginTop: "12px" }}>
              View Agreement
            </a>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", pt: 0 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setShowRenew(true)}
          sx={{ borderRadius: "8px" }}
        >
          Renew
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => updateLease(index, "terminated")}
          sx={{ borderRadius: "8px" }}
        >
          Terminate
        </Button>
      </CardActions>
      {showRenew && (
        <Box sx={{ p: 3, mt: 2, borderTop: "1px solid #eee" }}>
          <TextField
            type="date"
            fullWidth
            variant="outlined"
            sx={{ mb: 2, borderRadius: "4px" }}
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
            sx={{ borderRadius: "8px" }}
          >
            Confirm Renewal
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default LeaseCard;
