import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number; // Optional for cart items
}

interface AuthContextType {
  user: User | null;
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (item: Product) => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  // 🔹 Load user & cart on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchCart(parsedUser.id); // Load cart from API
    }
  }, []);

  // 🔹 Fetch cart from API
  const fetchCart = async (userId: string) => {
    try {
      const res = await axios.get(`http://localhost:3003/users/${userId}`);
      if (res.data.cart) {
        setCart(res.data.cart);
        localStorage.setItem("cart", JSON.stringify(res.data.cart)); // Sync with localStorage
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // 🔹 Signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:3003/users", { name, email, password, cart: [] });
      return res.status === 201;
    } catch (error) {
      console.error("Signup Error:", error);
      return false;
    }
  };

  // 🔹 Login function
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.get(`http://localhost:3003/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        setUser(res.data[0]);
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        fetchCart(res.data[0].id); // Fetch user’s cart
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login Error:", error);
      return false;
    }
  };

  // 🔹 Logout function
  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    window.location.href = "/login";
  };

  // 🔹 Add to Cart & Save to API
  const addToCart = async (item: Product) => {
    if (!user) {
      console.error("User not logged in!");
      return;
    }

    const updatedCart = [...cart];
    const existingItem = updatedCart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    try {
      await axios.patch(`http://localhost:3003/users/${user.id}`, { cart: updatedCart });
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, cart, setCart, addToCart, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
