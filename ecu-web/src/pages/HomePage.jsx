import MainLayout from "../layouts/MainLayout";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <MainLayout>
      <div className="flex flex-col items-center py-5 w-full">
        {user.image && (
          <img
            src={`data:image/jpg;base64,${user.image}`}
            alt="User Image"
            className="rounded-lg shadow-lg w-full max-w-4xl h-auto"
          />
        )}
        <div className="mt-8 max-w-2xl text-center px-4">
          <h1 className="text-3xl font-bold mb-4">Welcome team {user.name}!</h1>
          <p className="text-lg text-gray-700">
            Here is your national federation area with all important documents
            and materials from European Cheer Union structures.
          </p>
          <p className="text-lg text-gray-700">- ECU Executive Board -</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
