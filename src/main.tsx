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
import Chat from './pages/Chat';
import Login from './pages/Login';
import SagaaHealthCarePage from './components/healthcare/SagaaHealthCarePage.tsx';

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
      { path: 'chat', element: <Chat /> },
      { path: 'login', element: <Login /> },
      { path: 'healthcare', element: <SagaaHealthCarePage /> },
      { path: 'sagaa-healthcare', element: <SagaaHealthCarePage /> },
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
