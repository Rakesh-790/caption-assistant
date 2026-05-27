import { useEffect } from 'react';
import './index.css'
import AppRoutes from './routes/AppRoutes'
import { useAuthStore } from './types/store/auth.store';
import { useThemeStore } from './types/store/theme.store';

function App() {

  const checkAuth = useAuthStore((state) => state.checkAuth);
  const theme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    theme();
  },[]);

  return <AppRoutes />
}

export default App
