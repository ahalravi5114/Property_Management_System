import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Configure environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Get directory name for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
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

// Property Schema & Model
const PropertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    amenities: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true }
);
const Property = mongoose.model("Property", PropertySchema);

// Lease Schema & Model
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

// Configure Multer for property image uploads
const propertyStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads", "properties");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "property-" + uniqueSuffix + ext);
  },
});

const propertyUpload = multer({ storage: propertyStorage });

// Routes
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

    res
      .status(201)
      .json({ message: "Maintenance request submitted successfully" });
  } catch (error) {
    console.error("❌ Maintenance Error:", error);
    res.status(500).json({ error: "Maintenance submission failed" });
  }
});

// Property Routes
app.post("/api/properties", propertyUpload.single("image"), async (req, res) => {
  try {
    const { name, location, type, size, amenities, price } = req.body;

    const newProperty = new Property({
      name,
      location,
      type,
      size,
      amenities,
      price,
      image: req.file ? req.file.filename : null,
    });

    await newProperty.save();
    res
      .status(201)
      .json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    console.error("❌ Property Add Error:", error);
    res.status(500).json({ error: "Failed to add property" });
  }
});

app.put("/api/properties/:id", propertyUpload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, type, size, amenities, price } = req.body;

    const updateData = {
      name,
      location,
      type,
      size,
      amenities,
      price
    };

    // Only update image if a new one was uploaded
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json({ 
      message: "Property updated successfully", 
      property: {
        ...updatedProperty._doc,
        image: updatedProperty.image
          ? `${req.protocol}://${req.get("host")}/uploads/properties/${updatedProperty.image}`
          : null
      }
    });
  } catch (error) {
    console.error("❌ Property Update Error:", error);
    res.status(500).json({ error: "Failed to update property" });
  }
});

app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    const propertiesWithImages = properties.map((property) => ({
      ...property._doc,
      image: property.image
        ? `${req.protocol}://${req.get("host")}/uploads/properties/${property.image}`
        : null,
    }));
    res.json(propertiesWithImages);
  } catch (error) {
    console.error("❌ Property Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

app.delete("/api/properties/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("❌ Property Delete Error:", error);
    res.status(500).json({ error: "Failed to delete property" });
  }
});

// Lease Routes
app.post(
  "/leases",
  upload.fields([
    { name: "agreement", maxCount: 1 },
    { name: "propertyImage", maxCount: 1 },
  ]),
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

      const lease = new Lease({
        tenantName,
        startDate,
        endDate,
        propertyAddress,
        agreement,
        propertyImage,
      });
      await lease.save();

      res.status(201).json({ message: "Lease added successfully", lease });
    } catch (error) {
      console.error("❌ Lease Addition Error:", error);
      res.status(500).json({ error: "Error adding lease" });
    }
  }
);

app.get("/getleases", async (req, res) => {
  try {
    const leases = await Lease.find();
    res.json(leases);
  } catch (error) {
    console.error("❌ Lease Fetch Error:", error);
    res.status(500).json({ error: "Error fetching leases" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
// 🧾 Accountant List APIs

// Get All Accountants
app.get("/api/accountants", async (req, res) => {
  try {
    const accountants = await Accountant.find();
    res.json(accountants);
  } catch (err) {
    console.error("❌ Fetch Accountants Error:", err);
    res.status(500).json({ error: "Failed to fetch accountants" });
  }
});

// Add Accountant
app.post("/api/accountants", async (req, res) => {
  try {
    const { role, email, password } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await Accountant.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccountant = new Accountant({ role, email, password: hashedPassword });
    await newAccountant.save();

    res.status(201).json({ message: "Accountant added successfully", accountant: newAccountant });
  } catch (err) {
    console.error("❌ Add Accountant Error:", err);
    res.status(500).json({ error: "Failed to add accountant" });
  }
});

// Delete Accountant
app.delete("/api/accountants/:id", async (req, res) => {
  try {
    const deleted = await Accountant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Accountant not found" });
    res.json({ message: "Accountant deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Accountant Error:", err);
    res.status(500).json({ error: "Failed to delete accountant" });
  }
});

// Update Accountant (email or role)
app.put("/api/accountants/:id", async (req, res) => {
  try {
    const updateData = req.body;
    const updated = await Accountant.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: "Accountant not found" });
    res.json({ message: "Accountant updated", accountant: updated });
  } catch (err) {
    console.error("❌ Update Accountant Error:", err);
    res.status(500).json({ error: "Failed to update accountant" });
  }
});
