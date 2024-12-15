import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "../../components/navbar/Navbar";
import authImage from "../../assets/images/auth/wakililogo.jpg";
import { usersAPI } from "../../features/users/usersAPI";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

type FormData = {
  full_name: string;
  email: string;
  phone_number: string; // Renamed from contact_phone to phone_number
  address: string;
  password: string;
  confirmPassword: string;
  image_url?: string; // Optional, if it is set automatically by the backend, you may not need this
  role?: string; // Optional, defaulting to "user" or as defined in the API
};

const schema = yup.object().shape({
  full_name: yup.string().required("Full name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  phone_number: yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits") // Ensure it matches the required pattern
    .required("Phone number is required"), 
  address: yup.string().required("Address is required"),
  password: yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required")
});

const Register = () => {
  const navigate = useNavigate();
  const [createUser] = usersAPI.useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formattedData = {
        full_name: data.full_name,
        email: data.email,
        phone_number: data.phone_number, // Use phone_number as required by the API
        address: data.address,
        password: data.password,
        image_url: "https://randomuser.me/api/portraits/men/1.jpg", // Can be set dynamically if needed
        role: "user" // Default role (you can set it as "admin" if you want)
      };

      const response = await createUser(formattedData).unwrap();
      console.log("Response data:", response);
      toast.success("Registration successful");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err: any) {
      if (err?.data) {
        console.error("API error:", err.data); 

        if (Array.isArray(err.data)) {
          err.data.forEach((error: any) => {
            if (error.message) {
              toast.error(`Error: ${error.message}`);
            }
          });
        } else if (err.data.errors) {
          err.data.errors.forEach((error: any) => {
            if (error.message) {
              toast.error(`Error: ${error.message}`);
            }
          });
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Toaster 
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
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

        <div className="w-full lg:w-1/2">
          <div className="card  w-full bg-[#fefffe] max-w-md mx-auto shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h2 className="text-center text-[#006400] text-2xl font-bold mb-4">Create An Account 📢</h2>

              <div className="form-control">
                <input type="text" placeholder="Full Name" className="input input-bordered" {...register("full_name")} />
                <p className="text-red-500">{errors.full_name?.message}</p>
              </div>

              <div className="form-control">
                <input type="email" placeholder="Email" className="input input-bordered" {...register("email")} />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>

              <div className="form-control">
                <input type="text" placeholder="Phone Number" className="input input-bordered" {...register("phone_number")} />
                <p className="text-red-500">{errors.phone_number?.message}</p>
              </div>

              <div className="form-control">
                <input type="text" placeholder="Address" className="input input-bordered" {...register("address")} />
                <p className="text-red-500">{errors.address?.message}</p>
              </div>

              <div className="form-control">
                <input type="password" placeholder="Password" className="input input-bordered" {...register("password")} />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>

              <div className="form-control">
                <input type="password" placeholder="Confirm Password" className="input input-bordered" {...register("confirmPassword")} />
                <p className="text-red-500">{errors.confirmPassword?.message}</p>
              </div>

              <div className="form-control mt-4">
                <button type="submit" className="btn bg-[#006400] text-white hover:bg-green-500 border-none">
                  Register
                </button>
              </div>

              <div className="form-control mt-2">
                <Link to="/login" className="label-text-alt link link-hover text-[#006400] font-bold">
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
