import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  IndianRupee,
  User,
} from 'lucide-react';
import {
  DashboardSidebarShell,
  NavItem,
} from '@/components/layout/DashboardSidebarShell';

// PriestLayout
// Refactored using DashboardSidebarShell to eliminate duplication across Priest and Admin portals (Phase 3)
export const PriestLayout: React.FC = () => {
  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/priest/dashboard', icon: LayoutDashboard },
    { label: 'Services & Prices', path: '/priest/services', icon: IndianRupee },
    { label: 'Availability Slots', path: '/priest/availability', icon: Clock },
    { label: 'Appointments Log', path: '/priest/bookings', icon: Calendar },
    { label: 'Priest Profile', path: '/priest/profile', icon: User },
  ];

  return (
    <DashboardSidebarShell
      navItems={navItems}
      workspaceLabel="Purohit Operations"
      topBarLabel="Priest Operations Portal"
      roleLabel="PRIEST"
      profilePath="/priest/profile"
      logoutPath="/priest/login"
    >
      <Outlet />
    </DashboardSidebarShell>
  );
};

export default PriestLayout;
