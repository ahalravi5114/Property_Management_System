import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-1/5 bg-gray-800 text-white p-5 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">REAL ESTATE</h2>
      <ul>
        <li className="p-2 hover:bg-gray-700">
          <Link to="/user/dashboard">Dashboard</Link>
        </li>

        {/* Dropdown Menu for "All Users" */}
        <li
          className="p-2 hover:bg-gray-700 cursor-pointer relative"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          All Users ▼
          {isDropdownOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-gray-700 text-white shadow-lg rounded">
              <li className="p-2 hover:bg-gray-600">
                <Link to="/user/teanantlist">Tenant</Link>
              </li>
              <li className="p-2 hover:bg-gray-600">
                <Link to="/user/projectmanagerlist">Project Manager</Link>
              </li>
              <li className="p-2 hover:bg-gray-600">
                <Link to="/user/accountantlist">Accountant</Link>
              </li>
              <li className="p-2 hover:bg-gray-600">
                <Link to="/user/maintainencelist">Maintenance</Link>
              </li>
            </ul>
          )}
        </li>

        <li className="p-2 hover:bg-gray-700">State & City</li>
        <li className="p-2 hover:bg-gray-700">Property</li>
        <li className="p-2 hover:bg-gray-700">Contact, Feedback</li>
        <li className="p-2 hover:bg-gray-700">About Page</li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
