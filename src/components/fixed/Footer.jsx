import { navList } from "../../utils/list";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-[#e5e5e5] py-6 border-t border-[#333333] shadow-lg">
      <ul className="text-md flex items-center justify-center flex-col gap-4 md:flex-row md:gap-12 transition-all duration-500 py-4">
        <li className="font-semibold text-center">
          <span>
            ©{" "}
            <a
              href="#"
              className="hover:text-amber-600 transition-colors duration-300"
            >
              BlocEstate
            </a>{" "}
            2024, All rights reserved.
          </span>
        </li>
        {navList.map((nav, index) => (
          <li key={index}>
            <a
              className="text-[#e5e5e5] hover:text-amber-600 transition-colors duration-300"
              href={nav.url}
            >
              {nav.title}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;