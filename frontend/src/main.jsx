import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import Layout from './pages/Layout.jsx';
import { FormToggleProvider } from './context/FormToggleContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FormToggleProvider>
      <RouterProvider router={router} />
    </FormToggleProvider>
  </React.StrictMode>
);
