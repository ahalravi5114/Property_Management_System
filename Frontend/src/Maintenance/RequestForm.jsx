import React, { useState } from "react";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    requestType: "", // use camelCase to match backend
    description: "",
    contactNumber: "",
    location: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/maintenances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          requestType: formData.requestType,
          problem: formData.description, // maps to "problem" field in MongoDB
          phone: formData.contactNumber,
          location: formData.location,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Maintenance request submitted successfully!");
        setFormData({
          name: "",
          requestType: "",
          description: "",
          contactNumber: "",
          location: "",
          email: "",
        });
      } else {
        alert(data.error || "Failed to submit the form.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: Property Image */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100">
        <img
          src="https://i.pinimg.com/736x/f1/7f/64/f17f64af78deac801bb7d43e35731a33.jpg"
          alt="Property"
          className="w-auto max-w-full h-auto max-h-[500px] object-contain rounded-lg shadow-md"
        />
      </div>

      {/* Right: Form */}
      <div className="md:w-1/2 w-full bg-white p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Property Management System
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Request Type</label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select</option>
              <option value="Property">Property</option>
              <option value="Lease">Lease</option>
              <option value="Payment">Payment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;