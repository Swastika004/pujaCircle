import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { mockGetAddresses, mockGetBookings } from '@/mocks/mock-api';
import { Address } from '@/types/address.types';
import { Booking } from '@/types/booking.types';
import { Button } from '@/components/ui/button';
import { BookingStatusBadge } from '@/components/booking/BookingStatusBadge';
import { formatINR, formatDate } from '@/lib/utils';
import {
  Sparkles,
  Search,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Plus,
  ShieldCheck,
  Flame,
  Sun,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  Phone,
  Compass,
  Award,
} from 'lucide-react';

const POPULAR_CEREMONY_TABS = [
  { name: 'All Ceremonies', query: '' },
  { name: 'Griha Pravesh', query: 'Griha Pravesh' },
  { name: 'Satyanarayan Katha', query: 'Satyanarayan' },
  { name: 'Maha Rudrabhishek', query: 'Rudrabhishek' },
  { name: 'Navagraha Havan', query: 'Navagraha' },
  { name: 'Ganapati Havan', query: 'Ganapati' },
  { name: 'Lakshmi Puja', query: 'Lakshmi' },
];

const ALL_POPULAR_CEREMONIES = [
  {
    name: 'Griha Pravesh & Vastu Shanti',
    desc: 'Sacred housewarming ritual with Vastu Purusha invocation for divine positive energy and family harmony.',
    duration: '3 - 3.5 Hours',
    price: '₹3,100',
    icon: Compass,
    search: 'Griha Pravesh',
  },
  {
    name: 'Shri Satyanarayan Vrat Katha',
    desc: 'Traditional thanksgiving puja performed on Purnima or family milestones with holy prasad distribution.',
    duration: '2 - 2.5 Hours',
    price: '₹2,100',
    icon: Sun,
    search: 'Satyanarayan',
  },
  {
    name: 'Maha Rudrabhishek',
    desc: 'Potent Vedic chanting with Panchamrit abhishek to Lord Shiva for health, protection, and inner peace.',
    duration: '2 Hours',
    price: '₹2,500',
    icon: Flame,
    search: 'Rudrabhishek',
  },
  {
    name: 'Navagraha Shanti Havan',
    desc: 'Sacred fire offerings to balance planetary influences, dispel negative doshas, and invite auspiciousness.',
    duration: '2.5 - 3 Hours',
    price: '₹3,500',
    icon: Sparkles,
    search: 'Navagraha',
  },
  {
    name: 'Maha Ganapati Havan',
    desc: 'Auspicious ritual dedicated to Lord Ganesha for removing obstacles before starting any new venture.',
    duration: '1.5 - 2 Hours',
    price: '₹2,100',
    icon: Award,
    search: 'Ganapati',
  },
  {
    name: 'Lakshmi-Kuber Wealth Puja',
    desc: 'Sacred invocation of Goddess Lakshmi and Lord Kuber for financial stability, abundance, and prosperity.',
    duration: '2 Hours',
    price: '₹2,700',
    icon: HeartHandshake,
    search: 'Lakshmi',
  },
];

