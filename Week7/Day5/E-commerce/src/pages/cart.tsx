import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext

const Cart: React.FC = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <p>Error: AuthContext not found.</p>;
  }

  const { user, cart, setCart } = auth; // Use global cart state
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!user) {
      console.error("User not logged in!");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3003/users/${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((userData) => {
        setCart(userData.cart || []);
        calculateTotal(userData.cart || []);
      })
      .catch((error) => console.error("Error fetching cart:", error))
      .finally(() => setLoading(false));
  }, [user, setCart]);

  const calculateTotal = (items: typeof cart) => {
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalAmount);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    calculateTotal(updatedCart);

    if (user) {
      fetch(`http://localhost:3003/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: updatedCart }),
      }).catch((error) => console.error("Error updating cart:", error));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {loading ? (
        <p>Loading cart...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg shadow-md">
                <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover rounded" />
                <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
                <p className="text-gray-700">${item.price.toFixed(2)} × {item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mt-6">Total: ${total.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;

