import React, { useState } from "react";

const MaintenanceManagement = () => {
    const [requests, setRequests] = useState([
        { id: 1, description: "Leaky faucet", assignedTo: "John Doe", status: "Pending" },
        { id: 2, description: "Broken AC", assignedTo: "Jane Smith", status: "In Progress" }
    ]);
    const [newRequest, setNewRequest] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [status, setStatus] = useState("Pending");

    const handleAddRequest = () => {
        if (newRequest.trim()) {
            const newReq = { 
                id: requests.length + 1, 
                description: newRequest, 
                assignedTo: assignedTo || "Not Assigned", 
                status: status 
            };
            setRequests([...requests, newReq]);
            setNewRequest("");
            setAssignedTo("");
            setStatus("Pending");
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setRequests(requests.map(request =>
            request.id === id ? { ...request, status: newStatus } : request
        ));
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 text-gray-900 p-6 ml-[250px] flex flex-col items-center">
            <header className="bg-blue-900 text-white p-4 shadow-md w-full fixed top-0 left-0 z-10 flex justify-center">
                <h2 className="text-xl font-semibold">Maintenance Team</h2>
            </header>
            
            <div className="mt-20 w-full max-w-6xl px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Maintenance Management</h2>
                
                <div className="bg-white p-6 shadow-md rounded-lg mb-6 flex flex-wrap gap-3 w-full">
                    <input 
                        type="text" 
                        value={newRequest} 
                        onChange={(e) => setNewRequest(e.target.value)} 
                        placeholder="Enter maintenance request" 
                        className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input 
                        type="text" 
                        value={assignedTo} 
                        onChange={(e) => setAssignedTo(e.target.value)} 
                        placeholder="Assign to" 
                        className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button 
                        onClick={handleAddRequest} 
                        className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold rounded-md hover:opacity-90"
                    >
                        Add
                    </button>
                </div>
                
                <ul className="w-full space-y-4">
                    {requests.map(request => (
                        <li key={request.id} className="bg-blue-900 text-white p-6 rounded-lg shadow-md">
                            <p><strong>Description:</strong> {request.description}</p>
                            <p><strong>Assigned To:</strong> {request.assignedTo}</p>
                            <p>
                                <strong>Status:</strong>
                                <select 
                                    className="ml-2 p-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    value={request.status} 
                                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MaintenanceManagement;
/*import React, { useState } from "react";

const MaintenanceManagement = () => {
    const [requests, setRequests] = useState([
        { id: 1, description: "Leaky faucet", assignedTo: "John Doe", status: "Pending" },
        { id: 2, description: "Broken AC", assignedTo: "Jane Smith", status: "In Progress" }
    ]);
    const [newRequest, setNewRequest] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [status, setStatus] = useState("Pending");

    const handleAddRequest = () => {
        if (newRequest.trim()) {
            const newReq = { 
                id: requests.length + 1, 
                description: newRequest, 
                assignedTo: assignedTo || "Not Assigned", 
                status: status 
            };
            setRequests([...requests, newReq]);
            setNewRequest("");
            setAssignedTo("");
            setStatus("Pending");
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setRequests(requests.map(request =>
            request.id === id ? { ...request, status: newStatus } : request
        ));
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 text-gray-900 p-6 flex flex-col items-center">
            <header className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6 shadow-lg w-full fixed top-0 left-0 z-10 flex justify-between px-12 items-center rounded-b-lg">
                <h2 className="text-3xl font-extrabold">Property Management System</h2>
                <nav className="space-x-8">
                    <a href="#about" className="text-white text-lg font-medium hover:text-gray-200">About Us</a>
                    <a href="#contact" className="text-white text-lg font-medium hover:text-gray-200">Contact</a>
                    <button className="bg-orange-500 px-5 py-3 rounded-lg text-white font-bold text-lg hover:bg-orange-600 transition">Login</button>
                </nav>
            </header>
            
            <div className="mt-28 w-full max-w-5xl px-6">
                <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-900">Effortless Maintenance Management</h2>
                
                <div className="bg-white p-6 shadow-lg rounded-xl mb-6 flex flex-wrap gap-4 w-full border border-gray-300">
                    <input 
                        type="text" 
                        value={newRequest} 
                        onChange={(e) => setNewRequest(e.target.value)} 
                        placeholder="Enter maintenance request" 
                        className="flex-1 p-4 border border-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="text" 
                        value={assignedTo} 
                        onChange={(e) => setAssignedTo(e.target.value)} 
                        placeholder="Assign to" 
                        className="flex-1 p-4 border border-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        className="p-4 border border-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button 
                        onClick={handleAddRequest} 
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold text-lg rounded-lg hover:opacity-90 transition"
                    >
                        Add Request
                    </button>
                </div>
                
                <ul className="w-full space-y-4">
                    {requests.map(request => (
                        <li key={request.id} className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                            <p className="text-lg font-bold text-gray-900"><strong>Description:</strong> {request.description}</p>
                            <p className="text-md text-gray-700"><strong>Assigned To:</strong> {request.assignedTo}</p>
                            <p className="text-md text-gray-700 flex items-center">
                                <strong>Status:</strong>
                                <select 
                                    className="ml-2 p-2 text-gray-900 border border-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={request.status} 
                                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MaintenanceManagement;*/
