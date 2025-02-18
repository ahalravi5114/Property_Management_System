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
        {menuOpen ? <FaTimes size={30} className="text-[#008080]" /> : <FaBars size={30} className="text-[#008080]" />}
      </div>
      
      {/* Sidebar */}
      <div className={`bg-[#003366] w-[260px] h-screen p-6 fixed z-20 transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex flex-col space-y-7 pt-10 shadow-2xl border-r-4 border-[#D4AF37]`}>
        
        {/* Menu Items */}
        <nav className="text-[#F5F5F5] w-full space-y-4">
          <Link to="/dashboard" className="flex items-center p-3 hover:bg-[#008080] rounded-md transition-all duration-300">
            <FaHome className="mr-3 text-[#00FFFF]" /> Dashboard
          </Link>
          {role === "staff" && (
            <Link to="/staff/tenants" className="flex items-center p-3 hover:bg-[#008080] rounded-md transition-all duration-300">
              <FaUsers className="mr-3 text-[#00FFFF]" size={30} /> Manage Tenants
            </Link>
          )}
          <Link to="/dashboard/notifications" className="flex items-center p-3 hover:bg-[#008080] rounded-md transition-all duration-300">
            <FaBell className="mr-3 text-[#00FFFF]" size={30}/> Notifications
          </Link>
          <Link to="/dashboard/maintenance" className="flex items-center p-3 hover:bg-[#008080] rounded-md transition-all duration-300">
            <FaWrench className="mr-3 text-[#00FFFF]" size={30}/> Maintenance Requests
          </Link>
          <Link to="/dashboard/leases" className="flex items-center p-3 hover:bg-[#008080] rounded-md transition-all duration-300">
            <FaFileContract className="mr-3 text-[#00FFFF]" size={30}/> Lease Agreements
          </Link>
          <hr className="border-[#D4AF37]" />
          <Link to="/" className="flex items-center p-3 text-white bg-[#8b2e2e] hover:bg-[#008080] rounded-md transition-all duration-300">
            <FaSignOutAlt className="mr-3 text-white" size={30} /> Logout
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidemenu;
