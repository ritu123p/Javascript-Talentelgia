import React from "react";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
  description: string;
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Transparent Background Overlay */}
      <div 
        className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-md" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-96 relative z-10">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        >
          ✖
        </button>
        <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover rounded-md" />
        <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
        <p className="text-sm text-gray-500">{product.category.toUpperCase()}</p>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-lg font-bold mt-2">₹{product.price}</p>

        {/* 🛒 Buttons */}
        <div className="mt-4 flex justify-between">
          <button 
            onClick={() => onAddToCart(product)} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add to Cart
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
