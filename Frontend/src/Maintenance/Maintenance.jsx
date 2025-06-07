import { useEffect, useState } from "react";

const Maintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);

  const fetchMaintenanceData = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-maintenance");
      if (!response.ok) throw new Error("Failed to fetch maintenance data");
      const data = await response.json();
      setMaintenanceData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchMaintenanceData();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-4xl font-bold mb-8 text-center text-black">
        Maintenance Requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {maintenanceData.length === 0 ? (
          <p className="text-black">No maintenance requests found.</p>
        ) : (
          maintenanceData.map((item) => (
            <div
              key={item._id}
              className="p-6 border border-gray-300 rounded-lg shadow-md"
            >
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Problem:</strong> {item.problem}
              </p>
              <p>
                <strong>Phone:</strong> {item.phone}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Request Type:</strong> {item.requestType}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Maintenance;
