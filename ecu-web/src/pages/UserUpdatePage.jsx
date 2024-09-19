import { useState, useEffect } from "react";
import { getUserByFederation } from "../utils/requests/getUserByFederation.request";
import { useParams } from "react-router-dom";
import { putData } from "../utils/requests/putData.request";
import MainLayout from "../layouts/MainLayout";

function UserUpdatePage() {
  const [user, setUser] = useState(null);
  const { federation } = useParams();
  const [newUserData, setNewUserData] = useState({
    id: null,
    name: "",
    country: "",
    website: "",
    federation: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserByFederation(federation);
        setUser(response);
        setNewUserData({
          id: response.id,
          name: response.name,
          country: response.country,
          website: response.website,
          federation: response.federation,
        });
        setError(null);
      } catch (err) {
        setError("User not found or error occurred.");
        setUser(null);
      }
    };

    fetchUserData();
    setLoading(false);
  }, [federation]);

  const handleChange = (e) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      putData("/users", newUserData, user.id);
      setSuccess("User updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl text-blue-800 font-bold mb-6">
          Update User Data
        </h2>
        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              President Name:
            </label>
            <input
              type="text"
              name="name"
              value={newUserData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country:
            </label>
            <input
              type="text"
              name="country"
              value={newUserData.country}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website:
            </label>
            <input
              type="url"
              name="website"
              value={newUserData.website}
              onChange={handleChange}
              placeholder="Optional"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Federation:
            </label>
            <input
              type="text"
              name="federation"
              value={newUserData.federation}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update User
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export default UserUpdatePage;
