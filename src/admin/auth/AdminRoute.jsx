import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import ProtectedRoute from "./protectedRoute";
import AdminLayout from "../components/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import HeroManager from "../pages/HeroManager";
import FeatureManager from "../pages/FeatureManager";
import AboutAdmin from "../pages/AboutAdmin";
import ActivitiesAdmin from "../pages/ActivitiesAdmin";
import AcademicsAdmin from "../pages/AcademicsAdmin";
import AdmissionAdmin from "../pages/AdmissionAdmin";
import FacilitiesAdmin from "../pages/FacilitiesAdmin";
import PublicDisclosureAdmin from "../pages/PublicDisclosureAdmin";
import NewsAdmin from "../pages/NewsAdmin";
import FeeAdmin from "../pages/FeeAdmin";
import GalleryAdmin from "../pages/GalleryAdmin";
import TCAdmin from "../pages/TCAdmin";
import AdminEnquiry from "../pages/AdminEnquiry";
import AdminSettings from "../pages/AdminSettings";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      {/* PROTECTED AREA: Dashboard aur baki pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="heroslider" element={<HeroManager />} />
          <Route path="inquiries" element={<AdminEnquiry />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="why-choose-us" element={<FeatureManager />} />
          <Route path="activity" element={<ActivitiesAdmin />} />
          <Route path="details" element={<AcademicsAdmin />} />
          <Route path="admission" element={<AdmissionAdmin />} />
          <Route path="facilities" element={<FacilitiesAdmin />} />
          <Route path="public-disclosure" element={<PublicDisclosureAdmin />} />
          <Route path="news" element={<NewsAdmin />} />
          <Route path="fee" element={<FeeAdmin />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="student-tc" element={<TCAdmin />} />
          <Route path="settings" element={<AdminSettings />} />


        </Route>
      </Route>
    </Routes>
  );
}