import React from "react";
import { useAuth } from "../context/AuthContext";

const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">Home Page</h2>
      {user ? <p>Welcome, {user}!</p> : <p>Please log in.</p>}
    </div>
  );
};

export default Home;
