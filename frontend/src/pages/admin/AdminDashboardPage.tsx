import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockAdminGetDashboardStats } from '@/mocks/mock-api';
import { mockDb } from '@/mocks/data';
import { StatCard } from '@/components/common/StatCard';
import {
  Users,
  UserCheck,
  Clock,
  Calendar,
  BookOpen,
  Compass,
  ArrowRight,
} from 'lucide-react';

// AdminDashboardPage
// Operations Command Console for PujaCircle Platform Administrators
// Strictly matches Phase 2 spec: Stat cards only:
// 1. Pending Approvals
// 2. Total Devotees (Users)
// 3. Total Bookings
// 4. Catalog Size (replaces Direct Dakshina)
// 5. Total Purohits
// Full management tables removed (managed under /admin/priests and /admin/users).
export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const statsData = await mockAdminGetDashboardStats();
      setStats(statsData);
    }
    loadData();
  }, []);

  const catalogSize = mockDb.pujaCatalog.length;

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl text-stone-900">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl border border-[hsl(var(--border))] bg-white shadow-xs">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-serif font-black text-2xl shadow-xs shrink-0 select-none">
            ॐ
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
              <span>Platform Operations Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Administrative Command
            </h1>
            <p className="text-xs text-stone-600 leading-relaxed">
              Platform governance, verified Purohit onboarding pipeline, and Vedic catalog management.
            </p>
          </div>
        </div>

        <Link
          to="/admin/priests"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#991B1B] hover:bg-[#780016] text-white text-xs font-bold px-5 h-11 transition-colors shadow-xs shrink-0"
        >
          <Clock className="w-4 h-4" />
          <span>Review Onboarding ({stats?.pendingPriests ?? 0} Pending)</span>
        </Link>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          label="Pending Priest Approvals"
          value={stats?.pendingPriests ?? 0}
          subtext={stats?.pendingPriests > 0 ? 'Applications awaiting credential audit' : 'Queue clear'}
          icon={Clock}
          accentColor={stats?.pendingPriests > 0 ? 'red' : 'emerald'}
        />

        <StatCard
          label="Total Devotees"
          value={stats?.totalUsers ?? 0}
          subtext={`${stats?.activeUsers ?? 0} active devotee accounts`}
          icon={Users}
          accentColor="blue"
        />

        <StatCard
          label="Total Bookings"
          value={stats?.totalBookings ?? 0}
          subtext={`${stats?.confirmedBookings ?? 0} confirmed • ${stats?.completedBookings ?? 0} completed`}
          icon={Calendar}
          accentColor="emerald"
        />

        <StatCard
          label="Puja Catalog Size"
          value={catalogSize}
          subtext="Vedic Vidhi ceremonies & regional pujas"
          icon={BookOpen}
          accentColor="purple"
        />

        <StatCard
          label="Total Purohits"
          value={stats?.totalPriests ?? 0}
          subtext={`${stats?.approvedPriests ?? 0} approved • ${stats?.pendingPriests ?? 0} in review`}
          icon={UserCheck}
          accentColor="amber"
        />
      </div>

      
      <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-alt))] p-6 space-y-4">
        <h2 className="font-serif text-base font-bold text-stone-900">
          Platform Governance Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <Link
            to="/admin/priests"
            className="p-4 rounded-xl bg-white border border-[hsl(var(--border))] hover:border-[#C59A3F] transition-all flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-stone-900">Priest Governance</p>
              <p className="text-stone-500 mt-0.5">Audit applications & manage status</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#991B1B]" />
          </Link>

          <Link
            to="/admin/users"
            className="p-4 rounded-xl bg-white border border-[hsl(var(--border))] hover:border-[#C59A3F] transition-all flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-stone-900">User Moderation</p>
              <p className="text-stone-500 mt-0.5">Devotee directory & account safety</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#991B1B]" />
          </Link>

          <Link
            to="/admin/catalog"
            className="p-4 rounded-xl bg-white border border-[hsl(var(--border))] hover:border-[#C59A3F] transition-all flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-stone-900">Puja Catalog CRUD</p>
              <p className="text-stone-500 mt-0.5">Manage ceremonies & samagri</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#991B1B]" />
          </Link>

          <Link
            to="/admin/advisor-preview"
            className="p-4 rounded-xl bg-white border border-[hsl(var(--border))] hover:border-[#C59A3F] transition-all flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-stone-900">Advisor QA Preview</p>
              <p className="text-stone-500 mt-0.5">Inspect matching engine queries</p>
            </div>
            <Compass className="w-4 h-4 text-[hsl(var(--advisor-accent))]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
