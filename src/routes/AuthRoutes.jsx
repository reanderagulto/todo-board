import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStore } from '@stores/auth.store';

const AuthRoutes = () => {
  const { isAuthenticated, hasHydrated } = authStore();
  const location = useLocation();

  if(!hasHydrated) {
    return (
      <div>Checking authentication...</div>
    )
  }

  if(!isAuthenticated) {
    return (
      <Navigate 
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  return <Outlet />
}

export default AuthRoutes
