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
import SubmissionSuccess from "../pages/public/StartYourJourney/SubmissionSuccess";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Workout from "../pages/client/dashboard/Workout";
import Diet from "../pages/client/dashboard/Diet";
import Progress from "../pages/client/dashboard/Progress";
import GrindWalkthrough from "../pages/public/GrindWalkthrough/GrindWalkthrough";
import GlobalLoader from "../components/common/GlobalLoader";
import Enrollment from "../pages/public/Enrollment/Enrollment";

// 🚀 Newly Added Auth & Admin Pages
import Login from "../pages/auth/Login";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardOverview from "../pages/admin/DashboardOverview";
import ClientsList from "../pages/admin/clients/ClientsList";
import CreateClient from "../pages/admin/clients/CreateClient";
import ClientDetails from "../pages/admin/clients/ClientDetails";
import CreatePlan from "../pages/admin/plans/CreatePlan";
import ImportWorkout from "../pages/admin/plans/ImportWorkout";
import AddProgress from "../pages/admin/progress/AddProgress";
import AddDiet from "../pages/admin/progress/AddDiet";
import Coupons from "../pages/admin/business/Coupons";
import AffiliateDashboard from "../pages/admin/business/AffiliateDashboard";

const AppRoutes = () => {
  console.log("🔥 APP ROUTES IS RENDERING");
  const BASE_PATH = "/GRIND";
  return (
    <BrowserRouter basename={BASE_PATH}>
      <GlobalLoader />
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

        {/* Submission Success */}
        <Route
          path="/submission-success"
          element={<SubmissionSuccess />}
        />

        {/* Auth */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="/client/login" element={<Navigate to="/login" replace />} />

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
        <Route
          path="/grind-walkthrough"
          element={<GrindWalkthrough />}
        />

        <Route
          path="/client/enrollment"
          element={<Enrollment />}
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Admin Dashboard */}
        <Route element={<ProtectedRoute fallbackPath="/admin/login" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardOverview />} />

            <Route path="clients" element={<ClientsList />} />
            <Route path="clients/create" element={<CreateClient />} />
            <Route path="clients/details/:id" element={<ClientDetails />} />

            <Route path="plans/create" element={<CreatePlan />} />
            <Route path="plans/import" element={<ImportWorkout />} />

            <Route path="progress/add" element={<AddProgress />} />
            <Route path="diet/add" element={<AddDiet />} />

            <Route path="business/coupons" element={<Coupons />} />
            <Route path="business/affiliate" element={<AffiliateDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
