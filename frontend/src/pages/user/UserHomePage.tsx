import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { mockGetBookings } from '@/mocks/mock-api';
import { Booking } from '@/types/booking.types';
import { Button } from '@/components/ui/button';
import { BookingStatusBadge } from '@/components/booking/BookingStatusBadge';
import { formatINR, formatDate } from '@/lib/utils';
import {
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  Compass,
  Users,
} from 'lucide-react';

// UserHomePage
// Devotee Sanctuary Home Portal
// Strictly matches Phase 2 spec:
// 1. Welcome banner
// 2. Prominent Ask-the-Advisor CTA card
// 3. Upcoming booking summary card with link to details
// 4. Link to full bookings list
// All extra clutter (tabs, address card, vows card, progress tracker) removed.
export const UserHomePage: React.FC = () => {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        const bookRes = await mockGetBookings(user.id);
        if (bookRes.success) {
          setBookings(bookRes.data);
        }
      } catch (err) {
        console.error('Failed to load devotee bookings', err);
      }
    }
    loadData();
  }, [user]);

  // Find most relevant upcoming booking (PENDING or CONFIRMED)
  const upcomingBooking = bookings.find((b) => b.status === 'CONFIRMED' || b.status === 'PENDING');

  return (
    <div className="container py-8 space-y-8 max-w-4xl mx-auto px-4">
      
      <div className="rounded-xl bg-white p-6 sm:p-8 border border-[hsl(var(--border))] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-amber-50 border border-amber-300 text-stone-900 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-amber-700" />
            <span>Devotee Sanctuary • Vedic Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 leading-tight">
            Namaste, {user?.name || 'Devotee'} 🙏
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Welcome to your sacred home portal. Schedule home ceremonies with verified Gurukul Purohits across West Bengal and prepare personalized ritual sankalp vidhis.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <Link to="/priests" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto gap-2 text-xs sm:text-sm font-bold bg-[#991B1B] hover:bg-[#780016] text-white rounded-md shadow-xs h-10 px-5">
              <Users className="h-4 w-4" />
              <span>Browse Priests</span>
            </Button>
          </Link>
        </div>
      </div>

      
      <div className="rounded-xl bg-[#780016] text-white p-6 sm:p-8 border border-[#C59A3F]/60 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-400 text-red-950 text-xs font-extrabold shadow-xs">
            <Compass className="h-3.5 w-3.5 text-red-950" />
            <span>Sankalp Vedic Advisor</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
            Unsure which Puja is right for your milestone?
          </h2>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            Describe your family occasion, milestone, or spiritual intent. The Sankalp Advisor instantly recommends the ideal Vedic ritual, auspicious timings, and samagri requirements.
          </p>
        </div>

        <div className="z-10 shrink-0 w-full sm:w-auto">
          <Link to="/advisor" className="w-full sm:w-auto inline-block">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm h-11 px-6 rounded-md shadow-sm gap-2"
            >
              <span>Ask the Advisor</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#991B1B]" />
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Upcoming Ceremony Appointment
            </h2>
          </div>
          <Link
            to="/user/bookings"
            className="text-xs font-semibold text-[#991B1B] hover:text-[#780016] hover:underline inline-flex items-center gap-1"
          >
            <span>View All Bookings ({bookings.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {upcomingBooking ? (
          <div className="w-full bg-white border border-[hsl(var(--border))] rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <div>
                <span className="text-[11px] font-mono text-stone-500 block">
                  Reference: {upcomingBooking.bookingReference}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                  {upcomingBooking.serviceName}
                </h3>
              </div>
              <BookingStatusBadge status={upcomingBooking.status} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-semibold">Date & Time</span>
                  <span className="font-semibold text-stone-900">
                    {formatDate(upcomingBooking.bookingDate)} ({upcomingBooking.startTime} - {upcomingBooking.endTime})
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Appointed Purohit</span>
                <span className="font-semibold text-stone-900">
                  {upcomingBooking.priest?.displayName || 'Vedic Priest'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Dakshina</span>
                <span className="font-serif text-sm font-bold text-[#991B1B]">
                  {formatINR(upcomingBooking.servicePrice || upcomingBooking.dakshinaAmount || 2100)}
                </span>
                <span className="text-[10px] text-stone-500 ml-1">(Pay in cash after puja)</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link to={`/user/bookings/${upcomingBooking.id}`}>
                <Button size="sm" className="bg-[#991B1B] hover:bg-[#780016] text-white font-bold text-xs gap-1.5 rounded-md">
                  <span>View Details & Samagri</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full bg-white border border-[hsl(var(--border))] rounded-lg p-8 text-center space-y-3 shadow-xs">
            <p className="text-xs sm:text-sm text-stone-600">
              You do not have any active appointments scheduled at this moment.
            </p>
            <Link to="/priests" className="inline-block">
              <Button size="sm" variant="outline" className="text-xs font-bold border-stone-300 rounded-md gap-1.5">
                <span>Explore Verified Priests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHomePage;
