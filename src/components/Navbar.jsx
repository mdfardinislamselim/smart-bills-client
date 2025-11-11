import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import logo from "../assets/logo.png";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.querySelector("html").setAttribute("data-theme", saved);
  }, []);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logOut().catch(console.error);
  };

  // Common nav links
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-primary" : ""}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bills"
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-primary" : ""}`
          }
        >
          Bills
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/mypaybills"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-primary" : ""}`
            }
          >
            My Pay Bills
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 navbar">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="SmartBill" className="h-10 w-10" />
            <h2 className="text-2xl font-bold text-primary">SmartBill</h2>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex-none">
          {/* Desktop Menu */}
          <ul className="menu menu-horizontal gap-4 hidden md:flex items-center">
            {navLinks}

            {/* Theme Toggle (Desktop) */}
            <button
              onClick={toggleTheme}
              className=" btn btn-ghost btn-circle text-xl"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {/* Auth Buttons */}
            {!user ? (
              <>
                <Link to="/login" className="btn btn-sm btn-primary">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user?.displayName || user?.email}
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User Avatar"
                      className="w-9 h-9 rounded-full border-2 border-primary"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-gray-500" />
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-error text-white"
                >
                  Logout
                </button>
              </>
            )}
          </ul>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle text-xl"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {/* Dropdown Menu */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52 space-y-1"
              >
                {navLinks}

                <li>
                  <button
                    onClick={toggleTheme}
                    className="btn btn-ghost btn-sm w-full flex justify-start"
                  >
                    {theme === "light" ? (
                      <>
                        <FaMoon className="mr-2" /> Dark Mode
                      </>
                    ) : (
                      <>
                        <FaSun className="mr-2" /> Light Mode
                      </>
                    )}
                  </button>
                </li>

                <div className="divider my-1"></div>

                {!user ? (
                  <>
                    <li>
                      <Link
                        to="/login"
                        className="btn btn-sm btn-primary w-full"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="btn btn-sm btn-outline btn-primary w-full"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <div className="flex items-center gap-2">
                        {user?.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full border border-primary"
                          />
                        ) : (
                          <FaUserCircle className="text-2xl text-gray-500" />
                        )}
                        <span className="text-sm truncate">
                          {user?.displayName || user?.email}
                        </span>
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn btn-sm btn-error text-white w-full"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
