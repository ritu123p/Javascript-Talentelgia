import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import ProductModal from "./ProductModal"; // Import the modal

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  description: string;
}

const Landing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    if (!auth?.user) {
      console.log("User not logged in. Redirecting to login...");
      navigate("/login");
      return;
    }
    cartContext?.addToCart({ ...product, quantity: 1 });
    console.log(`${product.title} added to cart!`);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {loading ? (
          <div className="text-center text-lg">Loading products...</div>
        ) : (
          <div className="flex flex-wrap -m-4">
            {products.map((product) => (
              <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <div
                  className="block relative h-48 rounded overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    alt={product.title}
                    className="object-cover object-center w-full h-full block"
                    src={product.thumbnail}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {product.category.toUpperCase()}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {product.title}
                  </h2>
                  <p className="mt-1">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </section>
  );
};

export default Landing;
