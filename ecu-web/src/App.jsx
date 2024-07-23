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

function generateRoutes(nav) {
  return nav.flatMap((section) =>
    section.subPages
      ? section.subPages.map((subPage) => (
          <Route key={subPage.path} element={<ProtectedRoute />}>
            <Route
              path={subPage.path}
              element={<GeneralDocumentsPage pageTitle={subPage.name} />}
            />
          </Route>
        ))
      : []
  );
}

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
              <Route path="/create-user" element={<UserFormPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/upload-form" element={<FileFormPage />} />
            </Route>
            {generateRoutes(nav)}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
