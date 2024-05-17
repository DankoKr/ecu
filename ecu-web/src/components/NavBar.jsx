import { NavLink } from "react-router-dom";

function NavBar() {
  const nav = [
    { path: "/", name: "Home", isVisible: true },
    { path: "/login", name: "General Assembly Documents", isVisible: true },
    { path: "/login", name: "Meeting Minutes", isVisible: true },
    { path: "/login", name: "NF Information", isVisible: true },
    { path: "/login", name: "Judges Information", isVisible: true },
    { path: "/login", name: "ECU Development Fund", isVisible: true },
  ];

  return (
    <nav className="flex items-center justify-between bg-blue-800 border-b border-gray-200 py-4 px-6 md:px-10">
      <h1 className="text-white font-bold">ECU Intranet</h1>
      <div className="flex space-x-4 font-bold">
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
    </nav>
  );
}

export default NavBar;
