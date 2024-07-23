import { useContext, useState } from "react";
import logo from "../assets/logo.png";
import AuthContext from "../utils/auth/AuthContext";
import backgroundVideo from "../assets/intro.mp4";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async () => {
    if (!username || !password) {
      setErrorMessage("Username and Password are required");
      return;
    }

    try {
      await login({ username, password });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Invalid credentials!");
      console.error("Sign-In error:", error);
    }
  };

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={backgroundVideo}
      />

      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-md flex relative z-10">
        <div className="w-1/3 flex items-center justify-center">
          <img src={logo} className="h-auto max-h-full" alt="Left Image" />
        </div>
        <div className="w-2/3 px-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
            ECU Intranet
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                value={username}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-600 text-sm text-center">
                {errorMessage}
              </div>
            )}
            <div className="flex justify-center">
              <button
                className="bg-[#207daf] hover:bg-blue-900 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={onSubmit}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
