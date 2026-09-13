import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { PujaCircleLogo } from '@/components/common/PujaCircleLogo';

export const RouteErrorElement: React.FC = () => {
  const error = useRouteError();

  let errorMessage = 'An unexpected application error occurred.';
  let errorStatus = 'Error';

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status} ${error.statusText}`;
    errorMessage = error.data?.message || error.statusText || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4 sm:p-6 text-stone-900">
      <div className="max-w-lg w-full text-center space-y-6 p-6 sm:p-8 bg-white rounded-xl border-2 border-amber-300 shadow-md">
        {/* Brand Logo & Error Status Header */}
        <div className="flex flex-col items-center gap-3">
          <PujaCircleLogo size={48} className="shadow-xs" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-600" /> {errorStatus}
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-serif text-stone-950">
            Sacred Session Interrupted
          </h1>
          <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
            {errorMessage}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <Button
            size="sm"
            onClick={handleReload}
            className="w-full gap-2 text-xs font-bold h-10 bg-[#780016] hover:bg-red-800 text-white rounded-md"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Reload Page
          </Button>
          <Link to="/" className="w-full">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 text-xs font-bold h-10 border-stone-300 hover:border-amber-400 rounded-md"
            >
              <Home className="h-3.5 w-3.5" /> Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RouteErrorElement;
