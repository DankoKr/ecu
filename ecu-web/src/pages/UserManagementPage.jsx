import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { deleteData } from "../utils/requests/deleteData.request";
import { getUserByFederation } from "../utils/requests/getUserByFederation.request";

function UserManagementPage() {
  const [federation, setFederation] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const user = await getUserByFederation(federation);
      setUser(user);
      setError(null);
    } catch (err) {
      setError("User not found or error occurred.");
      setUser(null);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    try {
      await deleteData(user.id, "/users");
      setUser(null); // Clear user details after deletion
      setFederation("");
    } catch (err) {
      setError("Error deleting user.");
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Select a Member</h1>

        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex items-center">
            <input
              type="text"
              value={federation}
              onChange={(e) => setFederation(e.target.value)}
              placeholder="Enter federation name"
              className="px-3 py-2 border rounded-md shadow-sm w-full md:w-1/3"
              required
            />
            <button
              type="submit"
              className="ml-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        {user && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>President Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
            <p>
              <strong>Federation Name:</strong> {user.federation}
            </p>
            <p>
              <strong>Website:</strong> {user.website}
            </p>

            <button
              onClick={handleDelete}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Delete User
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default UserManagementPage;
