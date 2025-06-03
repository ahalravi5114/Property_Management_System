/*import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";


const multer = require("multer");
const Property = require("./models/Property");

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

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



// Signup Route
app.post("/signup", async (req, res) => {
    try {
      const { role, email, password } = req.body;
      console.log("Received Data:", req.body); // ✅ Debug Request Data
  
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
      console.log("Received Maintenance Data:", req.body); // ✅ Log data
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

  app.get("/get-maintenance", async (req, res) => {
    try {
      const maintenanceData = await Maintenance.find({});
      res.status(200).json(maintenanceData);
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
      res.status(500).json({ error: "Failed to fetch maintenance data" });
    }
  });
  
  app.post("/api/properties", upload.single("image"), async (req, res) => {
    try {
      const { name, location, type, size, amenities, price } = req.body;
      const image = req.file ? `data:image/jpeg;base64,${req.file.buffer.toString("base64")}` : null;
  
      const newProperty = new Property({ name, location, type, size, amenities, price, image });
      await newProperty.save();
      res.status(201).json(newProperty);
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({ error: "Failed to add property" });
    }
  });
  app.get("/api/properties", async (req, res) => {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });
    
  

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Property Schema and Model
const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  amenities: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: false },
});
const Property = mongoose.model("Property", propertySchema);

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

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { role, email, password } = req.body;
    console.log("Received Data:", req.body);

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

// Maintenance Submission Route
app.post("/submit-maintenance", async (req, res) => {
  try {
    const { name, location, problem, phone, email, requestType } = req.body;
    console.log("Received Maintenance Data:", req.body);

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

// Get Maintenance Data Route
app.get("/get-maintenance", async (req, res) => {
  try {
    const maintenanceData = await Maintenance.find({});
    res.status(200).json(maintenanceData);
  } catch (error) {
    console.error("Error fetching maintenance data:", error);
    res.status(500).json({ error: "Failed to fetch maintenance data" });
  }
});

// Add Property Route
app.post("/api/properties", upload.single("image"), async (req, res) => {
  try {
    const { name, location, type, size, amenities, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newProperty = new Property({ name, location, type, size, amenities, price, image });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ error: "Failed to add property" });
  }
});

// Get Properties Route
app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
