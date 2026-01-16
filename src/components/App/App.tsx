import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { authUser } from "@/store/slices/authSlice.ts";
import { useAppDispatch, useAppSelector } from "@/store/store";

import Layout from "../layout/Layout";
import ObjectsPage from "@/components/pages/objects/ObjectsPage";
import ObjectPage from "../pages/object/ObjectPage";
import AuthPage from "@/components/pages/auth/AuthPage";

import ProtectedRoute from "@/components/shared/routes/ProtectedRoute";
import CatalogsPage from "../pages/catalog/CatalogsPage";
import NotFoundPage from "../pages/notPage/NotFoundPage";
import PlannerPage from "../pages/planner/PlannerPage";
import TasksPage from "../pages/tasks/TasksPage";
import AppealsPage from "../pages/appeals/AppealsPage";
import ZonePage from "../pages/zone/ZonePage";

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(authUser());
    }
  }, [isAuthenticated, dispatch]);

  const protectedRoutes = [
    { path: "/", element: <ObjectsPage /> },
    { path: "/object/:id", element: <ObjectPage /> },
    { path: "/catalog", element: <CatalogsPage /> },
    { path: "/planer", element: <PlannerPage /> },
    { path: "/dashboard", element: <TasksPage /> },
    { path: "/appeals", element: <AppealsPage /> },
  ];

  return (
    <Routes>
      {protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <Layout>{element}</Layout>
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/zone/" element={<ZonePage />} />
      <Route path="/zone/:id" element={<ZonePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
