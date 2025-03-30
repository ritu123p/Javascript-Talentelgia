import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-lg font-bold">MyApp</h1>
      {user ? (
        <div>
          <span>Welcome, {user}</span>
          <button onClick={logout} className="ml-4 px-3 py-1 bg-red-500 rounded">
            Logout
          </button>
        </div>
      ) : (
        <span>Please login</span>
      )}
    </nav>
  );
};

export default Navbar;
