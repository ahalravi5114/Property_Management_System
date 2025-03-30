import { useState } from 'react';
import { FaSearch, FaUserTie, FaEnvelope, FaPhone, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const initialAccountants = [
  { id: 1, name: "John Doe", email: "john@mail.com", contact: "7775552214", image: "https://via.placeholder.com/40", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com", contact: "7896547855", image: "https://via.placeholder.com/40", status: "Inactive" },
  { id: 3, name: "Robert Johnson", email: "robert@mail.com", contact: "9856321470", image: "https://via.placeholder.com/40", status: "Active" }
  
];

const AccountantList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountants, setAccountants] = useState(initialAccountants);

  const filteredAccountants = accountants.filter(acc =>
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    acc.contact.includes(searchTerm)
  );

  const deleteAccountant = (id) => {
    setAccountants(accountants.filter(acc => acc.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-end"> {/* Aligned to the right */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-[80%] lg:w-[60%]">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FaUserTie className="mr-2 text-blue-500" />
          Accountant List
        </h2>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or contact"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Accountant Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-3 border border-gray-300">#</th>
                <th className="px-4 py-3 border border-gray-300">Name</th>
                <th className="px-4 py-3 border border-gray-300">Email</th>
                <th className="px-4 py-3 border border-gray-300">Contact</th>
                <th className="px-4 py-3 border border-gray-300">Image</th>
                <th className="px-4 py-3 border border-gray-300">Status</th>
                <th className="px-4 py-3 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccountants.map((acc, index) => (
                <tr key={acc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-3 border border-gray-300">{acc.name}</td>
                  <td className="px-4 py-3 border border-gray-300">{acc.email}</td>
                  <td className="px-4 py-3 border border-gray-300">{acc.contact}</td>
                  <td className="px-4 py-3 border border-gray-300">
                    <img src={acc.image} alt={acc.name} className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="px-4 py-3 border border-gray-300">
                    <span className={acc.status === "Active" ? "text-green-500" : "text-red-500"}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border border-gray-300 flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                    <button onClick={() => deleteAccountant(acc.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountantList;
