import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import DashboardLayout from '@layouts/DashboardLayout';
import DefaultLayout from '@layouts/DefaultLayout';

// Authentication Route
import AuthRoutes from '@routes/AuthRoutes';

// Pages
const DashboardHome = lazy(() => import('@pages/DashboardHome'));
const About = lazy(() => import('@pages/About'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const NotFound = lazy(() => import('@pages/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<DefaultLayout><Login /></DefaultLayout>} />
								<Route path="/register" element={<DefaultLayout><Register /></DefaultLayout>} />

        {/* Protected */}
        <Route element={<AuthRoutes />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="about" element={<About />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
