import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { deleteData } from "../utils/requests/deleteData.request";
import { getUserByFederation } from "../utils/requests/getUserByFederation.request";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useNavigate } from "react-router-dom";

function UserManagementPage() {
  const navigate = useNavigate();
  const [federation, setFederation] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const openConfirmationDialog = () => {
    setIsDialogOpen(true);
  };

  const goToUserUpdatePage = () => {
    navigate(`/update-user/${federation}`);
  };

  const handleDelete = async () => {
    if (!user) return;

    try {
      await deleteData(user.id, "/users");
      setIsDialogOpen(false);
      setUser(null);
      setFederation("");
      setError("");
    } catch (err) {
      setError("Error deleting user.");
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">
          Select a Member
        </h1>

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
              className="ml-4 bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        {user && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-blue-800">
              User Details
            </h2>
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
              onClick={openConfirmationDialog}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Delete User
            </button>
            <button
              onClick={goToUserUpdatePage}
              className="mt-4 ml-2 bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
            >
              Update User
            </button>
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this member?"
      />
    </MainLayout>
  );
}

export default UserManagementPage;
