import React from "react";
import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `border-b-2 pb-1 text-sm font-medium transition-colors ${
    isActive
      ? "border-brand text-brand"
      : "border-transparent text-ink/70 hover:text-brand"
  }`;

const Navbar = () => {
  return (
    <header className="border-b border-ink/10 bg-gray-100">
      <div className="mx-auto w-12/14">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div>
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
            </ul>
          </div>

          <div>
             <Link
              to="/"
              className=" text-2xl font-bold text-brand transition-colors hover:text-brand-light"
            >
              Study<span className="text-brand-light">Nook</span>
            </Link>
          </div>

          <div>
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
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

// import { Link, NavLink } from "react-router-dom";
// import { FiMenu } from "react-icons/fi";

// const Navbar = () => {
//   const leftLinks = (
//     <>
//       <li>
//         <NavLink to="/" end>Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/rooms">All Rooms</NavLink>
//       </li>
//     </>
//   );

//   const rightLinks = (
//     <>
//       <li>
//         <NavLink to="/login">Login</NavLink>
//       </li>
//       <li>
//         <NavLink to="/register">Register</NavLink>
//       </li>
//     </>
//   );

//   return (
//     <div className="navbar  px-4 w-12/13 mx-auto">
//       <div className="navbar-start">
//         <div className="dropdown lg:hidden">
//           <div tabIndex={0} role="button" className="btn btn-ghost btn-square">
//             <FiMenu size={22} />
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
//           >
//             {leftLinks}
//             {rightLinks}
//           </ul>
//         </div>
//         <ul className="menu menu-horizontal hidden lg:flex">{leftLinks}</ul>
//       </div>

//       <div className="navbar-center">
//         <Link to="/" className="text-2xl font-bold text-primary">
//           Study<span className="text-secondary">Nook</span>
//         </Link>
//       </div>

//       <div className="navbar-end">
//         <ul className="menu menu-horizontal hidden lg:flex">{rightLinks}</ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;




// import React from "react";
// import { Link } from "react-router-dom";
// const Navbar = () => {
//   return (
//     <header className="border-b border-ink/10 bg-gray-100  ">
//       <div className=" w-12/14 mx-auto">
//         <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 ">
//           <div>
//             <ul className="flex items-center gap-6">
//               <li>
//                 <Link
//                   to="/"
//                   className="text-sm font-medium text-ink/70 hover:text-pine"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/rooms"
//                   className="text-sm font-medium text-ink/70 hover:text-pine"
//                 >
//                   All Rooms
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <Link
//               to="/"
//               className=" text-2xl font-bold text-brand transition-colors hover:text-brand-light"
//             >
//               Study<span className="text-brand-light">Nook</span>
//             </Link>
//           </div>
//           <div>
//             <ul className="flex items-center gap-6">
//               <li>
//                 <Link
//                   to="/"
//                   className="text-sm font-medium text-ink/70 hover:text-pine"
//                 >
//                   Login
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/rooms"
//                   className="text-sm font-medium text-ink/70 hover:text-pine"
//                 >
//                   Register
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
