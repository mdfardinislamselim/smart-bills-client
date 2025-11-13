import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Lottie from "lottie-react";
import loginAnim from "../lotties/login.json";
import { AuthContext } from "../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { setLoading, signInUser, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Handle email/password login
  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        // console.log("Logged in user:", result.user);
        form.reset();
        navigate(from, { replace: true });
        form.reset();
        // toast.success("Welcome back! 🎉", { duration: 3000 });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
        let message = err.message;

        if (message.includes("auth/invalid-credential")) {
          toast.error("Incorrect email or password. Please try again.");
        } else if (message.includes("auth/user-not-found")) {
          toast.error(
            "No account found with this email. Please register first."
          );
        } else if (message.includes("auth/wrong-password")) {
          toast.error("Invalid password. Please try again.", {
            duration: 3000,
          });
        } else if (message.includes("auth/too-many-requests")) {
          toast.error("Too many failed attempts. Try again later.", {
            duration: 3000,
          });
        } else {
          toast.error("Login failed. Please try again.", { duration: 3000 });
        }
      });
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        // console.log("Google User:", result.user);
        // toast.success("Logged in with Google! ✅", { duration: 3000 });
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Google login failed. Please try again.", {
          duration: 3000,
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center bg-base-200 p-5">
      <title>Login | Smart Bills</title>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full lg:w-1/2 flex justify-center">
        <Lottie animationData={loginAnim} loop={true} className="w-3/4" />
      </div>

      <div className="w-full lg:w-1/2 max-w-md bg-base-100 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
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
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Login</button>
          </div>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Register here
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

export default Login;
