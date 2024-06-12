import MainLayout from "../layouts/MainLayout";
import HomeImage from "../assets/homeImage.webp";

function HomePage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center py-5 w-full">
        <img
          src={HomeImage}
          alt="Platform Image"
          className="rounded-lg shadow-lg w-full max-w-4xl h-auto"
        />
        <div className="mt-8 max-w-2xl text-center px-4">
          <h1 className="text-3xl font-bold mb-4">Welcome team Bulgaria!</h1>
          <p className="text-lg text-gray-700">
            Our platform provides a comprehensive solution to manage your
            projects efficiently. With a range of features designed to
            streamline your workflow, we aim to help you achieve your goals
            faster and more effectively. Join us and experience the difference!
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;