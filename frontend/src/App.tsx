import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/routes/app-router';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { MotionProvider } from '@/components/common/MotionProvider';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <MotionProvider>
        <RouterProvider router={appRouter} />
      </MotionProvider>
    </ErrorBoundary>
  );
};

export default App;
