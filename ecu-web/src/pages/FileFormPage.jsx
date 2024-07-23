import { useContext, useState } from "react";
import { postData } from "../utils/requests/postData.request";
import MainLayout from "../layouts/MainLayout";
import AuthContext from "../utils/auth/AuthContext";
import AccessDeniedPage from "./AccessDeniedPage";

export default function FileFormPage() {
  const [file, setFile] = useState(null);
  const [sector, setSector] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const { user } = useContext(AuthContext);

  if (user.role != "ADMIN") return <AccessDeniedPage />;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSectorChange = (e) => {
    setSector(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !sector) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sector", sector);

    setUploading(true);
    setError(null);

    try {
      await postData("/upload", formData);
      setFile(null);
      setSector("");
      setSuccessMessage("File uploaded successfully!");
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Upload a Document
          </h2>
          <input type="file" onChange={handleFileChange} className="mb-4" />
          <select
            value={sector}
            onChange={handleSectorChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Sector</option>
            <option value="Board Meeting Minutes">Board Meeting Minutes</option>
            <option value="Congress Documents">Congress Documents</option>
            <option value="ECU Development Fund">Development Fund</option>
            <option value="ECL">ECL</option>
            <option value="General Assembly Documents">
              General Assembly Documents
            </option>
            <option value="Judges Information">Judges Information</option>
            <option value="NF Information">NF Information</option>
          </select>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full bg-[#207daf] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ${
              uploading
                ? "opacity-50 cursor-not-allowed"
                : "focus:outline-none focus:shadow-outline"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
          {successMessage && (
            <p className="mt-2 text-green-500">{successMessage}</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
