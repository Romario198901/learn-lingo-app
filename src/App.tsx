import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import TeachersPage from './pages/TeachersPage';
import PrivateRoute from './routes/PrivateRoute';
import FavouritesPage from './pages/FavouritesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route
        path="/favorites"
        element={
          <PrivateRoute>
            <FavouritesPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
