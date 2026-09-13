import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockAdminGetDashboardStats, mockAdminGetPriests } from '@/mocks/mock-api';
import { Priest } from '@/types/priest.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  UserCheck,
  Clock,
  Calendar,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

/**
 * AdminDashboardPage
 * Operations Command Console for PujaCircle Platform Administrators.
 * 100% Flexbox, zero CSS grids, zero gradients, pure solid white canvas, Haldi gold trims.
 */
export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [pendingPriests, setPendingPriests] = useState<Priest[]>([]);

  useEffect(() => {
    async function loadData() {
      const [statsData, priestsRes] = await Promise.all([
        mockAdminGetDashboardStats(),
        mockAdminGetPriests(),
      ]);
      setStats(statsData);
      if (priestsRes.success) {
        setPendingPriests(priestsRes.data.filter((p) => p.approvalStatus === 'PENDING'));
      }
    }
    loadData();
  }, []);
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl text-stone-900">
      {/* Top Operations Header (100% Flexbox) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl border-2 border-amber-300 bg-white shadow-sm">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-serif font-black text-2xl shadow-md shrink-0 select-none">
            ॐ
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
              <span>Platform Operations Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 font-serif">
              Administrative Command
            </h1>
            <p className="text-xs text-stone-600 leading-relaxed">
              Platform health, verified Purohit onboarding queue, and real-time ceremony volume.
            </p>
          </div>
        </div>

        <Link to="/admin/priests" className="w-full sm:w-auto shrink-0">
          <Button size="sm" className="text-xs gap-2 bg-[#780016] hover:bg-red-800 text-white font-bold border border-amber-400 shadow-xs w-full sm:w-auto h-11 px-5 rounded-xl justify-center cursor-pointer puja-btn-tap">
            <Clock className="w-4 h-4 text-amber-300" />
            <span>Review Onboarding ({stats?.pendingPriests ?? 0} Pending)</span>
          </Button>
        </Link>
      </div>

      {/* 1. Stat Cards Deck (100% Flexbox, Zero CSS Grids) */}
      <div className="flex flex-wrap gap-4 w-full">
        {/* Total Devotees */}
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-5 border-2 border-amber-300 border-t-4 border-t-red-700 bg-white shadow-xs rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Total Devotees
            </span>
            <div className="h-9 w-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold font-serif text-stone-900">
              {stats?.totalUsers ?? 0}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>{stats?.activeUsers ?? 0} Active Profiles</span>
            </div>
          </div>
        </div>

        {/* Total Purohits */}
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-5 border-2 border-amber-300 border-t-4 border-t-amber-500 bg-white shadow-xs rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Total Purohits
            </span>
            <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold font-serif text-stone-900">
              {stats?.totalPriests ?? 0}
            </div>
            <div className="text-[11px] text-stone-600 font-medium mt-1">
              <strong className="text-emerald-700 font-bold">{stats?.approvedPriests ?? 0} Verified</strong> • <strong className="text-amber-700 font-bold">{stats?.pendingPriests ?? 0} In Review</strong>
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-5 border-2 border-amber-300 border-t-4 border-t-emerald-600 bg-white shadow-xs rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Total Bookings
            </span>
            <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold font-serif text-stone-900">
              {stats?.totalBookings ?? 0}
            </div>
            <div className="text-[11px] text-stone-600 font-medium mt-1">
              <span className="text-amber-800 font-bold">{stats?.confirmedBookings ?? 0} Confirmed</span> • <span className="text-emerald-700 font-bold">{stats?.completedBookings ?? 0} Completed</span>
            </div>
          </div>
        </div>

        {/* Recorded Cash Volume */}
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-5 border-2 border-amber-300 border-t-4 border-t-red-900 bg-white shadow-xs rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Direct Dakshina
            </span>
            <div className="h-9 w-9 rounded-xl bg-red-100 text-red-800 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-red-700" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900">
              ₹{(stats?.completedDakshinaAmountRecorded ?? 0).toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-stone-500 font-medium mt-1">
              100% direct cash volume
            </div>
          </div>
        </div>
      </div>

      {/* 2. Pending Priest Approval Queue (Flexbox Only, Zero Grids) */}
      <div className="border-2 border-amber-300 bg-white shadow-sm rounded-3xl overflow-hidden">
        <div className="p-6 border-b-2 border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold font-serif text-stone-950">Purohit Verification Queue</h2>
              {pendingPriests.length > 0 && (
                <Badge className="bg-amber-400 text-stone-950 font-bold text-xs">
                  {pendingPriests.length} Action Required
                </Badge>
              )}
            </div>
            <p className="text-xs text-stone-600">
              Verify lineage, Gurukul certification, and mantra credentials before priests appear in public devotee search.
            </p>
          </div>
          <Link to="/admin/priests" className="text-xs text-red-700 hover:text-red-800 font-bold shrink-0 hover:underline">
            View All Purohits Directory →
          </Link>
        </div>

        <div className="p-0 bg-white">
          {pendingPriests.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-600 space-y-2">
              <div className="h-12 w-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 border border-emerald-300">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <p className="font-bold text-base font-serif text-stone-900">All Priest Applications Up To Date</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">There are currently zero pending Purohit onboarding reviews awaiting administrator approval.</p>
            </div>
          ) : (
            <div className="divide-y divide-amber-200">
              {pendingPriests.map((p) => (
                <div key={p.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-amber-50/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <img
                      src={p.profileImageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'}
                      alt={p.fullName}
                      className="h-14 w-14 rounded-2xl object-cover border-2 border-amber-300 shrink-0 shadow-xs"
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-base font-serif text-stone-900">{p.fullName}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-amber-800 bg-amber-100 border border-amber-300">
                          PENDING VERIFICATION
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">
                        <strong className="text-stone-900">{p.experienceYears} Years Experience</strong> • {p.city}, {p.state} • {p.languages?.join(', ')}
                      </p>
                      <p className="text-xs text-stone-500 line-clamp-1">{p.bio}</p>
                    </div>
                  </div>

                  <Link to={`/admin/priests/${p.id}`} className="w-full sm:w-auto shrink-0">
                    <Button size="sm" className="text-xs gap-1.5 h-10 w-full sm:w-auto justify-center font-bold bg-[#780016] hover:bg-red-800 text-white border border-amber-400 rounded-xl shadow-xs px-5 cursor-pointer puja-btn-tap">
                      <span>Audit Credentials</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
