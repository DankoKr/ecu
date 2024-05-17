import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 flex flex-col lg:ml-72">
        <div className="flex-1 w-full mt-5 grid grid-cols-1 lg:grid-cols-[3.5fr,1.5fr]">
          {children}
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
