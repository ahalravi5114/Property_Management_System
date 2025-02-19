import React, { useState } from "react";
import apartmentImg from "./apartment.jpg";
import villaImg from "./villa.jpg";
import officeImg from "./office.jpg";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState({
    name: "",
    location: "",
    type: "",
    size: "",
    amenities: "",
    price: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!property.name || !property.location || !property.type) {
      alert("Please fill in required fields.");
      return;
    }

    const updatedProperty = {
      ...property,
      image:
        property.type === "Apartment"
          ? apartmentImg
          : property.type === "Villa"
          ? villaImg
          : officeImg,
    };

    if (editingIndex !== null) {
      const updatedProperties = [...properties];
      updatedProperties[editingIndex] = updatedProperty;
      setProperties(updatedProperties);
      setEditingIndex(null);
    } else {
      setProperties([...properties, updatedProperty]);
    }

    setProperty({ name: "", location: "", type: "", size: "", amenities: "", price: "" });
  };

  const deleteProperty = (index) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  const editProperty = (index) => {
    setProperty(properties[index]);
    setEditingIndex(index);
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
        
        {/* Price Field (Only Numbers Allowed) */}
        <input 
          className="w-full p-2 border rounded mb-2" 
          type="number" 
          name="price" 
          placeholder="Price ($)" 
          value={property.price} 
          onChange={handleChange} 
          min="0"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition" onClick={handleSave}>
          {editingIndex !== null ? "Update Property" : "Add Property"}
        </button>
      </div>

      {/* Property Display Section */}
      <div className="w-full max-w-3xl mx-auto mt-6 flex flex-col items-center">
        {properties.map((prop, index) => (
          <div key={index} className="bg-white w-full p-4 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105 hover:shadow-lg">
            <img src={prop.image} alt={prop.type} className="w-full h-48 object-cover rounded mb-3" />
            <h2 className="text-lg font-bold">{prop.name}</h2>
            <p><strong>Location:</strong> {prop.location}</p>
            <p><strong>Type:</strong> {prop.type}</p>
            <p><strong>Size:</strong> {prop.size} sq ft</p>
            <p><strong>Amenities:</strong> {prop.amenities}</p>
            <p><strong>Price:</strong> ${prop.price}</p>

            <div className="mt-3 flex space-x-2">
              <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition" onClick={() => editProperty(index)}>Edit</button>
              <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition" onClick={() => deleteProperty(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
