import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "../pages/public/Home/Home";
import PublicLayout from "../layouts/PublicLayout";
import MembershipGuide from "../pages/public/MembershipGuide/MembershipGuide";
import ScrollToHash from "../components/common/ScrollToHash";
import StartYourJourney from "../pages/public/StartYourJourney/StartYourJourney";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Workout from "../pages/client/dashboard/Workout";
import Diet from "../pages/client/diet/Diet";
import Progress from "../pages/client/progress/Progress";

const AppRoutes = () => {
    console.log("🔥 APP ROUTES IS RENDERING");
  return (
    <BrowserRouter>
      <ScrollToHash />

      <Routes>
        {/* Public */}
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

        <Route
          path="/start-your-journey"
          element={<StartYourJourney />}
        />

        <Route
          path="/login"
          element={<div>Login</div>}
        />

        {/* Client Dashboard */}
        <Route
          path="/client/dashboard"
          element={<DashboardLayout />}
        >
          <Route
            index
            element={<Navigate to="workout" replace />}
          />

          <Route
            path="workout"
            element={<Workout />}
          />

          <Route
            path="diet"
            element={<Diet />}
          />

          <Route
            path="progress"
            element={<Progress />}
          />
        </Route>

        {/* Admin */}
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