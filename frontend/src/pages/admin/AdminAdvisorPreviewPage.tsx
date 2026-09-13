import React from 'react';
import { AdvisorPreviewPanel } from '@/components/advisor/AdvisorPreviewPanel';
import { Compass } from 'lucide-react';

// Admin Advisor QA & Match Quality Preview Page (FR-19)
// Allows administrators to simulate devotee advisor queries and inspect scoring without navigating away
export const AdminAdvisorPreviewPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[hsl(var(--advisor-accent))]" />
            <h1 className="font-serif text-2xl font-bold text-[hsl(var(--foreground))]">
              Advisor QA & Preview Console
            </h1>
          </div>
          <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1">
            Validate the Sankalp Advisor matching algorithm against catalog entries and inspect real-time scoring
          </p>
        </div>
      </div>

      <AdvisorPreviewPanel />
    </div>
  );
};

export default AdminAdvisorPreviewPage;
