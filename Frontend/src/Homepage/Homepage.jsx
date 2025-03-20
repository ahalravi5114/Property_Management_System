import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full">
      {/* ✅ Navigation Bar */}
      <nav className="fixed top-0 w-full bg-blue-800 text-white flex justify-between items-center px-6 py-4 z-50">
        <div className="text-2xl font-bold">Property Management System</div>
        <div className="flex gap-6">
          <a href="#about" className="hover:opacity-80">About Us</a>
          <a href="#contact" className="hover:opacity-80">Contact</a>
          <button className="bg-white text-blue-800 px-4 py-2 rounded hover:opacity-80" >Login</button>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:opacity-80" onClick={() => navigate("/signin")}>Sign Up</button>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <div className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: "url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 max-w-xl text-center">
          <h1 className="text-4xl font-bold mb-4">Effortless Property Management</h1>
          <p className="text-lg mb-6">Manage your properties, tenants, and payments seamlessly with our modern solution. Stay organized and maximize your rental income with ease.</p>
          <button
            className="bg-yellow-400 text-black px-6 py-3 rounded text-lg hover:opacity-80"
            onClick={() => navigate("/maintenanceManagement")}
          >
            Explore More
          </button>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="bg-gray-100 text-center py-16 px-4 w-full">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Efficiently Manage Your Properties</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <FiHome className="text-blue-500 text-5xl mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Property Management</h2>
            <p>Manage all your properties in one place, including details, photos, and amenities.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <FiUsers className="text-green-500 text-5xl mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Tenant Management</h2>
            <p>Handle tenant onboarding, profiles, lease agreements, and communication.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <FiDollarSign className="text-yellow-500 text-5xl mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Payments & Billing</h2>
            <p>Automate rent collection, track expenses, and generate invoices effortlessly.</p>
          </div>
        </div>

        <div className="mt-12">
          {!user ? (
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-80">Get Started</button>
          ) : (
            <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:opacity-80">Go to Dashboard</button>
          )}
        </div>
      </div>

      {/* ✅ Footer */}
      <footer className="w-full bg-gray-800 text-white text-center py-4">
        &copy; 2025 Property Management System. All Rights Reserved.
      </footer>
    </div>
  );
}
