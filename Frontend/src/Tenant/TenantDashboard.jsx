import { CreditCard, Bell, Calendar, Home, Wrench, UserMinus } from 'lucide-react';

const TenantDashboard = () => {
  // Sample data (replace with dynamic data from your backend)
  const tenantData = {
    rentDue: 'April 1, 2025',
    rentAmount: '$1,200',
    rentStatus: 'Pending',
    leaseEnd: 'December 31, 2025',
    notifications: [
      { id: 1, message: 'Rent due in 5 days', unread: true },
      { id: 2, message: 'Maintenance scheduled for March 28', unread: false },
    ],
  };

  const quickLinks = [
    { name: 'Pay Rent', icon: <CreditCard size={20} />, path: '/tenant/payments' },
    { name: 'Maintenance', icon: <Wrench size={20} />, path: '/tenant/maintenance' },
    { name: 'Offboarding', icon: <UserMinus size={20} />, path: '/tenant/offboarding' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 ml-64 w-[100%]"> {/* Offset for sidebar */}
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Welcome, Tenant!</h1>
        <p className="text-blue-700">Your Dashboard</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rent Overview Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-blue-900">Rent Overview</h2>
            <CreditCard size={24} className="text-blue-600" />
          </div>
          <p className="mt-2 text-blue-700">Due Date: {tenantData.rentDue}</p>
          <p className="text-blue-700">Amount: {tenantData.rentAmount}</p>
          <p
            className={`mt-2 font-medium ${
              tenantData.rentStatus === 'Pending' ? 'text-yellow-600' : 'text-green-600'
            }`}
          >
            Status: {tenantData.rentStatus}
          </p>
          <a
            href="/tenant/payments"
            className="mt-4 inline-block text-blue-500 hover:text-blue-700 underline"
          >
            Pay Now
          </a>
        </div>

        {/* Lease Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-blue-900">Lease Info</h2>
            <Calendar size={24} className="text-blue-600" />
          </div>
          <p className="mt-2 text-blue-700">End Date: {tenantData.leaseEnd}</p>
          <p className="text-blue-700">Property: 123 Blue St, Unit 4</p>
          <a
            href="/tenant/profile"
            className="mt-4 inline-block text-blue-500 hover:text-blue-700 underline"
          >
            View Details
          </a>
        </div>

        {/* Quick Links Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-blue-900">Quick Links</h2>
            <Home size={24} className="text-blue-600" />
          </div>
          <ul className="mt-2">
            {quickLinks.map((link) => (
              <li key={link.name} className="flex items-center py-2">
                <span className="text-blue-600 mr-2">{link.icon}</span>
                <a
                  href={link.path}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue-900">Notifications</h2>
          <Bell size={24} className="text-blue-600" />
        </div>
        <ul className="mt-4 space-y-2">
          {tenantData.notifications.length > 0 ? (
            tenantData.notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-2 rounded-md ${
                  notification.unread ? 'bg-blue-50 text-blue-900' : 'text-blue-700'
                }`}
              >
                {notification.message}
              </li>
            ))
          ) : (
            <p className="text-blue-700">No new notifications</p>
          )}
        </ul>
        <a
          href="/tenant/notifications"
          className="mt-4 inline-block text-blue-500 hover:text-blue-700 underline"
        >
          View All
        </a>
      </div>
    </div>
  );
};

export default TenantDashboard;