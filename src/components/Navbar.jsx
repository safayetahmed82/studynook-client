import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  `border-b-2 pb-1 text-sm font-medium transition-colors ${
    isActive
      ? "border-brand text-brand"
      : "border-transparent text-ink/70 hover:text-brand"
  }`;

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  return (
    <header className="border-b border-ink/10 bg-gray-100">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <ul className="flex items-center gap-6">
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
          className="text-2xl font-bold text-brand transition-colors hover:text-brand-light"
        >
          Study<span className="text-brand-light">Nook</span>
        </Link>

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
      </nav>
    </header>
  );
};

export default Navbar;
