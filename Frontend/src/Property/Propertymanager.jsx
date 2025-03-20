import React, { useState, useRef } from "react";

const PropertyManager = ({ properties, setProperties }) => {
  const [property, setProperty] = useState({
    name: "",
    location: "",
    type: "",
    size: "",
    amenities: "",
    price: "",
    image: null,
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProperty({ ...property, image: e.target.files[0] });
    } else {
      setProperty({ ...property, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (!property.name || !property.location || !property.type) {
      alert("Please fill in required fields.");
      return;
    }

    const updatedProperty = {
      ...property,
      image: property.image instanceof File ? URL.createObjectURL(property.image) : property.image,
    };

    if (editingIndex !== null) {
      const updatedProperties = properties.map((prop, index) =>
        index === editingIndex ? updatedProperty : prop
      );
      setProperties(updatedProperties);
      setEditingIndex(null);
    } else {
      setProperties([...properties, updatedProperty]);
    }

    // Reset form
    setProperty({ name: "", location: "", type: "", size: "", amenities: "", price: "", image: null });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (index) => {
    setProperty({ ...properties[index] });
    setEditingIndex(index);

    // Smoothly scroll to the top to show the entire form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 w-full ml-[250px] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-10">Property Management</h1>

      {/* Property Input Form */}
      <div className="bg-white w-full max-w-3xl mx-auto p-5 rounded-lg shadow-md">
        <input className="w-full p-2 border rounded mb-2" type="text" name="name" placeholder="Property Name" value={property.name} onChange={handleChange} />
        <input className="w-full p-2 border rounded mb-2" type="text" name="location" placeholder="Location" value={property.location} onChange={handleChange} />
        <select className="w-full p-2 border rounded mb-2" name="type" value={property.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Office">Office</option>
        </select>
        <input className="w-full p-2 border rounded mb-2" type="text" name="size" placeholder="Size (sq ft)" value={property.size} onChange={handleChange} />
        <input className="w-full p-2 border rounded mb-2" type="text" name="amenities" placeholder="Amenities (comma separated)" value={property.amenities} onChange={handleChange} />
        <input className="w-full p-2 border rounded mb-2" type="file" name="image" ref={fileInputRef} onChange={handleChange} />
        <input className="w-full p-2 border rounded mb-2" type="number" name="price" placeholder="Price ($)" value={property.price} onChange={handleChange} min="0" />

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition" onClick={handleSave}>
          {editingIndex !== null ? "Update Property" : "Add Property"}
        </button>
      </div>

      {/* Property Display Section */}
      <div className="w-full max-w-3xl mx-auto mt-6 flex flex-col items-center">
        {properties.map((prop, index) => (
          <div key={index} className="bg-white w-full p-4 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105 hover:shadow-lg">
            {prop.image && <img src={prop.image} alt={prop.type} className="w-full h-48 object-cover rounded mb-3" />}
            <h2 className="text-lg font-bold">{prop.name}</h2>
            <p><strong>Location:</strong> {prop.location}</p>
            <p><strong>Type:</strong> {prop.type}</p>
            <p><strong>Size:</strong> {prop.size} sq ft</p>
            <p><strong>Amenities:</strong> {prop.amenities}</p>
            <p><strong>Price:</strong> ${prop.price}</p>

            <div className="mt-3 flex space-x-2">
              <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition" onClick={() => handleEdit(index)}>Edit</button>
              <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyManager;
