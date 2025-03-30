import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext"; 

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  description?: string; 
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); 
  const cartContext = useContext(CartContext); 

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const addToCart = (product: Product) => {
    if (!cartContext) return;

    const existingItem = cartContext.cart.find((item) => item.id === product.id);

    const newCart = existingItem
      ? cartContext.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...cartContext.cart, { ...product, quantity: 1 }];

    cartContext.addToCart({ ...product, quantity: 1 });

    alert(`${product.title} added to cart!`);
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex justify-between items-center mb-4">
            {/* Cart Count */}
            <h2 className="text-lg font-semibold text-gray-800">
              Cart Items: {cartContext?.cart.reduce((total, item) => total + item.quantity, 0) || 0}
            </h2>

            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 p-2 border border-gray-300 rounded"
            />
          </div>

          {loading ? (
            <p className="text-center text-lg">Loading products...</p>
          ) : (
            <div className="flex flex-wrap -m-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a
                    className="block relative h-48 rounded overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProduct(product)} 
                  >
                    <img
                      alt={product.title}
                      className="object-cover object-center w-full h-full block"
                      src={product.thumbnail}
                    />
                  </a>
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
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 🔹 Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
              onClick={() => setSelectedProduct(null)}
            >
              ✖️
            </button>
            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-4">{selectedProduct.title}</h2>
            <p className="text-gray-500 text-sm">{selectedProduct.category.toUpperCase()}</p>
            <p className="text-gray-700 mt-2">{selectedProduct.description || "No description available."}</p>
            <p className="text-lg font-semibold mt-2">${selectedProduct.price.toFixed(2)}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => addToCart(selectedProduct)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-1/2"
              >
                Add to Cart
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-1/2"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
