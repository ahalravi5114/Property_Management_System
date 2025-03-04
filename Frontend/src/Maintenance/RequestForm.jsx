/*import React from "react";
import { useForm } from "react-hook-form";

const RequestForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    alert("Request Submitted Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">Like Request Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          
          <div>
            <label className="block text-sm font-medium">Request Type</label>
            <select {...register("requestType", { required: "Please select a request type" })}
              className="w-full p-2 border rounded">
              <option value="">Select...</option>
              <option value="like">Like</option>
              <option value="comment">Comment</option>
              <option value="share">Share</option>
            </select>
            {errors.requestType && <p className="text-red-500 text-sm">{errors.requestType.message}</p>}
          </div>

         
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register("compliance", { required: "You must agree to the compliance terms" })} />
              <span className="text-sm">I agree to the compliance terms</span>
            </label>
            {errors.compliance && <p className="text-red-500 text-sm">{errors.compliance.message}</p>}
          </div>

         
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;*/
/*import React from "react";
import { useForm } from "react-hook-form";

const RequestForm = () => {
  console.log("✅ RequestForm component is rendering..."); // Debug message

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    alert("Request Submitted Successfully!");
  };

  return (
    <div>
      <h1>Request Form Page</h1> 
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold text-center mb-4">Like Request Form</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;*/
import React from "react";

const RequestForm = () => {
  console.log("✅ RequestForm component is rendering..."); // Debugging
  
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "20px",
        border: "2px solid red", // Force visibility
        minHeight: "200px", // Ensure it takes space
      }}
    >
      <h1>Request Form Page</h1>
      <p>This is a test paragraph.</p>
    </div>
  );
};

export default RequestForm;



