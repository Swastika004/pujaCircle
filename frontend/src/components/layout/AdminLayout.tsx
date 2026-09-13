import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Flame,
  Users,
  BookOpen,
  Compass,
  User,
} from 'lucide-react';
import {
  DashboardSidebarShell,
  NavItem,
} from '@/components/layout/DashboardSidebarShell';

// AdminLayout
// Refactored using DashboardSidebarShell to eliminate duplication across Priest and Admin portals (Phase 3)
export const AdminLayout: React.FC = () => {
  const navItems: NavItem[] = [
    {
      label: 'Operations Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Purohit Approvals & Roster',
      path: '/admin/priests',
      icon: Flame,
    },
    {
      label: 'Registered Devotees',
      path: '/admin/users',
      icon: Users,
    },
    {
      label: 'Puja Catalog CRUD',
      path: '/admin/catalog',
      icon: BookOpen,
    },
    {
      label: 'Advisor QA Preview',
      path: '/admin/advisor-preview',
      icon: Compass,
    },
    {
      label: 'Admin Profile',
      path: '/admin/profile',
      icon: User,
    },
  ];

  return (
    <DashboardSidebarShell
      navItems={navItems}
      workspaceLabel="Admin Operations"
      topBarLabel="Administrative Command Portal"
      roleLabel="ADMIN"
      profilePath="/admin/profile"
      logoutPath="/admin/login"
    >
      <Outlet />
    </DashboardSidebarShell>
  );
};

export default AdminLayout;
