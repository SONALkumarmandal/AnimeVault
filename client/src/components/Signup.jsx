import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://server-zeta-rosy-13.vercel.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const msg = await response.json();

      if (msg.msg === "registration successfull") {
        navigate("/");
        alert("Sign-up successful!");
      } else {
        alert(msg || "Sign-up failed!");
      }
    } catch (error) {
      alert("Error: Unable to connect to the server.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black-900 w-full">
      <div className="w-full max-w-lg p-8 space-y-6 bg-zinc-800 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-white">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Enter your user ID"
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <button
            type="submit" onClick={handleSignUp}
            className="w-full px-4 py-2 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to={"/"} className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
