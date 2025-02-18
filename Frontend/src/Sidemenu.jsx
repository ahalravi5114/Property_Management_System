import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaHome, FaBell, FaUsers, FaFileContract, FaWrench, FaSignOutAlt } from "react-icons/fa";

const Sidemenu = () => {
  const [profile, setProfile] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://hackathon-8k3r.onrender.com/getprofile/${userId}`);
        if (response.ok) {
          const result = await response.json();
          setProfile(result.data);
        }
      } catch (error) {
        console.log("An error occurred", error);
      }
    };
    fetchProfile();
  }, [userId]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-4 left-4 z-30 text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      
      {/* Sidebar */}
      <div className={`bg-[#1E293B] w-[250px] h-screen p-5 fixed z-20 transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:flex flex-col space-y-7 pt-10 shadow-xl`}>
        {/* Profile Section */}
        <div className="flex flex-col items-center text-white">
          <div className="w-24 h-24 border-2 border-[#38BDF8] rounded-full overflow-hidden">
            <img
              src={profile?.image || "https://ik.imagekit.io/mino2112/css%20driving%20skl/woman.png"}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="mt-2 font-semibold text-lg">{profile?.name || "User"}</h2>
          <span className="text-sm text-gray-400">{role === "staff" ? "Property Manager" : "Tenant"}</span>
        </div>

        {/* Menu Items */}
        <nav className="text-white w-full space-y-4">
          <Link to="/dashboard" className="flex items-center p-3 hover:bg-[#38BDF8] rounded-md">
            <FaHome className="mr-3" /> Dashboard
          </Link>
          {role === "staff" && (
            <Link to="/staff/tenants" className="flex items-center p-3 hover:bg-[#38BDF8] rounded-md">
              <FaUsers className="mr-3" /> Manage Tenants
            </Link>
          )}
          <Link to="/dashboard/notifications" className="flex items-center p-3 hover:bg-[#38BDF8] rounded-md">
            <FaBell className="mr-3" /> Notifications
          </Link>
          <Link to="/dashboard/maintenance" className="flex items-center p-3 hover:bg-[#38BDF8] rounded-md">
            <FaWrench className="mr-3" /> Maintenance Requests
          </Link>
          <Link to="/dashboard/leases" className="flex items-center p-3 hover:bg-[#38BDF8] rounded-md">
            <FaFileContract className="mr-3" /> Lease Agreements
          </Link>
          <hr className="border-gray-600" />
          <Link to="/" className="flex items-center p-3 text-red-400 hover:bg-red-500 hover:text-white rounded-md">
            <FaSignOutAlt className="mr-3" /> Logout
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidemenu;
