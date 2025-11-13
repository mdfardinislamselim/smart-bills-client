import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import registerAnim from "../lotties/login.json";
import { AuthContext } from "../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase, one lowercase letter, and be 6+ characters long.",
        { duration: 3000 }
      );
      return;
    }

    // Create user
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            // toast.success("Account created successfully! 🎉");
            form.reset();
            navigate("/");
          })
          .catch(() => {
            toast.error("Failed to update profile. Please try again.");
          });
      })
      .catch((err) => {
        let message = err.message;
        if (message.includes("auth/email-already-in-use")) {
          toast.error(
            "This email is already registered. Please log in instead.",
            { duration: 3000 }
          );
        } else if (message.includes("auth/invalid-email")) {
          toast.error("Invalid email format. Please enter a valid address.", {
            duration: 3000,
          });
        } else if (message.includes("auth/weak-password")) {
          toast.error("Password is too weak. Try a stronger one.", {
            duration: 3000,
          });
        } else {
          toast.error("Registration failed. Please try again.", {
            duration: 3000,
          });
        }
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google! ✅", { duration: 3000 });
        navigate("/");
      })
      .catch(() => {
        toast.error("Google login failed. Please try again.", {
          duration: 3000,
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-base-200 p-5">
      <title>Register | Smart Bills</title>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <Lottie animationData={registerAnim} loop={true} className="w-3/4" />
      </div>

      {/* Register Form */}
      <div className="w-full lg:w-1/2 max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control relative">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full pr-10"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-gray-500 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <label className="label text-xs text-gray-500">
              Must include 1 uppercase, 1 lowercase & be 6+ characters
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Register</button>
          </div>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>

        <div className="divider">OR</div>
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline btn-accent w-full flex items-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
