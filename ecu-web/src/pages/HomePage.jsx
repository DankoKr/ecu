import { useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import AdminPage from "./AdminPage";
import AuthContext from "../utils/auth/AuthContext";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user")); // Used beacause image doesn't load
  const { logout } = useContext(AuthContext);

  if (user.role === "ADMIN") return <AdminPage />;

  const handleLogout = () => {
    logout();
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center py-5 w-full">
        {user.image && (
          <img
            src={`data:image/jpg;base64,${user.image}`}
            alt="User Image"
            className="rounded-lg shadow-lg w-full max-w-xl max-h-fit"
          />
        )}
        <div className="mt-8 max-w-2xl text-center px-4">
          <h1 className="text-3xl font-bold mb-4">
            Welcome {user.name}, the representative of {user.federation}!
          </h1>
          <p className="text-lg text-gray-700">
            Here is your national federation area with all important documents
            and materials from European Cheer Union structures.
          </p>
          <p className="text-lg text-gray-700">- ECU Executive Board -</p>
        </div>
        <div className="flex justify-center mt-16">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-48 h-12 bg-red-600 text-white text-lg font-bold rounded-lg transition-transform transform hover:bg-red-800 hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
