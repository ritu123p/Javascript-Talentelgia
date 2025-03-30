import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ShoppingCart, ChevronDown, User } from "lucide-react"; // 🛒 Import icons
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    if (auth?.logout) {
      auth.logout();
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log("Navbar - Auth User:", auth?.user);
  }, [auth?.user]);
  

  const cartCount = cartContext?.cart.reduce((total, item) => total + item.quantity, 0) || 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* 🏠 Home Link */}
        <Link to="/" className="text-white text-xl font-semibold hover:text-gray-200">
          Home
        </Link>

        <div className="flex space-x-6 items-center">
          {/* 🛒 Cart Icon with Item Count */}
          <Link to="/cart" className="relative text-white text-lg hover:text-gray-200 transition flex items-center">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          


          {/* 👤 User Profile / Auth Buttons */}
          {auth?.user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-white text-lg hover:text-gray-200 transition"
              >
                <User size={24} />
                <span className="ml-2">{auth.user.name.charAt(0).toUpperCase()}</span>
                <ChevronDown size={20} className="ml-1" />
              </button>

              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
                  <p className="px-4 py-2 text-gray-700 border-b">{auth.user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/signup" className="text-white hover:text-gray-200 transition">
                Signup
              </Link>
              <Link to="/login" className="text-white hover:text-gray-200 transition">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
