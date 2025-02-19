import { useState } from "react";
import { Modal, TextField, Button, Box, Typography } from "@mui/material";

const LeaseForm = ({ addLease }) => {
  const [open, setOpen] = useState(false);
  const [tenantName, setTenantName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [agreement, setAgreement] = useState("");

  const handleAdd = () => {
    if (!tenantName || !startDate || !endDate || !agreement) return;
    addLease({ tenantName, startDate, endDate, agreement, status: "Active" });
    setOpen(false);
    setTenantName("");
    setStartDate("");
    setEndDate("");
    setAgreement("");
  };

  return (
    <div>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ borderRadius: "8px", padding: "10px 16px" }} 
        onClick={() => setOpen(true)}
      >
        Add Lease
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ 
          width: { xs: "90%", sm: 400 }, // Make modal responsive
          bgcolor: "white", 
          p: 4, 
          borderRadius: "10px", 
          mx: "auto", 
          mt: 10, 
          boxShadow: 3 
        }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>Add Lease</Typography> {/* Improved typography color and margin */}
          <TextField label="Tenant Name" fullWidth variant="outlined" sx={{ mb: 3, borderRadius: "4px" }} value={tenantName} onChange={(e) => setTenantName(e.target.value)} /> {/* Added border radius and margin */}
          <TextField type="date" label="Start Date" fullWidth variant="outlined" sx={{ mb: 3, borderRadius: "4px" }} InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} /> {/* Added border radius and margin */}
          <TextField type="date" label="End Date" fullWidth variant="outlined" sx={{ mb: 3, borderRadius: "4px" }} InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} /> {/* Added border radius and margin */}
          <TextField label="Agreement Link" fullWidth variant="outlined" sx={{ mb: 3, borderRadius: "4px" }} value={agreement} onChange={(e) => setAgreement(e.target.value)} /> {/* Added border radius and margin */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}> {/* Added margin top */}
            <Button variant="outlined" color="secondary" onClick={() => setOpen(false)} sx={{ borderRadius: "8px" }}>Cancel</Button> {/* Added border radius */}
            <Button variant="contained" color="primary" onClick={handleAdd} sx={{ borderRadius: "8px" }}>Add</Button> {/* Added border radius */}
          </Box> {/* Closing the Box component here */}
        </Box>
      </Modal>
    </div>
  );
};

export default LeaseForm;