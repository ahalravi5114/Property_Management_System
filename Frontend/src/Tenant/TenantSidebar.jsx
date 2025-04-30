import {
    Home,
    User,
    CreditCard,
    Wrench,
    LogOut,
    Bell,
    UserMinus,
  } from 'lucide-react';
  
  const TenantSidebar = () => {
    // Sample active state (you can manage this with state or routing)
    const activeItem = 'Dashboard'; // Replace with dynamic logic if needed
  
    const menuItems = [
      { name: 'Dashboard', icon: <Home size={20} />, path: '/user/tenantDashboard' },
      { name: 'Profile', icon: <User size={20} />, path: '/user/tenantProfile' },
      { name: 'Payments', icon: <CreditCard size={20} />, path: '/user/payment' },
      {
        name: 'Maintenance',
        icon: <Wrench size={20} />,
        path: '/user/maintenance',
      },
      // {
      //   name: 'Offboarding',
      //   icon: <UserMinus size={20} />,
      //   path: '/user/tenantOffboarding',
      // },
      {
        name: 'Notifications',
        icon: <Bell size={20} />,
        path: '/tenant/notifications',
      },
      { name: 'Logout', icon: <LogOut size={20} />, path: '/signin' },
    ];
  
    return (
      <div className="fixed top-0 left-0 h-full w-64 bg-blue-900 text-white shadow-lg">
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-20 bg-blue-950">
          <h1 className="text-xl font-bold">Tenant Portal</h1>
        </div>
  
        {/* Menu Items */}
        <nav className="mt-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className={`flex items-center px-6 py-4 transition-colors duration-200 ${
                    activeItem === item.name
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };
  
  export default TenantSidebar;