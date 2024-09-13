import { useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./utils/auth/AuthProvider";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import FileFormPage from "./pages/FileFormPage";
import UserFormPage from "./pages/UserFormPage";
import GeneralDocumentsPage from "./pages/GeneralDocumentsPage";
import { nav } from "./components/navLinks";
import NationalFederationsPage from "./pages/NationalFederationsPage";
import UserManagementPage from "./pages/UserManagementPage";
import UserUpdatePage from "./pages/UserUpdatePage";

function generateRoutes(nav) {
  return nav.flatMap((section) =>
    section.subPages
      ? section.subPages.map((subPage) => (
          <Route
            key={subPage.path}
            path={subPage.path}
            element={<GeneralDocumentsPage pageTitle={subPage.name} />}
          />
        ))
      : []
  );
}

function App() {
  const routes = useMemo(() => generateRoutes(nav), [nav]);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-user" element={<UserFormPage />} />
              <Route
                path="/update-user/:federation"
                element={<UserUpdatePage />}
              />
              <Route path="/user-management" element={<UserManagementPage />} />
              <Route path="/upload-form" element={<FileFormPage />} />
              <Route
                path="/national-federations"
                element={<NationalFederationsPage />}
              />
              {routes}
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
