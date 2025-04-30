import { useState } from 'react';
import { FaSearch, FaUser,FaEdit, FaTrash} from 'react-icons/fa';

const initialTenants = [
  { id: 1, name: "Alice Howard", email: "howard@mail.com", contact: "7775552214", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_female.jfif?updatedAt=1742465364791", property: "Apartment 101", rentPaid: true },
  { id: 2, name: "Cynthia N. Moore", email: "moore@mail.com", contact: "7896547855", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_female.jfif?updatedAt=1742465364791", property: "Apartment 102", rentPaid: false },
  { id: 3, name: "David Johnson", email: "davidj@mail.com", contact: "9856321470", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_make.jfif?updatedAt=1742465364781", property: "Apartment 103", rentPaid: true },
  { id: 4, name: "Emma Williams", email: "emmaw@mail.com", contact: "9638527410", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_female.jfif?updatedAt=1742465364791", property: "Apartment 104", rentPaid: false },
  { id: 5, name: "Michael Brown", email: "michaelb@mail.com", contact: "8527413698", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_make.jfif?updatedAt=1742465364781", property: "Apartment 105", rentPaid: true },
  { id: 6, name: "Sophia Martinez", email: "sophiam@mail.com", contact: "7412589630", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_female.jfif?updatedAt=1742465364791", property: "Apartment 106", rentPaid: false },
  { id: 7, name: "James Anderson", email: "jamesa@mail.com", contact: "7896541230", image: "https://ik.imagekit.io/varsh0506/Beauroi/profile_make.jfif?updatedAt=1742465364781", property: "Apartment 107", rentPaid: true },
];

const TenantList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tenants, setTenants] = useState(initialTenants);
  const [newTenant, setNewTenant] = useState({ name: '', email: '', contact: '', property: '', rentPaid: false });

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.contact.includes(searchTerm)
  );

  const addTenant = () => {
    if (newTenant.name && newTenant.email) {
      setTenants([...tenants, { ...newTenant, id: tenants.length + 1 }]);
      setNewTenant({ name: '', email: '', contact: '', property: '', rentPaid: false });
    }
  };

  const deleteTenant = (id) => {
    setTenants(tenants.filter(tenant => tenant.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen ml-[30px]">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FaUser className="mr-2 text-blue-500" />
          Tenant List
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

        {/* Add Tenant Form
        <div className="mb-6 flex gap-4">
          <input type="text" placeholder="Name" value={newTenant.name} onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })} className="border p-2 rounded w-full" />
          <input type="email" placeholder="Email" value={newTenant.email} onChange={(e) => setNewTenant({ ...newTenant, email: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" placeholder="Contact" value={newTenant.contact} onChange={(e) => setNewTenant({ ...newTenant, contact: e.target.value })} className="border p-2 rounded w-full" />
          <input type="text" placeholder="Property" value={newTenant.property} onChange={(e) => setNewTenant({ ...newTenant, property: e.target.value })} className="border p-2 rounded w-full" />
          <button onClick={addTenant} className="bg-green-500 text-white px-4 py-2 rounded"><FaPlus /></button>
        </div> */}

        {/* Tenant Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-6 py-3 border border-gray-300">#</th>
                <th className="px-6 py-3 border border-gray-300">Name</th>
                <th className="px-6 py-3 border border-gray-300">Email</th>
                <th className="px-6 py-3 border border-gray-300">Contact</th>
                <th className="px-6 py-3 border border-gray-300">Image</th>
                <th className="px-6 py-3 border border-gray-300">Property</th>
                <th className="px-6 py-3 border border-gray-300">Rent Status</th>
                <th className="px-6 py-3 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant, index) => (
                <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 border border-gray-300">{index + 1}</td>
                  <td className="px-6 py-4 border border-gray-300">{tenant.name}</td>
                  <td className="px-6 py-4 border border-gray-300">{tenant.email}</td>
                  <td className="px-6 py-4 border border-gray-300">{tenant.contact}</td>
                  <td className="px-6 py-4 border border-gray-300">
                    <img src={tenant.image} alt={tenant.name} className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="px-6 py-4 border border-gray-300">{tenant.property}</td>
                  <td className="px-6 py-4 border border-gray-300">
                    <span className={tenant.rentPaid ? "text-green-500" : "text-red-500"}>{tenant.rentPaid ? "Paid" : "Pending"}</span>
                  </td>
                  <td className="px-6 py-4 border border-gray-300 flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                    <button onClick={() => deleteTenant(tenant.id)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
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

export default TenantList;