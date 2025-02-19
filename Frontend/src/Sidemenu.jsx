import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaBell, FaUsers, FaFileContract, FaWrench, FaSignOutAlt } from "react-icons/fa";

const Sidemenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const role = localStorage.getItem("role");

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-4 left-4 z-30 text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={30} className="text-[#FFD700]" /> : <FaBars size={30} className="text-[#FFD700]" />}
      </div>
      
      {/* Sidebar */}
      <div className={`bg-[#A8D5BA] w-[260px] h-screen p-6 fixed z-20 transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex flex-col space-y-7 pt-10 shadow-2xl border-r-4 border-[#FFD700]`}>
        
        {/* Menu Items */}
        <nav className="text-[#FAF9F6] w-full space-y-4">
          <Link to="/dashboard" className="flex items-center p-3 hover:bg-[#FAD6A5] rounded-md transition-all duration-300">
            <FaHome className="mr-3 text-[#FFD700]" size={45} /> Dashboard
          </Link>
          {role === "staff" && (
            <Link to="/staff/tenants" className="flex items-center p-3 hover:bg-[#FAD6A5] rounded-md transition-all duration-300">
              <FaUsers className="mr-3 text-[#FFD700]" size={45} /> Manage Tenants
            </Link>
          )}
          <Link to="/dashboard/notifications" className="flex items-center p-3 hover:bg-[#FAD6A5] rounded-md transition-all duration-300">
            <FaBell className="mr-3 text-[#FFD700]" size={45} /> Notifications
          </Link>
          <Link to="/dashboard/maintenance" className="flex items-center p-3 hover:bg-[#FAD6A5] rounded-md transition-all duration-300">
            <FaWrench className="mr-3 text-[#FFD700]" size={45} /> Maintenance Requests
          </Link>
          <Link to="/dashboard/leases" className="flex items-center p-3 hover:bg-[#FAD6A5] rounded-md transition-all duration-300">
            <FaFileContract className="mr-3 text-[#FFD700]" size={45} /> Lease Agreements
          </Link>
          <hr className="border-[#FFD700]" />
          <Link to="/" className="flex items-center p-3 text-white bg-[#2E8B57] hover:bg-[#A8D5BA] rounded-md transition-all duration-300">
            <FaSignOutAlt className="mr-3 text-white" size={45} /> Logout
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidemenu;
