import { useContext } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthContext from "../utils/auth/AuthContext";
import AccessDeniedPage from "./AccessDeniedPage";

function AdminPage() {
  const { user } = useContext(AuthContext);

  if (user.role !== "ADMIN") return <AccessDeniedPage />;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Admin Panel</h1>
      <div className="flex flex-wrap justify-around mt-8 relative z-10">
        <Link
          to="/upload-form"
          className="flex items-center justify-center w-48 h-48 m-4 bg-blue-600 text-white text-lg font-bold rounded-lg transition-transform transform hover:bg-blue-800 hover:scale-105"
        >
          Upload Document
        </Link>
        <Link
          to="/user-management"
          className="flex items-center justify-center w-48 h-48 m-4 bg-blue-600 text-white text-lg font-bold rounded-lg transition-transform transform hover:bg-blue-800 hover:scale-105"
        >
          Edit Members
        </Link>
        <Link
          to="/create-user"
          className="flex items-center justify-center w-48 h-48 m-4 bg-blue-600 text-white text-lg font-bold rounded-lg transition-transform transform hover:bg-blue-800 hover:scale-105"
        >
          Add Member
        </Link>
      </div>
    </MainLayout>
  );
}

export default AdminPage;
