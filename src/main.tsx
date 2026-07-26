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
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <App />
           <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerStyle={{
              zIndex: 10000,
            }}
            toastOptions={{
              duration: 4000,
              style: {
                maxWidth: '360px',
                padding: '16px',
                borderRadius: '12px',
                background: '#ffffff',
                color: '#121417',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
              },
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
            }}
          />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
);
