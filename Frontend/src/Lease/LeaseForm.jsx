import { useState } from "react";
import { Modal, TextField, Button, Box, Typography } from "@mui/material";

const LeaseForm = ({ addLease }) => {
  const [open, setOpen] = useState(false);
  const [tenantName, setTenantName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [agreement, setAgreement] = useState("");
  const [propertyImage, setPropertyImage] = useState("");

  const handleAdd = () => {
    if (!tenantName || !startDate || !endDate || !agreement || !propertyImage) return;
    addLease({ tenantName, startDate, endDate, agreement, propertyImage, status: "Active" });
    setOpen(false);
    setTenantName("");
    setStartDate("");
    setEndDate("");
    setAgreement("");
    setPropertyImage("");
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
          width: { xs: "90%", sm: 400 },
          bgcolor: "white", 
          p: 4, 
          borderRadius: "10px", 
          mx: "auto", 
          mt: 10, 
          boxShadow: 3 
        }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>Add Lease</Typography>
          <TextField label="Tenant Name" fullWidth variant="outlined" sx={{ mb: 3, borderRadius: "4px" }} value={tenantName} onChange={(e) => setTenantName(e.target.value)} />
          <TextField type="date" label="Start Date" fullWidth variant="outlined" sx={{ mb: 3, borderRadius: "4px" }} InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <TextField type="date" label="End Date" fullWidth variant="outlined" sx={{ mb: 3, borderRadius: "4px" }} InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <TextField label="Agreement Link" fullWidth variant="outlined" sx={{ mb: 3, borderRadius: "4px" }} value={agreement} onChange={(e) => setAgreement(e.target.value)} />
          <TextField label="Property Image URL" fullWidth variant="outlined" sx={{ mb: 3, borderRadius: "4px" }} value={propertyImage} onChange={(e) => setPropertyImage(e.target.value)} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outlined" color="secondary" onClick={() => setOpen(false)} sx={{ borderRadius: "8px" }}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleAdd} sx={{ borderRadius: "8px" }}>Add</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default LeaseForm;
