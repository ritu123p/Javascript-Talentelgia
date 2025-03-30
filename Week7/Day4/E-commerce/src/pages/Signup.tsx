import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { signupSchema } from './AuthValidation';

const Signup = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }, trigger,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
  });

  if (!auth) return null;

  const onSubmit = async (data: { name: string; email: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:3003/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("User registered successfully!");
        await auth.signup(data.name, data.email, data.password);
        navigate("/login");
      } else {
        console.error("Failed to register user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
            <input 
              type="text" 
              {...register("name")}
              onBlur={() => trigger("name")}
              onChange={(e) => {
                register("name").onChange(e);
                trigger("name"); // Remove error when valid input is entered
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              {...register("email")}
              onBlur={() => trigger("email")}
              onChange={(e) => {
                register("email").onChange(e);
                trigger("email"); // Remove error when valid input is entered
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              {...register("password")}
              onBlur={() => trigger("password")}
              onChange={(e) => {
                register("password").onChange(e);
                trigger("password"); // Remove error when valid input is entered
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?  
          <Link to="/login" className="text-blue-600 hover:underline"> Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
