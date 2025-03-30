import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3003/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();
      const user = users.find((user: any) => user.email === email && user.password === password);

      if (user) {
        auth.login(email, password); 
        navigate("/home");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account? 
          <a href="/signup" className="text-blue-600 hover:underline"> Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
