import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Dynamic Schema Creation Function
const createUserModel = (collectionName) => {
  return mongoose.model(
    collectionName,
    new mongoose.Schema({
      role: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    })
  );
};

// Create Models for Each Role
const Admin = createUserModel("admin");
const PropertyManager = createUserModel("propertyManager");
const Tenant = createUserModel("tenant");
const Accountant = createUserModel("accountant");

// Role Mapping
// Ensure the keys match frontend values exactly
const roleToModel = {
    admin: Admin,
    propertyManager: PropertyManager,
    tenant: Tenant,
    accountant: Accountant,
  };
  
// Maintenance Schema and Model
const Maintenance = mongoose.model("maintenance", new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    problem: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    requestType: { type: String, required: true },
  }));

// const TenantProfile = mongoose.model("tenantProfile", new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     nationality: { type: String, required: true },
//     leaseId: { type: String },
//     paymentId: { type: Boolean },
//   }));

// Signup Route
app.post("/signup", async (req, res) => {
    try {
      const { role, email, password } = req.body;
      console.log("Received Data:", req.body); //✅Debug Request Data
  
      if (!role || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      if (!roleToModel[role]) {
        return res.status(400).json({ error: "Invalid role" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const UserModel = roleToModel[role];
  
      const newUser = new UserModel({ role, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: `${role} registered successfully` });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ error: error.message || "Signup failed" });
    }
  });
  

// Signin Route
app.post("/signin", async (req, res) => {
  try {
    const { role, email, password } = req.body;
    if (!roleToModel[role]) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const UserModel = roleToModel[role];
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ error: "Signin failed" });
  }
});

app.post("/submit-maintenance", async (req, res) => {
    try {
      const { name, location, problem, phone, email, requestType } = req.body;
  
      if (!name || !location || !problem || !phone || !email || !requestType) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newMaintenance = new Maintenance({
        name,
        location,
        problem,
        phone,
        email,
        requestType,
      });
  
      await newMaintenance.save();
  
      res.status(201).json({ message: "Maintenance request submitted successfully" });
    } catch (error) {
      console.error("Maintenance Error:", error);
      res.status(500).json({ error: "Maintenance submission failed" });
    }
  });

app.post("/getTenantProfile", async (req,res)=>{
   const { name,email,phone,nationality } = req.body;
   if(!name , !phone,!nationality){

   }
})
// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));