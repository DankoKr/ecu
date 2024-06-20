import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./utils/auth/AuthProvider";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import ECUDevelopmentFund from "./pages/ECUDevelopmentFund";
import GeneralAssemblyDocumentsPage from "./pages/GeneralAssemblyDocumentsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/development-fund"
                element={<ECUDevelopmentFund />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/general-assembly"
                element={<GeneralAssemblyDocumentsPage />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/judges-info" element={<HomePage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/meeting-min" element={<HomePage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/nf-info" element={<HomePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
