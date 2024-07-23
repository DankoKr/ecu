import { useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import AuthContext from "../utils/auth/AuthContext";
import AccessDeniedPage from "./AccessDeniedPage";

function AdminPage() {
  const { user } = useContext(AuthContext);

  if (user.role != "ADMIN") return <AccessDeniedPage />;

  return (
    <MainLayout>
      <h1>Hi admin page</h1>
    </MainLayout>
  );
}

export default AdminPage;
