import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStore } from '@stores/auth.store';

const AuthRoutes = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const hasHydrated = authStore((state) => state.hasHydrated);
  const location = useLocation();
  
  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-md" />
      </div>
    );
  }
  
  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }
  
  // Authenticated → render protected routes
  return <Outlet />;
}

export default AuthRoutes
