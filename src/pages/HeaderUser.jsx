import React, { useEffect, useState } from "react";
import { FiChevronDown, FiLogIn } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export const HeaderUser = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["Token"]);

  const token = cookies.token;

  useEffect(() => {
    if (!token) {
      toast.error("Anda belum Login", {
        position: "top-center",
      });
      navigate("/"); // Redirect jika tidak ada token
    } else {
      axios
        .get("https://reqres.in/api/users/2", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data.data))
        .catch(() => {
          removeCookie("Token"); // Hapus token jika tidak valid
          navigate("/"); // Redirect kembali
        });
    }
  }, [token, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    window.location.href = "/";
  };

  return (
    <div className="bg-blue-600 px-6 py-3 flex justify-end items-center">
      {user ? (
        <div className="relative">
          <div
            className="flex items-center cursor-pointer text-white"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 text-white">
              {user.first_name} {user.last_name}
            </span>
            <FiChevronDown className="ml-1" />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md">
              <div className="px-4 py-2 text-sm text-gray-600">
                {user.email}
              </div>
              <Link to="/profil" className="block px-4 py-2 hover:bg-gray-100">
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="flex items-center gap-2 text-white">
          <FiLogIn /> <span>Masuk</span>
        </Link>
      )}
    </div>
  );
};
