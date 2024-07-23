import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function AccessDeniedPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center">
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Access Denied
          </h2>
          <p className="text-xl text-gray-600">
            You do not have the rights to view the content!
          </p>
          <Link to="/" className="text-blue-600 mt-4 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default AccessDeniedPage;
