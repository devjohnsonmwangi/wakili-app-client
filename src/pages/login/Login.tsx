import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "../../components/navbar/Navbar";
import authImage from "../../assets/images/auth/wakililogo.jpg";
import { loginAPI, LoginFormData } from "../../features/login/loginAPI";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/users/userSlice";

// **Form schema for validation**
const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = loginAPI.useLoginUserMutation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setIsLoggingIn(true);
      const response = await loginUser(data).unwrap();

      console.log("API Response:", response); // Debug the API response

      if (!response.token) {
        toast.error("Invalid credentials");
        return;
      }

      // **Store user data in local storage**
      const userData = {
        user: response.user, // Ensure this is the entire user object if the userSlice expects it
        user_id: response.user?.user_id, // Ensure this field exists in the API response
        token: response.token,
        role: response.user?.role?.toLowerCase(),
        email: response.user?.email
      };

      console.log("User Data to be stored in state:", userData); // Debug the user data before dispatch

      localStorage.setItem('userData', JSON.stringify(userData));

      // **Dispatch login success to Redux store**
      dispatch(loginSuccess(userData));

      // **Show success message**
      toast.success("Login successful! Redirecting...");

      // **Redirect based on user role using switch statement**
      const role = userData.role;
      switch (role) {
        case 'admin':
        case 'manager':
          case 'support':
          navigate('/dashboard/profile');
          break;
        case 'lawyer':
          navigate('/dashboard/profile');
          break;
        case 'user':
        case 'client':
          navigate('/dashboard/profile');
          break;
        case 'clerk':    
        case 'receptionist':
          navigate('/dashboard/profile');
          break;
        default:
          navigate('/');  // Fallback to home page if role doesn't match
          break;
      }

    } catch (err) {
      console.error("Error during login:", err);
      toast.error("Invalid credentials");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div>
      <Toaster 
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'bg-green-500 text-white',
            warning: 'bg-yellow-400',
            info: 'bg-blue-400',
          },
        }} 
      />
      <Navbar />
      <div className="flex flex-col lg:flex-row h-full min-h-screen items-center bg-[#c2d6c2] justify-center p-4 lg:p-8">
        
        <div className="w-full lg:w-1/2 h-64 sm:h-80 lg:h-full mb-6 lg:mb-0 flex justify-center">
          <img
            src={authImage}
            alt="Auth"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        
        <div className="w-full lg:w-[50%] flex justify-center bg-[#c2d6c2] items-center p-6">
          <div className="card bg-base-100 w-full max-w-md shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h2 className="text-center text-[#006400] text-2xl font-bold mb-4">
                Login To Access Services ✅ ✅ 
              </h2>

              <div className="form-control">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="input input-bordered" 
                  required 
                  {...register("email")} 
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>

              <div className="form-control">
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="input input-bordered" 
                  required 
                  {...register("password")} 
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>

              <div>
                <label className="label">
                  <Link to="/forgot-password" className="label-text-alt link link-hover">Forgot password?</Link>
                </label>
              </div>

              <div className="form-control mt-2">
                <button type="submit" className="btn bg-[#006400] text-white hover:bg-green-500 border-none">
                  {isLoggingIn ? (
                    <>
                      <span className="loading loading-spinner text-text-light"></span>
                      <span className='text-text-light'>Logging in...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>

              <div className="form-control mt-2">
                <Link to="/register" className="label-text-alt link link-hover text-[#006400] font-bold">
                  Don't have an account? Register 
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
