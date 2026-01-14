
import { useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@routes/AppRoutes';
import { authStore } from '@stores/auth.store';

function App() {
  const initialize = authStore((state) => state.initialize);
  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
