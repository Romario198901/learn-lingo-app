import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'modern-normalize';
import './index.css';
import App from './App.tsx';
import AuthProvider from './context/AuthProvider.tsx';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from './components/QueryProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
