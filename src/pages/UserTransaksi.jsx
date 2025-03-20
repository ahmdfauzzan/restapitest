import React, { useEffect, useState } from "react";
import axios from "axios";
import { HeaderUser } from "./HeaderUser";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { Button, Label, Modal } from "flowbite-react";
import { FaSearch } from "react-icons/fa";

const UserTransaksi = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  // Fetch data dari ReqRes API
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => setUsers(response.data.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Filter data berdasarkan pencarian
  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hapus user (DELETE)
  const handleDelete = (id) => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Tampilkan pop-up edit user
  const handleEditClick = (user) => {
    setSelectedUser({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
    });
    setOpenModal(true);
  };

  // Simpan perubahan user (PUT)
  const handleUpdateUser = () => {
    if (selectedUser.name.trim() === "") return;

    axios
      .put(`https://reqres.in/api/users/${selectedUser.id}`, {
        name: selectedUser.name,
      })
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id
              ? {
                  ...user,
                  first_name: selectedUser.name.split(" ")[0],
                  last_name: selectedUser.name.split(" ")[1] || "",
                }
              : user
          )
        );
        setOpenModal(false);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <HeaderUser />

      <div className="bg-white flex flex-col max-w-5xl mx-auto my-10 p-6 rounded-lg shadow-md w-full ">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="w-full flex items-center">
            <input
              type="text"
              placeholder="Search Name"
              className="rounded-lg w-full px-4 py-2 border border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="px-3 text-gray-500">
            <FaSearch />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="text-sm w-full text-left">
            <thead className="bg-[#EBF3FC]">
              <tr>
                <th className="py-3 px-3">ID</th>
                <th className="py-3 px-3">Avatar</th>
                <th className="py-3 px-3">Nama</th>
                <th className="py-3 px-3">Email</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-3 px-3">{user.id}</td>
                  <td className="py-3 px-3">
                    <img
                      src={user.avatar}
                      alt={user.first_name}
                      width="40"
                      className="rounded-full"
                    />
                  </td>
                  <td className="py-3 px-3">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="py-3 px-3 font-bold">{user.email}</td>
                  <td className="py-3 px-3 flex gap-2">
                    <button
                      className="text-yellow-400"
                      title="Edit"
                      onClick={() => handleEditClick(user)}
                    >
                      <HiOutlinePencilAlt className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-400"
                      title="Hapus"
                      onClick={() => handleDelete(user.id)}
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-center text-xl font-medium text-gray-900">
              Change Name
            </h3>
            <div>
              <Label value="Your Name" className="mb-2 block" />
              <input
                type="text"
                value={selectedUser?.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex justify-between">
              <Button onClick={handleUpdateUser}>Save Change</Button>
              <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const App = () => {
  return <UserTransaksi />;
};

export default App;
