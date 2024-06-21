import { useContext } from "react";
import AuthContext from "../utils/auth/AuthContext";
import { useNavigate } from "react-router-dom";

function NoDocumentsView() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAdmin = user.role === "ADMIN";

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          No documents...
        </h2>
        <p className="text-xl text-gray-600">
          There are no documents related to this topic!
        </p>
        {isAdmin ? (
          <button
            className="mt-6 bg-[#207daf] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate("/upload-form")}
          >
            Add Document
          </button>
        ) : (
          <p className="text-gray-600 mt-2">
            Contact ECU support for more information
          </p>
        )}
      </div>
    </div>
  );
}

export default NoDocumentsView;
