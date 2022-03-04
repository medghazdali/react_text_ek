import React from 'react';
import { Outlet, Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/header.component";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const HomePage = lazy(() => import('./pages/home/home.page'));
const NotFoundComponent = lazy(() => import('./components/not-found.component'));

const queryClient = new QueryClient()

function Layout() {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<p>loading...</p>}>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="*" element={<NotFoundComponent />} />
            </Route>
          </Routes>
        </Suspense>
      </QueryClientProvider>

    </>
  );
}

export default App;
