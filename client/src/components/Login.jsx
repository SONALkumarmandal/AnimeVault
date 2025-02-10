import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState(""); // For error popup
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const [isLoggedIn,setisLoggedIn]=useState(false)
  const navigate = useNavigate();

  const loginAction = async (e) => {
    setisLoggedIn(true)
    e.preventDefault();
    try {
      const response = await fetch("https://anime-vaultback.vercel.app/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const msg = await response.json();
      // console.log(msg)
      if (msg.msg === "Login Successfull") {
        localStorage.setItem("token",msg.token)
        navigate("/home");
      } 
      
      else if(msg.msg==="Login first"){
        navigate("/");
      } 
      else {
        setPopupMessage("Invalid email or password. Please try again.");
        setShowPopup(true); // Show popup on error
      }
    } catch (error) {
      // console.error("error", error);
      setPopupMessage("Password should be more than 5 letters.");
      setShowPopup(true); // Show popup on error
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close popup
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-zinc-900 mt-4 sm:flex-col">
      <div className="w-full md:h-[65vh] max-w-md p-8 space-y-6 bg-zinc-800 rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-100">Login</h2>
        <form onSubmit={loginAction} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 mt-1 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-100 mt-6"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 mt-1 mb-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded shadow-lg text-center space-y-4">
            <p className="text-black">{popupMessage}</p>
            <button
              onClick={handleClosePopup}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
