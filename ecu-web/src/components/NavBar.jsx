import { NavLink } from "react-router-dom";

function NavBar() {
  const nav = [
    { path: "/", name: "Home", isVisible: true },
    { path: "/login", name: "Login", isVisible: true },
  ];

  return (
    <nav className="flex items-center border-b border-gray-200 py-5 px-10 m-auto">
      <h1 className="text-red-300 font-bold">ECU Intranet</h1>
      <div className="ml-auto flex space-x-4 font-bold">
        {nav.map((route) => {
          if (route.isVisible) {
            return (
              <NavLink
                key={route.path}
                to={route.path}
                className="hover:text-blue-500"
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
