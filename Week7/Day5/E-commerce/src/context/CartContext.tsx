import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { AuthContext } from "./AuthContext"; // 🔹 Import AuthContext

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const auth = useContext(AuthContext); 

  useEffect(() => {
    if (!auth?.user) return; // Only load cart if user is logged in
  
    const fetchCart = async () => {
      try {
        console.log("Fetching cart for:", auth?.user?.id);
        const response = await fetch(`http://localhost:3003/users/${auth?.user?.id}`);
        if (!response.ok) throw new Error("Failed to fetch cart");
  
        const data = await response.json();
        console.log("Fetched cart data:", data.cart);
  
        setCart(data.cart || []); // ✅ Update state with fetched cart
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };
  
    fetchCart();
  }, [auth?.user]); 

  const addToCart = async (item: CartItem) => {
    if (!auth?.user) {
      console.error("User not logged in!");
      return;
    }
  
    try {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);
      let updatedCart;
  
      if (existingItem) {
        updatedCart = cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        updatedCart = [...cart, { ...item, quantity: 1 }];
      }
  
      const response = await fetch(`http://localhost:3003/users/${auth.user.id}`, {
        method: "PATCH", // ✅ Ensures cart is saved in the backend
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: updatedCart }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
  
      setCart(updatedCart); // ✅ Updates cart state after saving
      console.log("Cart updated successfully:", updatedCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
