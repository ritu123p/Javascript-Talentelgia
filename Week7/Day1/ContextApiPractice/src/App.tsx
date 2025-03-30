import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Login />
      <Home />
    </AuthProvider>
  );
};

export default App;
