import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home/Home";
import PublicLayout from "../layouts/PublicLayout";
import MembershipGuide from "../pages/public/MembershipGuide/MembershipGuide";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/membership-guide"
          element={
            <PublicLayout>
              <MembershipGuide />
            </PublicLayout>
          }
        />

        <Route path="/login" element={<div>Login</div>} />

        <Route
          path="/client/dashboard"
          element={<div>Client Dashboard</div>}
        />

        <Route
          path="/client/workout"
          element={<div>Workout</div>}
        />

        <Route
          path="/client/diet"
          element={<div>Diet</div>}
        />

        <Route
          path="/client/progress"
          element={<div>Progress</div>}
        />

        <Route
          path="/admin/login"
          element={<div>Admin Login</div>}
        />

        <Route
          path="/admin/dashboard"
          element={<div>Admin Dashboard</div>}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;