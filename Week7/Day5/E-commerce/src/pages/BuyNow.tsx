import React, { useState } from "react";

const BuyNowForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
    payment: ""
  });

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value.trim()) {
      error = `${name} is required.`;
    } else if (name === "name" && !/^[A-Za-z ]{3,}$/.test(value)) {
      error = "Name must be at least 3 characters long.";
    } else if (name === "phone" && !/^\d{10}$/.test(value)) {
      error = "Phone number must be 10 digits.";
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors: typeof errors = { name: "", address: "", phone: "", payment: "" };
    
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) valid = false;
      newErrors[key as keyof typeof errors] = error;
    });
    
    setErrors(newErrors);
    if (valid) {
      alert("Order placed successfully!");
      setFormData({ name: "", address: "", phone: "", payment: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        {errors.name && <small className="text-red-500">{errors.name}</small>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        {errors.address && <small className="text-red-500">{errors.address}</small>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        {errors.phone && <small className="text-red-500">{errors.phone}</small>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Payment Method</label>
        <input
          type="text"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        {errors.payment && <small className="text-red-500">{errors.payment}</small>}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700"
      >
        Buy Now
      </button>
    </form>
  );
};

export default BuyNowForm;
