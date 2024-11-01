import { navList } from "../../utils/list";
import plug from "../../assets/plug.png";
import { truncate } from "../../lib/utils";
import { Link } from "react-router-dom";

const Navbar = ({ principal, handleConnect }) => {
  return (
    <div className={`-mx-10 text-white border-b border-n-6 shadow-xl`}>
      <nav className="bg-darkBrown w-full border-b border-amber-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-6 md:py-4">
          <a
            href="/"
            className="flex flex-row gap-2 items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="\public\images\blocestate_logo.png"
              alt="plug"
              className="h-12"
            />
            <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap italic">
              BlocEstate
            </span>
          </a>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {principal ? (
              <button className="relative bg-white p-2 md:p-3.5 rounded-xl hover:scale-105 duration-200 flex items-center gap-2">
                <span className="animate-ping absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-600 opacity-75"></span>
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-700"></span>

                <img src={plug} alt="plug" className="h-8" />
                <h1 className="text-black font-semibold">
                  {truncate(principal, 4, 4, 11)}
                </h1>
              </button>
            ) : (
              <button
                onClick={() => handleConnect()}
                className="relative bg-white p-2 md:p-3.5 rounded-xl hover:scale-105 duration-200 flex items-center gap-2"
              >
                <span className="animate-ping absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-600 opacity-75"></span>
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-700"></span>

                <img src={plug} alt="plug" className="h-8" />
                <h1 className="text-black font-semibold">Connect Wallet</h1>
              </button>
            )}
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <div className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-darkBrown md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {navList.map((item, index) => (
                <Link
                to={item.url}
                key={index}>
                  <h1
                    href={item.url}
                    className="block py-2 px-3 text-white rounded hover:bg-amber-900 md:hover:bg-transparent md:hover:text-amber-600 md:p-0"
                  >
                    {item.title}
                  </h1>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
