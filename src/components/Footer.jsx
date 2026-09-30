import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="w-12/14 mx-auto ">
        <div className=" flex flex-col gap-8 px-4 py-12 sm:flex-row sm:justify-between">
          <div>
            <p className="text-2xl font-bold text-white">
              Study<span className="text-brand-light">Nook</span>
            </p>
            <p className="mt-3 text-sm">
              Quiet, private study rooms you can book by the hour.
            </p>
          </div>

          <div>
            <p className="font-semibold text-white">Useful links</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-brand-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-brand-light">
                  Rooms
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-light">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">Contact </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>hello@studynook.com</li>
              <li>+44 20 7946 0123</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700">
          <div className=" flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row">
            <p className="text-sm">© 2026 StudyNook. All rights reserved.</p>

            <div className="flex gap-5 text-xl text-white">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer">
                <FaXTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
