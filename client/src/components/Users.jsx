import { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    axios.get(`${API_URL}/api/v1/user/bulk?filter=${filter}`)
      .then(response => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-2xl text-center text-gray-800">Users</div>
      <div className="my-4 flex justify-center">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-1/2 px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-4">
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      <div className="flex items-center">
        <div className="rounded-full h-16 w-16 bg-slate-200 flex justify-center items-center mr-4">
          <div className="text-2xl text-gray-600 font-semibold">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <ButtonComponent
          onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
          label="Send Money"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        />
      </div>
    </div>
  );
}

export default Users;
