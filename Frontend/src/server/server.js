import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Setup File Upload Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Dynamic Schema Creation Function
const createUserModel = (collectionName) =>
  mongoose.model(
    collectionName,
    new mongoose.Schema(
      {
        role: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
      },
      { timestamps: true }
    )
  );

// Create Models for Each Role
const Admin = createUserModel("admin");
const PropertyManager = createUserModel("propertyManager");
const Tenant = createUserModel("tenant");
const Accountant = createUserModel("accountant");

// Role Mapping
const roleToModel = {
  admin: Admin,
  propertyManager: PropertyManager,
  tenant: Tenant,
  accountant: Accountant,
};

// Maintenance Schema & Model
const Maintenance = mongoose.model(
  "maintenance",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      location: { type: String, required: true },
      problem: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      requestType: { type: String, required: true },
    },
    { timestamps: true }
  )
);

// 📝 Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!roleToModel[role]) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const UserModel = roleToModel[role];
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ role, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: `${role} registered successfully` });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ error: "Signup failed" });
  }
});

// 🔑 Signin Route
app.post("/signin", async (req, res) => {
  try {
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!roleToModel[role]) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const UserModel = roleToModel[role];
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("❌ Signin Error:", error);
    res.status(500).json({ error: "Signin failed" });
  }
});

// 🛠️ Maintenance Request Submission
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
    console.error("❌ Maintenance Error:", error);
    res.status(500).json({ error: "Maintenance submission failed" });
  }
});

const LeaseSchema = new mongoose.Schema(
  {
    tenantName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    propertyAddress: { type: String, required: true },
    agreement: String, 
    propertyImage: String, 
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

const Lease = mongoose.model("Lease", LeaseSchema);

app.post(
  "/leases",
  upload.fields([{ name: "agreement" }, { name: "propertyImage" }]),
  async (req, res) => {
    try {
      const { tenantName, startDate, endDate, propertyAddress } = req.body;

      if (!tenantName || !startDate || !endDate || !propertyAddress) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const agreement = req.files["agreement"]
        ? req.files["agreement"][0].buffer.toString("base64")
        : null;
      const propertyImage = req.files["propertyImage"]
        ? req.files["propertyImage"][0].buffer.toString("base64")
        : null;

      const lease = new Lease({ tenantName, startDate, endDate, propertyAddress, agreement, propertyImage });
      await lease.save();

      res.status(201).json({ message: "Lease added successfully", lease });
    } catch (error) {
      console.error("❌ Lease Addition Error:", error);
      res.status(500).json({ error: "Error adding lease" });
    }
  }
);

// 📄 Fetch All Leases
app.get("/getleases", async (req, res) => {
  try {
    const leases = await Lease.find();
    res.json(leases);
  } catch (error) {
    console.error("❌ Lease Fetch Error:", error);
    res.status(500).json({ error: "Error fetching leases" });
  }
});


// 🚀 Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
