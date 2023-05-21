import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import Layout from './pages/Layout.jsx';
import { FormToggleProvider } from './context/FormToggleContext.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <FormToggleProvider>
        <RouterProvider router={router} />
      </FormToggleProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
