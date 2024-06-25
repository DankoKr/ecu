import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="flex-1 flex items-center justify-center w-full mt-5">
          <div className="w-full max-w-7xl">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
