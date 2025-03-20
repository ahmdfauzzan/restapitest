import React, { useState } from "react";
import { Link } from "react-router-dom";
import foto from "../assets/Bg.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { useRegister } from "../services/registerUser";
import { FaLock, FaUser } from "react-icons/fa";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerMutate = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutate.mutate({ fullName, email, password });
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Bagian kiri (gambar) */}
      <div className="hidden md:flex w-full md:w-3/5 h-full bg-gradient-to-b from-slate-900 via-primary to-slate-900">
        <img
          src={foto}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bagian kanan (form login) */}
      <div className="w-full h-full md:w-2/5 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className="text-center md:text-left text-2xl font-bold text-gray-800 mb-1 ">
            Hello!
          </h2>
          <h2 className="text-center md:text-left text-xl text-gray-800 mb-6">
            Sign Up to Get Started
          </h2>

          {/* Form Login */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col items-center"
          >
            <div className="mb-4 relative w-full">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg h-14"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            {/* Input Email */}
            <div className="mb-4 relative w-full">
              <MdOutlineMailOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg h-14"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Input Password */}
            <div className="mb-4 relative w-full">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                className="w-full pl-12 pr-4 py-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg h-14"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Tombol Submit */}
            <div className="mb-4 w-full">
              <input
                type="submit"
                value="Login"
                className="w-full bg-blue-500 text-white py-3 text-lg rounded-full hover:bg-blue-600 transition h-14 cursor-pointer"
              />
            </div>
            <p className="w-3/4 text-center text-red-500 mt-2"></p>

            <p className="w-3/4 text-center text-sm mt-4">
              Sudah punya akun?
              <Link to="/" className="text-blue-500 hover:underline">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
