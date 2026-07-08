import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout/Layout';
import HomePage from './pages/HomePage';
import TeachersPage from './pages/TeachersPage';
import FavoritesPage from './pages/FavoritesPage';
import PrivateRoute from './routes/PrivateRoute';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.TEACHERS} element={<TeachersPage />} />
        <Route
          path={ROUTES.FAVORITES}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default App;
