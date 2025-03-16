import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Make sure Navigate is imported
import FormLayout from "./layout/formLayout";
import ReportForm from "./pages/ReportForm";
import ListsOfReports from "./pages/ListsOfReports";
import ReportDetail from "./components/forms/ReportDetail";

const Router = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					{/* Redirect from root (/) to /dashboard */}
					{/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}

					{/* Default layout with nested routes */}
					<Route path="/" element={<FormLayout />}>
						{/* Nested route for Dashboard */}
						<Route path="/" element={<ReportForm />} />
						<Route path="/reportlists" element={<ListsOfReports />} />
						<Route path="reports/:id" element={<ReportDetail />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default Router;
