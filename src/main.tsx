import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import '@aws-amplify/ui-react/styles.css';
import { Authenticator, ThemeProvider, createTheme } from '@aws-amplify/ui-react';
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Insights from './pages/Insights';
import Goals from './pages/Goals';
import SagaaHealthCarePage from './components/healthcare/SagaaHealthCarePage.tsx';
import SagaaMoneyPage from './components/money/SagaaMoneyPage';
import SagaaLifeEssentialsPage from './components/lifeessentials/SagaaLifeEssentialsPage';
import { LifeEssentialsDashboard } from './components/lifeessentials/LifeEssentialsDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RootRedirect } from './components/RootRedirect';
import { QueryProvider } from './providers/QueryProvider';
import { FinanceSankeyExample } from './components/money/functional/FinanceSankeyExample';
import { FinanceDashboardExample } from './components/money/functional/FinanceDashboardExample';
import { BudgetStatusExample } from './components/money/functional/BudgetStatusExample';
import { TransactionsExample } from './components/money/functional/TransactionsExample';
import { FinanceDashboard } from './components/money/functional/FinanceDashboard.tsx';

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
      { index: true, element: <RootRedirect /> },
      { path: 'home', element: <Home /> },
      { path: 'dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: 'chat', element: <ProtectedRoute><Chat /></ProtectedRoute> },
      { path: 'insights', element: <ProtectedRoute><Insights /></ProtectedRoute> },
      { path: 'goals', element: <ProtectedRoute><Goals /></ProtectedRoute> },
      { path: 'goals/:goalId', element: <ProtectedRoute><Goals /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'healthcare', element: <SagaaHealthCarePage /> },
      { path: 'sagaa-healthcare', element: <SagaaHealthCarePage /> },
      { path: 'healthcare/dashboard', element: <SagaaHealthCarePage /> },
      { path: 'money', element: <SagaaMoneyPage /> },
      { path: 'money/dashboard', element: <ProtectedRoute><FinanceDashboard /></ProtectedRoute> },
      { path: 'money/sankey-test', element: <ProtectedRoute><FinanceSankeyExample /></ProtectedRoute> },
      { path: 'money/dashboard-test', element: <ProtectedRoute><FinanceDashboardExample /></ProtectedRoute> },
      { path: 'money/budget-test', element: <ProtectedRoute><BudgetStatusExample /></ProtectedRoute> },
      { path: 'money/transactions-test', element: <ProtectedRoute><TransactionsExample /></ProtectedRoute> },
      { path: 'life-essentials', element: <SagaaLifeEssentialsPage /> },
      { path: 'sagaa-life-essentials', element: <SagaaLifeEssentialsPage /> },
      { path: 'life/dashboard', element: <ProtectedRoute><LifeEssentialsDashboard /></ProtectedRoute> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider theme={sagaaTheme}>
        <Authenticator.Provider>
          <RouterProvider router={router} />
        </Authenticator.Provider>
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>
);
