import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import GeneralError from '@/pages/errors/general-error'
import NotFoundError from '@/pages/errors/not-found-error'
import NetworkError from '@/pages/errors/network-error'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    const navigate = useNavigate();

    React.useEffect(() => {
      function onOffline() {
        navigate({
          to: "/NetworkError",
          replace: true,
          search: {
            returnTo: window.location.pathname,
          },
        });
      }

      window.addEventListener("offline", onOffline);
      return () => window.removeEventListener("offline", onOffline);
    }, [navigate]);

    return (
      <>
        <NavigationProgress />
        <Outlet />
        <Toaster duration={50000} />
      </>
    );
  },

  // 🌟 404 page
  notFoundComponent: NotFoundError,

  // 🌟 Custom error handling logic
  errorComponent: ({ error }: any) => {
    const offline = !navigator.onLine;

    const axiosNetworkError = error?.isAxiosError && !error?.response;

    const fetchNetworkError =
      error instanceof TypeError &&
      (error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError"));

    const isNetworkError = offline || axiosNetworkError || fetchNetworkError;

    if (isNetworkError) {
      return <NetworkError />;
    }
    return <GeneralError />;
  },
})