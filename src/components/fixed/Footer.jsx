import { navList } from "../../utils/list";

const Footer = () => {
  return (
    <footer className="-mx-10 bg-darkBrown text-white py-2 border-t border-gray-200 shadow-lg">
      <ul className="text-md flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-8">
        <li className="font-semibold">
          <span>
            ©<a href="#">BlocEstate</a> 2024, All rights reserved.
          </span>
        </li>
        {navList.map((nav, index) => (
          <li key={index}>
            <a class="text-white rounded hover:bg-amber-900 md:hover:bg-transparent md:hover:text-amber-600" href={`${nav.url}`}> {nav.title} </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
