import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeaderUser } from "./HeaderUser";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("https://reqres.in/api/users/4")
      .then(response => setUser(response.data.data))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div>
      <HeaderUser />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
          />
          <h2 className="text-2xl font-semibold mt-6">{user.first_name} {user.last_name}</h2>
          <p className="text-lg text-gray-600 mt-2">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
