import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Make sure Navigate is imported
import DefaultLayout from "./layout/default";
import DashboardOverview from "./pages/DashboardOverview";
import ReportPage from "./pages/ReportPage";
import ReportDetail from "./components/ReportDetail";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Redirect from root (/) to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Default layout with nested routes */}
          <Route path="/" element={<DefaultLayout />}>
            {/* Nested route for Dashboard */}
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="reports" element={<ReportPage />} />
			<Route path="reports/:id" element={<ReportDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
