// components/ErrorPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import errorAnimation from "../lotties/404 Animation.json";

const ErrorPage = () => {

  // Dark/Light theme from localStorage
const [theme, setTheme] = useState(
  document.documentElement.getAttribute("data-theme") || "light"
);
useEffect(() => {
  const observer = new MutationObserver(() => {
    setTheme(document.documentElement.getAttribute("data-theme"));
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}, []);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center px-4 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-base-100 text-gray-800"
      }`}
    >
      <title>404 | Smart Bills</title>
      {/* Lottie Animation */}
      <div className="w-100 h-100">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      {/* <h1 className="text-6xl font-bold mb-4">404</h1> */}
      <p className="text-xl text-secondary mb-6 text-center max-w-md">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>

      <Link to="/" className="btn btn-primary btn-lg mb-4">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
