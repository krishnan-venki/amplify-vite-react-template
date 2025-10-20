import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import '@aws-amplify/ui-react/styles.css';
import { Authenticator, ThemeProvider, createTheme } from '@aws-amplify/ui-react';
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Insights from './pages/Insights';
import SagaaHealthCarePage from './components/healthcare/SagaaHealthCarePage.tsx';
import SagaaMoneyPage from './components/money/SagaaMoneyPage';
import { ProtectedRoute } from './components/ProtectedRoute';

Amplify.configure(outputs);

const themeOverrides = {
  name: 'sagaa-theme',
  tokens: {
    colors: {
      brand: {
        primary: {
          60: '#ff9900',
          80: '#e68a00',
        },
      },
    },
  },
} as const;

const sagaaTheme = createTheme(themeOverrides);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: 'chat', element: <ProtectedRoute><Chat /></ProtectedRoute> },
      { path: 'insights', element: <ProtectedRoute><Insights /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'healthcare', element: <SagaaHealthCarePage /> },
      { path: 'sagaa-healthcare', element: <SagaaHealthCarePage /> },
      { path: 'healthcare/dashboard', element: <SagaaHealthCarePage /> },
      { path: 'money', element: <SagaaMoneyPage /> },
      { path: 'money/dashboard', element: <SagaaMoneyPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={sagaaTheme}>
      <Authenticator.Provider>
        <RouterProvider router={router} />
      </Authenticator.Provider>
    </ThemeProvider>
  </React.StrictMode>
);
