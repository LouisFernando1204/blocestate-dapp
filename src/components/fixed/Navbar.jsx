/* eslint-disable react/prop-types */
import { navList } from "../../utils/list";
import internet_identity from "../../assets/internet_identity.png";
import { truncate } from "../../lib/utils";
import { Link } from "react-router-dom";

const Navbar = ({ principal, handleConnect }) => {
  return (
    <div className="w-full text-white shadow-lg">
      <nav className="bg-[#1a1a1a] w-full border-b border-amber-700">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-6 py-6 md:py-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <img
              src="\public\images\blocestate_logo.png"
              alt="logo"
              className="h-10"
            />
            <span className="hidden md:block text-2xl font-semibold italic text-gray-200">
              BlocEstate
            </span>
          </a>

          {/* Navigation Links (Centered) */}
          <div className="hidden md:flex justify-center space-x-8 mx-auto">
            {navList.map((item, index) => (
              <Link
                to={item.url}
                key={index}
                className="text-gray-300 hover:text-white hover:bg-amber-900 py-2 px-4 rounded transition duration-200"
              >
                {item.title}
              </Link>
            ))}
          </div>
          {/* Connect Wallet / Principal Info */}
          <div className="flex items-center space-x-3">
            {principal ? (
              <button className="relative bg-[#2a2a2a] p-2 md:p-3.5 rounded-xl hover:scale-105 duration-200 flex items-center gap-2 shadow-md">                <span className="animate-ping absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-600 opacity-75"></span>
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-700"></span>

                <img src={internet_identity} alt="plug" className="h-8" />
                <h1 className="text-gray-300 font-semibold">
                  {truncate(principal, 4, 4, 11)}
                </h1>
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="relative bg-[#2a2a2a] p-2 md:p-3.5 rounded-xl hover:scale-105 duration-200 flex items-center gap-2 shadow-md"

              >
                <span className="animate-ping absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-600 opacity-75"></span>
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-700"></span>

                <img src={internet_identity} alt="plug" className="h-8" />
                <h1 className="text-gray-300 font-semibold">Connect Wallet</h1>
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;