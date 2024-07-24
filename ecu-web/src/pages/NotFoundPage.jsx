import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function NotFoundPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center">
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">ERROR 404</h2>
          <p className="text-xl text-gray-600">
            The page you are looking for does not exist!
          </p>
          <p className="text-gray-600 mt-4">
            Please check the URL or go back {""}
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default NotFoundPage;
