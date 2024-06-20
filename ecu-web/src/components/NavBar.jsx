import { useState } from "react";
import { NavLink } from "react-router-dom";
import menuIcon from "../assets/hamburgerMenu.png";

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nav = [
    { path: "/", name: "Home", isVisible: true },
    {
      path: "/general-assembly",
      name: "General Assembly Documents",
      isVisible: true,
    },
    { path: "/meeting-min", name: "Meeting Minutes", isVisible: true },
    { path: "/nf-info", name: "NF Information", isVisible: true },
    { path: "/judges-info", name: "Judges Information", isVisible: true },
    {
      path: "/development-fund",
      name: "ECU Development Fund",
      isVisible: true,
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
          {nav.map((route) => {
            if (route.isVisible) {
              return (
                <NavLink
                  key={route.path}
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
            {nav.map((route) => {
              if (route.isVisible) {
                return (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className="text-white hover:underline"
                    onClick={toggleMobileMenu}
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
