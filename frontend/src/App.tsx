import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { appRouter } from '@/routes/app-router';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { MotionProvider } from '@/components/common/MotionProvider';
import { Toaster } from '@/components/ui/sonner';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <MotionProvider>
          <RouterProvider router={appRouter} />
          <Toaster position="top-right" richColors closeButton />
        </MotionProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
