import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@layouts/DashboardLayout';
import DashboardHome from '@pages/DashboardHome';
import About from '@pages/About';
import NotFound from "@pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Render Dashboard Layout */}
      <Route path="/" element={<DashboardLayout />}>
        {/* Home Route */}
        <Route index element={<DashboardHome />} />

        {/* About */}
        <Route path="about" element={<About />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>  
  )
}

export default AppRoutes;
