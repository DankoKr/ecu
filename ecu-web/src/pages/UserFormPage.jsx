import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { postData } from "../utils/requests/postData.request";

function UserFormPage() {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "MEMBER",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setUser({
      ...user,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("role", user.role);
    formData.append("password", user.password);
    formData.append("image", user.image);

    try {
      await postData("/sign-up", formData);
      setSuccessMessage("Member Registered successfully");
    } catch (error) {
      setError("Email already used");
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
            Register Member
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex items-center justify-center flex-col">
            {error && <p className="mb-2 text-red-500">{error}</p>}
            {successMessage && (
              <p className="mb-2 text-green-500">{successMessage}</p>
            )}
            <button
              type="submit"
              className="bg-[#207daf] hover:bg-blue-900 text-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring focus:ring-blue-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}

export default UserFormPage;
