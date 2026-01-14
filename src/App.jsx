import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from '@routes/AppRoutes';
import { authStore } from '@stores/auth.store';

function App() {
		useEffect(() => {
				authStore.getState().initialize();

				return () => authStore.getState().cleanup();
		}, []);

		return (
				<BrowserRouter>
						<AppRoutes />
				</BrowserRouter>
		);
}

export default App;