export const UserHomePage: React.FC = () => {
  const { user } = useAuthStore();
  const [primaryAddress, setPrimaryAddress] = useState<Address | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeCeremonyTab, setActiveCeremonyTab] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        const [addrRes, bookRes] = await Promise.all([
          mockGetAddresses(user.id),
          mockGetBookings(user.id),
        ]);
        if (addrRes.success && addrRes.data.length > 0) {
          const defaultAddr = addrRes.data.find((a) => a.isDefault) || addrRes.data[0];
          setPrimaryAddress(defaultAddr);
        }
        if (bookRes.success) {
          setBookings(bookRes.data);
        }
      } catch (err) {
        console.error('Failed to load user home data', err);
      }
    }
    loadData();
  }, [user]);

  const upcomingBooking = bookings.find((b) => b.status === 'CONFIRMED' || b.status === 'PENDING');

  return (
    <div className="container py-6 sm:py-8 space-y-6 max-w-5xl">
      {/* 1. Auspicious Daily Vedic Panchang Strip */}
      <div className="bg-[#780016] text-white rounded-2xl p-4 sm:p-5 border-2 border-amber-400 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-serif text-xl font-bold shrink-0 shadow-sm">
            ॐ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-300">
                Daily Vedic Panchang & Shubh Muhurat
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            </div>
            <p className="text-xs sm:text-sm font-serif font-bold text-white mt-0.5">
              Bhadrapada Shukla Navami • Vikram Samvat 2083
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/80 border border-amber-400/40 text-amber-200">
            <Sun className="h-3.5 w-3.5 text-amber-400" />
            <span><strong>Abhijit Muhurat:</strong> 11:45 AM – 12:35 PM</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/80 border border-amber-400/40 text-amber-200">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span><strong>Amrit Kaal:</strong> 02:15 PM – 03:45 PM</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Devotee Sanctuary Banner */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-amber-300 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-400 text-stone-900 text-xs font-bold shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-700" />
            <span>Devotee Sanctuary • Vedic Home Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 leading-tight">
            Namaste, {user?.name || 'Devotee'} 🙏
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            May the divine blessings of Lord Ganesha and Goddess Lakshmi bring auspiciousness, peace, and prosperity to your household. Discover verified Gurukul scholars and schedule sacred rituals with direct cash dakshina.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-100 text-red-900 text-[11px] font-semibold">
              <ShieldCheck className="h-3 w-3 text-red-700" />
              100% Gurukul Acharyas
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-[11px] font-semibold">
              <HeartHandshake className="h-3 w-3 text-amber-800" />
              Direct Cash Dakshina
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-[11px] font-semibold">
              <CheckCircle2 className="h-3 w-3 text-emerald-700" />
              Samagri Checklist Provided
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
          <Link to="/user/priests" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto gap-2 text-xs sm:text-sm font-bold bg-red-700 hover:bg-red-800 text-white rounded-xl shadow-md h-11 px-6 active:scale-[0.98] transition-transform cursor-pointer">
              <Search className="h-4 w-4" />
              <span>Find Verified Priests</span>
            </Button>
          </Link>
          <Link to="/user/bookings" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-2 text-xs sm:text-sm font-bold border-2 border-amber-300 text-stone-900 hover:bg-amber-50 rounded-xl h-11 px-5 cursor-pointer">
              <Calendar className="h-4 w-4 text-red-700" />
              <span>My Appointments</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2.5 Quick Ceremony Discovery & Purohit Booking Strip */}
      <div className="rounded-2xl bg-white p-4 sm:p-5 border-2 border-amber-300 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-[#991B1B]" />
            <span className="text-xs font-bold font-serif text-stone-900 uppercase tracking-wider">
              Quick Ceremony Lookup & Purohit Booking
            </span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">
            Select a ceremony to discover available Vedic scholars
          </span>
        </div>

        {/* Ceremony Filter Tabs (Interactive) */}
        <div className="flex flex-wrap items-center gap-2">
          {POPULAR_CEREMONY_TABS.map((tab) => {
            const isSelected = activeCeremonyTab === tab.query;
            return (
              <button
                key={tab.name}
                type="button"
                onClick={() => setActiveCeremonyTab(tab.query)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none active:scale-[0.98] ${isSelected
                    ? 'bg-[#991B1B] text-white shadow-sm border border-[#780016]'
                    : 'text-stone-700 hover:text-[#991B1B] hover:bg-amber-50 border border-stone-200'
                  }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* CTA Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-amber-100">
          <p className="text-xs text-stone-600">
            {activeCeremonyTab
              ? `Filtered for ${activeCeremonyTab} rituals & verified acharyas`
              : 'Showing all authentic home rituals & certified Purohits'}
          </p>
          <Link
            to={
              activeCeremonyTab
                ? `/user/priests?searchQuery=${encodeURIComponent(activeCeremonyTab)}`
                : '/user/priests'
            }
          >
            <Button
              size="sm"
              className="gap-1.5 text-xs font-bold bg-[#991B1B] hover:bg-[#780016] text-white rounded-xl h-9 px-4 cursor-pointer shadow-xs"
            >
              <span>{activeCeremonyTab ? `Find ${activeCeremonyTab} Priests` : 'Discover Available Priests'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 3. Quick Status & Sanctum Location Strip (Flexbox Only, Zero Grids) */}
      <div className="flex flex-wrap gap-4 w-full">
        {/* Address Status Card */}
        <div className="w-full md:w-[calc(60%-8px)] bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
              <MapPin className="h-4 w-4 text-red-700" />
              <span>Primary Puja Sanctum (Location)</span>
            </div>
            <Link to="/user/addresses" className="inline-flex items-center gap-1 text-xs text-red-700 hover:text-red-800 hover:underline font-bold">
              <span>{primaryAddress ? 'Change Address' : 'Add Address'}</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="pt-3 text-sm">
            {primaryAddress ? (
              <div className="space-y-2">
                <div>
                  <p className="font-bold text-stone-900 font-serif text-base">
                    {primaryAddress.houseNo || primaryAddress.houseBuilding}, {primaryAddress.villageTown || primaryAddress.locality}
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {primaryAddress.city}, {primaryAddress.district}, {primaryAddress.state} -{' '}
                    <strong className="font-mono text-stone-900">{primaryAddress.pincode}</strong>
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-medium">
                  <CheckCircle2 className="h-3 w-3 text-emerald-700" />
                  <span>Purohits within 15 km prioritized for morning muhurat timings</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs">
                <span>Please save your home PIN code & address to enable location-based priest discovery.</span>
                <Link to="/user/addresses">
                  <Button size="sm" className="h-8 text-xs gap-1 bg-red-700 hover:bg-red-800 text-white rounded-lg">
                    <Plus className="h-3 w-3" /> Add Now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 4 Sacred Assurances Card */}
        <div className="w-full md:w-[calc(40%-8px)] bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-3 border-b border-amber-100 text-xs font-bold text-stone-800 uppercase tracking-wider">
            <Award className="h-4 w-4 text-amber-600" />
            <span>The 4 PujaCircle Vows</span>
          </div>

          <div className="pt-3 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <span className="h-4 w-4 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
              <span>100% Gurukul-accredited Purohits</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <span className="h-4 w-4 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
              <span>Customized Shastric Samagri checklist</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <span className="h-4 w-4 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
              <span>Zero Online Advance • Direct Cash Dakshina</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <span className="h-4 w-4 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold shrink-0">4</span>
              <span>Auspicious Shubh Muhurat Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Upcoming Booking Card with Live 4-Step Vedic Timeline */}
      {upcomingBooking ? (
        <div className="w-full bg-white border-2 border-amber-300 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-red-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-stone-950">
                  Upcoming Ceremony Appointment
                </h3>
                <p className="text-xs text-stone-600">
                  Booking Reference: <span className="font-mono font-bold text-stone-900">{upcomingBooking.bookingReference}</span>
                </p>
              </div>
            </div>
            <BookingStatusBadge status={upcomingBooking.status} />
          </div>

          <div className="p-5 space-y-5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <p className="font-bold text-lg text-stone-900 font-serif">
                  {upcomingBooking.serviceName}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-700">
                  <span className="flex items-center gap-1 font-semibold text-stone-900">
                    <Clock className="h-3.5 w-3.5 text-amber-600" />
                    {formatDate(upcomingBooking.bookingDate)} ({upcomingBooking.startTime} - {upcomingBooking.endTime})
                  </span>
                  <span>
                    Appointed Priest: <strong className="text-stone-900">{upcomingBooking.priest?.displayName || 'Priest'}</strong>
                  </span>
                  <span>
                    Dakshina: <strong className="text-red-800 font-serif text-sm">{formatINR(upcomingBooking.servicePrice || upcomingBooking.dakshinaAmount || 2100)}</strong> (Pay after puja)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {upcomingBooking.status === 'CONFIRMED' && upcomingBooking.priest?.phoneNumber && (
                  <a
                    href={`tel:${upcomingBooking.priest.phoneNumber}`}
                    className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-xl border border-emerald-400 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 text-xs font-bold transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Call Priest</span>
                  </a>
                )}
                <Link to={`/user/bookings/${upcomingBooking.id}`}>
                  <Button className="gap-1.5 text-xs font-bold bg-red-700 hover:bg-red-800 text-white rounded-xl h-9 px-4 cursor-pointer shadow-xs">
                    <span>View Details & Samagri</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Live 4-Step Vedic Progress Tracker */}
            <div className="pt-4 border-t border-amber-100/80">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-stone-700 uppercase tracking-wider font-serif">
                  Ritual Preparation Milestones
                </p>
                <span className="text-[11px] text-stone-500 font-medium">Step 2 of 4 in progress</span>
              </div>

              {/* Progress Track Container (Responsive with horizontal overflow protection) */}
              <div className="w-full overflow-x-auto pb-2 pt-1">
                <div className="flex items-start justify-between min-w-125 sm:min-w-0 w-full relative">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center flex-1 z-10">
                    <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ring-4 ring-white">
                      ✓
                    </div>
                    <p className="text-xs font-bold text-stone-900 mt-2">1. Booking Placed</p>
                    <p className="text-[11px] text-stone-500">Details recorded</p>
                  </div>

                  {/* Connecting Line 1 -> 2 */}
                  <div className="flex-1 self-start mt-4 px-2 -mx-4 z-0">
                    <div className="h-1 w-full bg-emerald-500 rounded-full"></div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center flex-1 z-10">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ring-4 ring-white ${
                      upcomingBooking.status === 'CONFIRMED'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500 text-stone-950 animate-pulse'
                    }`}>
                      {upcomingBooking.status === 'CONFIRMED' ? '✓' : '2'}
                    </div>
                    <p className="text-xs font-bold text-stone-900 mt-2">2. Priest Confirmed</p>
                    <p className="text-[11px] text-stone-500">
                      {upcomingBooking.status === 'CONFIRMED' ? 'Purohit accepted' : 'Awaiting confirmation'}
                    </p>
                  </div>

                  {/* Connecting Line 2 -> 3 */}
                  <div className="flex-1 self-start mt-4 px-2 -mx-4 z-0">
                    <div className="h-1 w-full bg-stone-200 rounded-full"></div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center text-center flex-1 z-10">
                    <div className="h-8 w-8 rounded-full bg-stone-100 text-stone-500 border-2 border-stone-300 flex items-center justify-center text-xs font-bold shrink-0 ring-4 ring-white">
                      3
                    </div>
                    <p className="text-xs font-bold text-stone-700 mt-2">3. Samagri Prep</p>
                    <p className="text-[11px] text-stone-500">Checklist shared</p>
                  </div>

                  {/* Connecting Line 3 -> 4 */}
                  <div className="flex-1 self-start mt-4 px-2 -mx-4 z-0">
                    <div className="h-1 w-full bg-stone-200 rounded-full"></div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex flex-col items-center text-center flex-1 z-10">
                    <div className="h-8 w-8 rounded-full bg-stone-100 text-stone-500 border-2 border-stone-300 flex items-center justify-center text-xs font-bold shrink-0 ring-4 ring-white">
                      4
                    </div>
                    <p className="text-xs font-bold text-stone-700 mt-2">4. Purnahuti</p>
                    <p className="text-[11px] text-stone-500">Cash dakshina</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white border-2 border-amber-300 rounded-3xl shadow-xs text-center py-10 px-6">
          <div className="max-w-md mx-auto space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-red-700 border-2 border-amber-300">
              <Flame className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold font-serif text-stone-900">No Active Puja Appointments</h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                Planning an auspicious family milestone, housewarming, or havan? Discover verified Vedic Purohits in your city and book your auspicious date.
              </p>
            </div>
            <Link to="/user/priests">
              <Button className="gap-2 text-xs font-bold bg-red-700 hover:bg-red-800 text-white rounded-xl shadow-md h-10 px-5 cursor-pointer">
                <Search className="h-3.5 w-3.5" /> Discover Vedic Purohits
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* 5. Popular Vedic Ceremonies Catalog (6 Rich Cards, Flexbox Only, Zero Grids) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-serif text-stone-900">Popular Vedic Ceremonies</h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Performed with authentic Vedic Vidhi, Sanskrit chanting, and complete samagri guidance.
            </p>
          </div>
          <Link to="/user/priests" className="text-xs text-red-700 hover:text-red-800 hover:underline font-bold shrink-0">
            View all Purohits →
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 w-full">
          {ALL_POPULAR_CEREMONIES.filter(
            (item) =>
              !activeCeremonyTab ||
              item.name.toLowerCase().includes(activeCeremonyTab.toLowerCase()) ||
              item.search.toLowerCase().includes(activeCeremonyTab.toLowerCase())
          ).map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.name}
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] bg-white border-2 border-amber-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-amber-400 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-amber-100 text-red-700 border border-amber-300 flex items-center justify-center shrink-0">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full">
                      {item.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base font-serif text-stone-900 group-hover:text-red-700 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-amber-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">
                      Dakshina from
                    </span>
                    <span className="text-base font-bold text-red-800 font-serif">
                      {item.price}
                    </span>
                  </div>

                  <Link
                    to={`/user/priests?searchQuery=${encodeURIComponent(item.search)}`}
                    className="inline-flex items-center gap-1 text-xs text-red-700 font-bold hover:text-red-800 hover:underline cursor-pointer"
                  >
                    <span>Find Priests</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;

