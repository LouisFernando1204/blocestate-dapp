import { navList } from "../../utils/list";
import plug from "../../assets/plug.png"

const Navbar = () => {

  return (
    <div
      className={`-mx-10 bg-darkBrown text-white border-b border-n-6 shadow-xl`}
    >
      <div className="flex items-center px-12 py-2">
        <h1 className="font-bold text-2xl">BlocEstate</h1>

        <nav
          className={`fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navList.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className={`block relative text-2xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-sm lg:font-semibold z-2 lg:text-n-1 lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </nav>
        <button className="bg-white p-3 rounded-xl hover:scale-105 duration-200 flex flex-row space-x-1 items-center gap-2">
            <img src={plug} alt="plug" className="h-8"/>
            <h1 className="text-black font-semibold">Connect Wallet</h1>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
