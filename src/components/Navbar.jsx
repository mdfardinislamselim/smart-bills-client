import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  // Links for navigation
  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-medium">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/bills" className="font-medium">
          Bills
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/mypaybills" className="font-medium">
              My Pay Bills
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login" className="font-medium btn btn-primary  ">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className=" btn btn-primary btn-outline font-medium"
            >
              Register
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="SmartBill" className="h-12" />
          <h2 className="text-2xl font-bold text-primary">SmartBill</h2>
        </Link>
      </div>

      {/* Right Section */}
      <div className="navbar-end flex-1 justify-end">
        {/* Desktop Links */}
        <ul className="menu menu-horizontal px-1 hidden lg:flex gap-3 items-center">
          {navLinks}
          {user && (
            <>
              <li>
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user?.displayName || user?.email}
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full border-2 border-primary"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-gray-500" />
                  )}
                </div>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-error text-white"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </button>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
            {user && (
              <>
                <li>
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={user?.displayName || user?.email}
                  >
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full border-2 border-primary"
                      />
                    ) : (
                      <FaUserCircle className="text-3xl text-gray-500" />
                    )}
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
  );
};

export default Navbar;
