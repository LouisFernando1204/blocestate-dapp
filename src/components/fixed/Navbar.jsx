import { navList } from "../../utils/list";
import plug from "../../assets/plug.png"

const Navbar = () => {

  return (
    <div
      className={`-mx-10 text-white border-b border-n-6 shadow-xl`}
    >
      <nav className="bg-darkBrown fixed w-full z-20 top-0 start-0 border-b border-amber-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-6 md:py-4">

          <a href="/" className="flex flex-row gap-2 items-center space-x-3 rtl:space-x-reverse">
            <img src="\public\images\blocestate_logo.png" alt="plug" className="h-12" />
            <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap italic">BlocEstate</span>
          </a>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button className="bg-white p-2 md:p-3 rounded-xl hover:scale-105 duration-200 flex flex-row space-x-1 items-center gap-2">
              <img src={plug} alt="plug" className="h-8" />
              <h1 className="text-black font-semibold">Connect Wallet</h1>
            </button>
            
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-darkBrown md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {navList.map((item, index) => (
                <li>
                  <a
                    key={index}
                    href={item.url}
                    className="block py-2 px-3 text-white rounded hover:bg-amber-900 md:hover:bg-transparent md:hover:text-amber-600 md:p-0"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      
    </div>
  );
};

export default Navbar;
