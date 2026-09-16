import React, { useState, useEffect } from 'react';
import { priestApi } from '@/api/priest.api';
import { bookingApi } from '@/api/booking.api';
import { PriestSlot } from '@/types/priest.types';
import { Booking } from '@/types/booking.types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AddSlotModal } from '@/components/priest/AddSlotModal';
import { PriestBookingDetailsDialog } from '@/components/priest/PriestBookingDetailsDialog';
import { formatTime, formatFullDate } from '@/lib/utils';
import {
  Clock,
  Plus,
  Trash2,
  Edit2,
  Calendar as CalendarIcon,
  CheckCircle2,
  ExternalLink,
  CalendarDays,
} from 'lucide-react';
import { toast } from 'sonner';

/**
 * PriestAvailabilityPage
 * Purohit Muhurat and date slot manager.
 * 100% Flexbox, zero CSS grids, zero gradients, pure solid white canvas, Haldi gold trims.
 */
export const PriestAvailabilityPage: React.FC = () => {
  const priestId = priestApi.resolveCurrentPriestId();

  const todayStr = new Date().toISOString().split('T')[0];

  const [slots, setSlots] = useState<PriestSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<PriestSlot | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const fetchSlotsAndBookings = async () => {
    try {
      setIsLoading(true);
      const [slotData, bookingData] = await Promise.all([
        priestApi.getPriestSlots(priestId),
        bookingApi.getPriestBookings(priestId),
      ]);
      setSlots(slotData);
      setBookings(bookingData);
    } catch {
      toast.error('Failed to load availability slots.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlotsAndBookings();
  }, [priestId]);

  // Handle Save (Create or Update)
  const handleSaveSlot = async (
    data: { slotDate: string; startTime: string; endTime: string },
    addAnother: boolean = false
  ): Promise<boolean> => {
    try {
      if (editingSlot) {
        const res = await priestApi.updateAvailabilitySlot(editingSlot.id, priestId, data);
        if (res.success) {
          toast.success(res.message);
          await fetchSlotsAndBookings();
          setEditingSlot(null);
          return true;
        } else {
          toast.error(res.message);
          return false;
        }
      } else {
        const res = await priestApi.createAvailabilitySlot(priestId, data);
        if (res.success) {
          toast.success(res.message);
          await fetchSlotsAndBookings();
          if (!addAnother) {
            setIsAddModalOpen(false);
          }
          return true;
        } else {
          toast.error(res.message);
          return false;
        }
      }
    } catch {
      toast.error('An unexpected error occurred while saving availability.');
      return false;
    }
  };

  // Handle Delete
  const handleDeleteSlot = async (slot: PriestSlot) => {
    if (slot.status === 'BOOKED') {
      toast.error('Cannot delete a booked availability slot.');
      return;
    }

    if (!window.confirm(`Delete availability slot for ${formatFullDate(slot.slotDate || slot.date || '')} (${formatTime(slot.startTime)} - ${formatTime(slot.endTime)})?`)) {
      return;
    }

    try {
      const res = await priestApi.deleteAvailabilitySlot(slot.id, priestId);
      if (res.success) {
        toast.success(res.message);
        fetchSlotsAndBookings();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error('Failed to remove availability slot.');
    }
  };

  // Handle View Booking
  const handleViewBooking = (slot: PriestSlot) => {
    const slotDate = slot.slotDate || slot.date;
    const matchedBooking = bookings.find(
      (b) =>
        b.priestId === priestId &&
        (b.slotId === slot.id || b.availabilitySlotId === slot.id ||
          (b.bookingDate === slotDate && b.startTime === slot.startTime))
    );

    if (matchedBooking) {
      setSelectedBooking(matchedBooking);
      setIsBookingModalOpen(true);
    } else {
      toast.info('Booking details for this time slot are currently being processed.');
    }
  };

  // Separate upcoming and past slots
  const upcomingSlots = slots.filter((s) => (s.slotDate || s.date || '') >= todayStr);

  // Group upcoming slots by date
  const groupedUpcoming: Record<string, PriestSlot[]> = {};
  upcomingSlots.forEach((slot) => {
    const d = slot.slotDate || slot.date || '';
    if (!groupedUpcoming[d]) {
      groupedUpcoming[d] = [];
    }
    groupedUpcoming[d].push(slot);
  });

  const upcomingDates = Object.keys(groupedUpcoming).sort();

  // Metrics
  const totalUpcomingCount = upcomingSlots.length;
  const availableUpcomingCount = upcomingSlots.filter((s) => s.status === 'AVAILABLE').length;
  const bookedUpcomingCount = upcomingSlots.filter((s) => s.status === 'BOOKED').length;

  return (
    <div className="space-y-8 w-full max-w-7xl text-stone-900 pb-12">
      {/* Page Header (100% Flexbox) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-7 rounded-xl border-2 border-amber-300 bg-white shadow-sm">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-md bg-amber-400 text-stone-950 flex items-center justify-center font-serif font-black text-2xl shadow-md shrink-0 select-none">
            ॐ
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-950">
              Availability & Muhurat Slots
            </h1>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Set your specific auspicious date and time windows for devotees to book home ceremonies.
            </p>
          </div>
        </div>

        <Button
          onClick={() => {
            setEditingSlot(null);
            setIsAddModalOpen(true);
          }}
          className="gap-2 text-xs sm:text-sm h-11 px-5 bg-[#780016] hover:bg-red-800 text-white font-bold border border-amber-400 rounded-md shadow-xs cursor-pointer shrink-0 puja-btn-tap"
        >
          <Plus className="h-4 w-4" />
          <span>Add Availability Slot</span>
        </Button>
      </div>

      {/* Metrics Summary Deck (100% Flexbox, Zero CSS Grids) */}
      <div className="flex flex-wrap gap-4 w-full">
        <div className="flex-1 min-w-55 p-5 rounded-lg border-2 border-amber-300 bg-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
              Total Upcoming Slots
            </span>
            <CalendarDays className="h-4 w-4 text-stone-400" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-stone-900 mt-2">
            {totalUpcomingCount}
          </div>
        </div>

        <div className="flex-1 min-w-55 p-5 rounded-lg border-2 border-amber-300 border-t-4 border-t-emerald-600 bg-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Open For Booking
            </span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-emerald-700 mt-2">
            {availableUpcomingCount}
          </div>
        </div>

        <div className="flex-1 min-w-55 p-5 rounded-lg border-2 border-amber-300 border-t-4 border-t-red-700 bg-white shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
              Confirmed Booked
            </span>
            <Clock className="h-4 w-4 text-red-700" />
          </div>
          <div className="text-3xl font-extrabold font-serif text-red-700 mt-2">
            {bookedUpcomingCount}
          </div>
        </div>
      </div>

      {/* SECTION 1: UPCOMING AVAILABILITY */}
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-2 border-b-2 border-amber-200">
          <div>
            <h2 className="text-lg font-extrabold font-serif text-stone-950 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-red-700" />
              <span>Upcoming Muhurat Availability</span>
            </h2>
            <p className="text-xs text-stone-600">
              Dates and time windows currently open or reserved on your sacred schedule.
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-xs text-stone-500 font-medium">
            Loading your availability calendar...
          </div>
        ) : upcomingDates.length === 0 ? (
          <div className="border-2 border-dashed border-amber-300 rounded-xl p-10 text-center bg-white">
            <div className="max-w-md mx-auto space-y-3">
              <div className="h-12 w-12 rounded-md bg-amber-100 text-amber-800 border border-amber-300 mx-auto flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">No Upcoming Availability Set</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                You haven't listed any availability slots yet. Add your available dates and hours so devotees can request bookings.
              </p>
              <Button
                onClick={() => {
                  setEditingSlot(null);
                  setIsAddModalOpen(true);
                }}
                className="gap-2 text-xs h-10 px-5 mt-2 bg-[#780016] hover:bg-red-800 text-white font-bold border border-amber-400 rounded-md cursor-pointer puja-btn-tap"
              >
                <Plus className="h-4 w-4" /> Add Your First Slot
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {upcomingDates.map((dateStr) => {
              const daySlots = groupedUpcoming[dateStr];
              const isToday = dateStr === todayStr;

              return (
                <div key={dateStr} className="space-y-3">
                  {/* Date Heading */}
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-red-700" />
                    <h3 className="text-sm font-bold font-serif text-stone-900">
                      {formatFullDate(dateStr)}
                    </h3>
                    {isToday && (
                      <Badge variant="outline" className="text-[10px] bg-red-50 text-red-800 border-red-300 font-bold">
                        Today
                      </Badge>
                    )}
                    <span className="text-xs text-stone-500">
                      ({daySlots.length} {daySlots.length === 1 ? 'slot' : 'slots'})
                    </span>
                  </div>

                  {/* Slots Flexbox (100% Flexbox, Zero CSS Grids) */}
                  <div className="flex flex-wrap gap-3.5 w-full">
                    {daySlots.map((slot) => {
                      const isAvailable = slot.status === 'AVAILABLE';

                      return (
                        <div
                          key={slot.id}
                          className={`w-full sm:w-[calc(50%-7px)] lg:w-[calc(33.333%-10px)] p-4 rounded-lg border-2 transition-all shadow-xs bg-white space-y-3 ${
                            isAvailable
                              ? 'border-amber-200 hover:border-emerald-500/60'
                              : 'border-amber-300 bg-amber-50/20'
                          }`}
                        >
                          {/* Time & Status Row */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-mono text-sm font-bold text-stone-950">
                                {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                              </div>
                              <span className="text-[11px] text-stone-500 block mt-0.5 font-medium">
                                Shubh Muhurat Window
                              </span>
                            </div>

                            <Badge
                              variant="outline"
                              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm ${
                                isAvailable
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                  : 'bg-red-50 text-red-700 border-red-300'
                              }`}
                            >
                              {isAvailable ? 'AVAILABLE' : 'BOOKED'}
                            </Badge>
                          </div>

                          {/* Card Footer Actions */}
                          <div className="pt-2 border-t border-stone-200 flex items-center justify-end gap-2">
                            {isAvailable ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setEditingSlot(slot);
                                    setIsAddModalOpen(true);
                                  }}
                                  className="h-8 px-2.5 text-xs text-stone-600 hover:text-stone-900 gap-1 rounded-md"
                                >
                                  <Edit2 className="h-3 w-3" /> Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteSlot(slot)}
                                  className="h-8 px-2.5 text-xs text-stone-600 hover:text-red-700 gap-1 rounded-md"
                                >
                                  <Trash2 className="h-3 w-3" /> Delete
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewBooking(slot)}
                                className="h-8 px-3 text-xs gap-1.5 border-amber-300 text-stone-900 hover:bg-amber-50 font-bold rounded-md"
                              >
                                <ExternalLink className="h-3 w-3 text-amber-700" /> View Booking
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Slot Modal */}
      <AddSlotModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingSlot(null);
        }}
        onSave={handleSaveSlot}
        editingSlot={editingSlot}
      />

      {/* Booking Details Modal */}
      <PriestBookingDetailsDialog
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
      />
    </div>
  );
};

export default PriestAvailabilityPage;
