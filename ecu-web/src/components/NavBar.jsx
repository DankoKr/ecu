import { useState } from "react";
import { NavLink } from "react-router-dom";
import menuIcon from "../assets/hamburgerMenu.png";
import { nav } from "./navLinks";

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDropdownClick = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <nav className="flex items-center sticky top-0 justify-between bg-blue-800 border-b border-gray-200 py-4 px-6 md:px-10">
      <h1 className="text-white font-bold">
        <NavLink to="/">ECU Intranet</NavLink>
      </h1>
      <div className="flex items-center space-x-4 font-bold">
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <img src={menuIcon} alt="Menu" className="h-8 w-10" />
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          {nav.map((route, index) => {
            if (route.isVisible) {
              return route.subPages ? (
                <div key={route.name} className="relative group">
                  <button
                    onClick={() => handleDropdownClick(index)}
                    className="text-white hover:underline flex items-center"
                  >
                    {route.name}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {dropdownOpen === index && (
                    <div className="absolute bg-blue-700 text-white mt-2 rounded shadow-lg w-48">
                      {route.subPages.map((subPage) => (
                        <NavLink
                          key={subPage.path}
                          to={subPage.path}
                          className="block px-3 py-1 text-sm hover:underline"
                          onClick={() => setDropdownOpen(null)}
                        >
                          {subPage.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={route.name}
                  to={route.path}
                  className="text-white hover:underline"
                >
                  {route.name}
                </NavLink>
              );
            }
            return null;
          })}
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-blue-800">
          <div className="flex flex-col items-start space-y-2 px-4 py-2">
            {nav.map((route, index) => {
              if (route.isVisible) {
                return route.subPages ? (
                  <div key={route.name} className="relative">
                    <button
                      onClick={() => handleDropdownClick(index)}
                      className="text-white hover:underline flex items-center"
                    >
                      {route.name}
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    {dropdownOpen === index && (
                      <div className="pl-4 bg-blue-800 text-white rounded shadow-lg w-full">
                        {route.subPages.map((subPage) => (
                          <NavLink
                            key={subPage.path}
                            to={subPage.path}
                            className="block px-3 py-1 text-sm hover:underline"
                            onClick={() => setDropdownOpen(null)}
                          >
                            {subPage.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={route.name}
                    to={route.path}
                    className="text-white hover:underline"
                  >
                    {route.name}
                  </NavLink>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
