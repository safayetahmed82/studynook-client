import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  `border-b-2 pb-1 text-sm font-medium transition-colors ${
    isActive
      ? "border-brand text-brand"
      : "border-transparent text-ink/70 hover:text-brand"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium ${
    isActive ? "bg-cyan-50 text-brand" : "text-ink/80 hover:bg-gray-200"
  }`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
    toast.success("Logged out successfully");
  };

  return (
    <header className="border-b border-ink/10 bg-gray-100">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <ul className="hidden items-center gap-6 lg:flex">
          <li>
            <NavLink to="/" end className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/rooms" className={linkClass}>
              All Rooms
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink to="/add-room" className={linkClass}>
                  Add Room
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-listings" className={linkClass}>
                  My Listings
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-bookings" className={linkClass}>
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-brand transition-colors hover:text-brand-light"
        >
          Study<span className="text-brand-light">Nook</span>
        </Link>

        <div className="hidden lg:block">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-light"
              >
                Logout
              </button>
            </div>
          ) : (
            <ul className="flex items-center gap-6">
              <li>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={linkClass}>
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-200 lg:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-ink transition ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-ink transition ${
              open ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-ink transition ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          ></span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 px-4 pb-4 pt-2 lg:hidden">
          <NavLink to="/" end onClick={closeMenu} className={mobileLinkClass}>
            Home
          </NavLink>
          <NavLink to="/rooms" onClick={closeMenu} className={mobileLinkClass}>
            All Rooms
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/add-room"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                Add Room
              </NavLink>
              <NavLink
                to="/my-listings"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                My Listings
              </NavLink>
              <NavLink
                to="/my-bookings"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                My Bookings
              </NavLink>

              <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-light"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 flex gap-3 border-t border-ink/10 pt-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex-1 rounded-lg border border-brand px-4 py-2 text-center text-sm font-semibold text-brand hover:bg-cyan-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="flex-1 rounded-lg bg-brand px-4 py-2 text-center text-sm font-semibold text-white hover:bg-brand-light"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;