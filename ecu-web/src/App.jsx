import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./utils/auth/AuthProvider";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./utils/auth/ProtectedRoute";
import ECLPage from "./pages/ECLPage";
import GeneralAssemblyDocumentsPage from "./pages/GeneralAssemblyDocumentsPage";
import FileFormPage from "./pages/FileFormPage";
import BoardMeetingMinutesPage from "./pages/BoardMeetingMinutesPage";
import CongressDocumentsPage from "./pages/CongressDocumentsPage";
import UserFormPage from "./pages/UserFormPage";

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
              <Route path="/ecl" element={<ECLPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/general-assembly-documents"
                element={<GeneralAssemblyDocumentsPage />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/congress-documents"
                element={<CongressDocumentsPage />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/board-meeting-minutes"
                element={<BoardMeetingMinutesPage />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/upload-form" element={<FileFormPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
