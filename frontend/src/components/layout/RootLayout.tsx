import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SacredBackground } from '@/components/common/SacredBackground';
import { Toaster } from '@/components/ui/sonner';

export const RootLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col font-sans text-stone-900 relative">
      <SacredBackground />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default RootLayout;
