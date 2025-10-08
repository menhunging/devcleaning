import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "@/components/pages/home/HomePage";
import AuthPage from "@/components/pages/auth/AuthPage";

import ProtectedRoute from "@/components/shared/routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <HomePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
