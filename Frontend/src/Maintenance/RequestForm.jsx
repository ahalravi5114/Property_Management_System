import { useState } from 'react';

const RequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    problem: '',
    phone: '',
    email: '',
    requestType: 'Property',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', location: '', problem: '', phone: '', email: '', requestType: 'Property' });
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-900 to-orange-300 text-white shadow-lg flex justify-center items-center">
      <div className="max-w-lg w-full">
        <h2 className="text-4xl font-bold mb-8 text-center">Maintenance Request Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Problem</label>
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Request Type</label>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg text-black"
            >
              <option value="Property">Property</option>
              <option value="Lease">Lease</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
