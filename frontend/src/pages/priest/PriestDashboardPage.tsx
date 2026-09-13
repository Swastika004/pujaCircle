import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import {
  mockGetBookings,
  mockGetPriestServices,
  mockGetPriestSlots,
  mockAcceptBooking,
  mockRejectBooking,
  mockCompleteBooking,
} from '@/mocks/mock-api';
import { Booking } from '@/types/booking.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { BookingStatusBadge } from '@/components/booking/BookingStatusBadge';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Check,
  XCircle,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { formatINR } from '@/lib/utils';

/**
 * PriestDashboardPage
 * Operations Command Console for Vedic Purohits and Acharyas.
 * 100% Flexbox, zero CSS grids, zero gradients, pure solid white canvas, Haldi gold trims.
 * Refined hairline borders, luxury typography, and premium card elevations.
 */
export const PriestDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const priestId = user?.id === 'user-priest-1' ? 'priest-1' : user?.id || 'priest-1';

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeServicesCount, setActiveServicesCount] = useState(0);
  const [availableSlotsCount, setAvailableSlotsCount] = useState(0);

  // Reject Modal State
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [bookingToReject, setBookingToReject] = useState<Booking | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchDashboardData = async () => {
    const [bookRes, srvRes, slotRes] = await Promise.all([
      mockGetBookings(undefined, priestId),
      mockGetPriestServices(priestId),
      mockGetPriestSlots(priestId),
    ]);

    if (bookRes.success) setBookings(bookRes.data);
    if (srvRes.success) setActiveServicesCount(srvRes.data.filter((s) => s.isActive).length);
    if (slotRes.success) setAvailableSlotsCount(slotRes.data.filter((s) => s.status === 'AVAILABLE').length);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [priestId]);

  const handleAccept = async (bookingId: string) => {
    setIsProcessing(true);
    try {
      const res = await mockAcceptBooking(bookingId, priestId);
      if (res.success) {
        toast.success(res.message);
        fetchDashboardData();
      } else {
        toast.error(res.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenReject = (booking: Booking) => {
    setBookingToReject(booking);
    setRejectionReason('');
    setRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!bookingToReject) return;
    if (!rejectionReason.trim()) {
      toast.error('Please specify a reason for declining.');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await mockRejectBooking(bookingToReject.id, priestId, rejectionReason.trim());
      if (res.success) {
        toast.success(res.message);
        setRejectModalOpen(false);
        fetchDashboardData();
      } else {
        toast.error(res.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleComplete = async (bookingId: string) => {
    setIsProcessing(true);
    try {
      const res = await mockCompleteBooking(bookingId, priestId);
      if (res.success) {
        toast.success(res.message);
        fetchDashboardData();
      } else {
        toast.error(res.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Operational metrics
  const pendingRequests = bookings.filter((b) => b.status === 'PENDING');
  const upcomingConfirmed = bookings.filter((b) => b.status === 'CONFIRMED');
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED');
  const totalDakshinaRecorded = completedBookings.reduce(
    (acc, b) => acc + (b.servicePrice || b.dakshinaAmount || 0),
    0
  );
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl text-stone-900">
      {/* 1. Header Banner (100% Flexbox) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-3xl border border-amber-200/90 bg-white shadow-md">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-serif font-black text-2xl shadow-md shrink-0 select-none">
            ॐ
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-amber-950 border-amber-300 bg-amber-50 text-[11px] font-bold">
                Purohit Operational Sanctuary
              </Badge>
              <Badge className="bg-emerald-700 text-white text-[11px] font-bold gap-1">
                <ShieldCheck className="h-3 w-3" /> Verified Scholar
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-950">
              {user?.name || 'Acharya Pt. Ramesh Sharma'}
            </h1>
            <p className="text-xs text-stone-600 leading-relaxed">
              Manage your daily puja queue, accept incoming devotee appointments, and log completed vidhis.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-center">
          <Link to="/priest/availability">
            <Button size="sm" variant="outline" className="text-xs gap-1.5 h-10 px-4 rounded-xl border border-amber-300 text-stone-800 hover:bg-amber-50 font-bold cursor-pointer">
              <Clock className="h-3.5 w-3.5 text-amber-600" /> Manage Slots ({availableSlotsCount})
            </Button>
          </Link>
          <Link to="/priest/services">
            <Button size="sm" className="text-xs gap-1.5 h-10 px-4 rounded-xl bg-[#780016] hover:bg-[#600012] text-white border border-amber-400 font-bold shadow-md cursor-pointer">
              <IndianRupee className="h-3.5 w-3.5 text-amber-300" /> Services ({activeServicesCount})
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Key Operational Metrics Flexbox Deck */}
      <div className="flex flex-wrap gap-4 w-full">
        {/* Pending Requests */}
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-5 rounded-2xl border border-amber-200/90 border-t-4 border-t-amber-500 bg-white shadow-sm hover:border-amber-400/80 hover:shadow-md transition-all flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Pending Requests</span>
            <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <Clock className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-serif text-amber-800">{pendingRequests.length}</div>
          <p className="text-[11px] text-stone-500">Awaiting your confirmation</p>
        </div>

        {/* Upcoming Confirmed */}
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-5 rounded-2xl border border-amber-200/90 border-t-4 border-t-[#780016] bg-white shadow-sm hover:border-amber-400/80 hover:shadow-md transition-all flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Upcoming Confirmed</span>
            <div className="h-7 w-7 rounded-lg bg-red-50 text-[#780016] flex items-center justify-center">
              <Calendar className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-serif text-[#780016]">{upcomingConfirmed.length}</div>
          <p className="text-[11px] text-stone-500">Scheduled ceremonies</p>
        </div>

        {/* Completed Ceremonies */}
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-5 rounded-2xl border border-amber-200/90 border-t-4 border-t-emerald-700 bg-white shadow-sm hover:border-amber-400/80 hover:shadow-md transition-all flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Completed Vidhis</span>
            <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-serif text-emerald-800">{completedBookings.length}</div>
          <p className="text-[11px] text-stone-500">Successfully performed</p>
        </div>

        {/* Total Cash Recorded */}
        <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-5 rounded-2xl border border-amber-200/90 border-t-4 border-t-amber-600 bg-white shadow-sm hover:border-amber-400/80 hover:shadow-md transition-all flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Recorded Dakshina</span>
            <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center">
              <IndianRupee className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            ₹{totalDakshinaRecorded.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-stone-500">Direct cash dakshina (0% fee)</p>
        </div>
      </div>

      {/* 3. Pending Requests Queue */}
      {pendingRequests.length > 0 && (
        <div className="rounded-3xl border border-amber-300/80 bg-white shadow-md overflow-hidden">
          <div className="p-4 sm:p-5 bg-amber-50/80 border-b border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-800 shrink-0" />
              <h2 className="text-base font-serif font-bold text-amber-950">
                Action Required: Pending Devotee Requests ({pendingRequests.length})
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-bold w-fit">
              5-Hour Response Window
            </div>
          </div>

          <div className="divide-y divide-stone-100">
            {pendingRequests.map((req) => (
              <div key={req.id} className="p-5 sm:p-6 space-y-4 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-base text-stone-950 font-serif">
                    {req.serviceName}
                  </span>
                  <Badge variant="outline" className="font-mono text-xs font-bold border-amber-300 bg-amber-50/50 text-stone-900">
                    {req.bookingReference}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-stone-700">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <Clock className="h-4 w-4 text-[#780016] shrink-0" />
                    <span>{req.bookingDate} ({req.startTime} - {req.endTime})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>{req.address?.city || req.address?.villageTown || 'Devotee City Location'}</span>
                  </div>
                </div>

                <div className="text-xs text-stone-700">
                  Dakshina: <strong className="font-mono text-[#780016] text-sm font-bold">{formatINR(req.servicePrice || 2100)}</strong> (Cash directly on completion)
                </div>

                {req.userNotes && (
                  <p className="text-xs text-stone-700 italic bg-amber-50/60 p-3 rounded-xl border border-amber-200/70">
                    Devotee Note: "{req.userNotes}"
                  </p>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 border-t border-stone-100">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isProcessing}
                    onClick={() => handleOpenReject(req)}
                    className="text-xs h-10 text-red-700 hover:bg-red-50 border-red-200 rounded-xl w-full sm:w-auto font-bold cursor-pointer"
                  >
                    <XCircle className="h-4 w-4 mr-1" /> Decline Request
                  </Button>
                  <Button
                    size="sm"
                    disabled={isProcessing}
                    onClick={() => handleAccept(req.id)}
                    className="text-xs h-10 gap-1 bg-[#780016] hover:bg-[#600012] text-white rounded-xl w-full sm:w-auto font-bold shadow-sm cursor-pointer"
                  >
                    <Check className="h-4 w-4" /> Accept Appointment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Upcoming Confirmed Appointments */}
      <div className="rounded-3xl border border-amber-200/90 bg-white shadow-md overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-amber-100 bg-white flex flex-row items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">Upcoming Confirmed Ceremonies</h2>
            <p className="text-xs text-stone-600">Appointments accepted and confirmed on your sacred schedule.</p>
          </div>
          <Link to="/priest/bookings" className="text-xs text-[#780016] hover:underline font-bold flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-0">
          {upcomingConfirmed.length === 0 ? (
            <div className="p-10 text-center text-xs text-stone-500 space-y-2">
              <Calendar className="h-10 w-10 mx-auto text-amber-500/50 mb-2" />
              <p className="font-bold text-stone-800 text-sm">No upcoming confirmed ceremonies right now.</p>
              <p className="text-xs text-stone-500">Ensure your availability slots are open for devotees to book rituals.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {upcomingConfirmed.map((b) => (
                <div key={b.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-amber-50/30 transition-colors">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-bold text-base text-stone-950 font-serif">{b.serviceName}</h3>
                      <BookingStatusBadge status={b.status} />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                      <span className="flex items-center gap-1 font-bold text-stone-900">
                        <Clock className="h-3.5 w-3.5 text-[#780016]" /> {b.bookingDate} ({b.startTime} - {b.endTime})
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-amber-600" />
                        {b.address?.houseNo || b.address?.houseBuilding}, {b.address?.villageTown || b.address?.locality}, {b.address?.city}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700">
                      Dakshina: <strong className="font-mono text-[#780016] font-bold">₹{b.servicePrice}</strong> (Cash directly on completion)
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                    <Button
                      size="sm"
                      disabled={isProcessing}
                      onClick={() => handleComplete(b.id)}
                      className="text-xs h-10 px-5 gap-1.5 bg-[#780016] hover:bg-[#600012] text-white font-bold rounded-xl border border-amber-400 w-full sm:w-auto shadow-md cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" /> Mark Completed
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decline Booking Dialog */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent className="sm:max-w-md p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg font-bold text-[#780016]">Decline Ceremony Request</DialogTitle>
            <DialogDescription className="text-xs text-stone-600">
              Decline booking reference <strong>{bookingToReject?.bookingReference}</strong>. The devotee will be notified and your slot will be freed.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 pt-2 text-xs">
            <label className="text-xs font-bold text-stone-800">Reason for Declining (Required)</label>
            <Textarea
              placeholder="e.g. Prior temple commitment or travel schedule conflict."
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="text-xs resize-none rounded-xl border-amber-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
            />
          </div>

          <DialogFooter className="pt-2 gap-2 flex flex-col-reverse sm:flex-row">
            <Button variant="outline" size="sm" onClick={() => setRejectModalOpen(false)} className="text-xs rounded-xl h-10 px-4">
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={isProcessing || !rejectionReason.trim()}
              onClick={handleConfirmReject}
              className="text-xs rounded-xl h-10 px-5 font-bold"
            >
              {isProcessing ? 'Declining...' : 'Confirm Decline'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PriestDashboardPage;
