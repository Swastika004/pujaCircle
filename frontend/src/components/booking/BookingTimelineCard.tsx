import React from 'react';
import { BookingStatus } from '@/types/booking.types';
import { Check, Clock, CalendarCheck, Ban } from 'lucide-react';

interface BookingTimelineCardProps {
  status: BookingStatus;
  createdAt?: string;
  confirmedAt?: string;
  completedAt?: string;
}

/**
 * BookingTimelineCard
 * Strictly Flexbox layout with solid circular step indicators
 * and double hairline Haldi gold framing. Pure solid white canvas, zero CSS grids.
 */
export const BookingTimelineCard: React.FC<BookingTimelineCardProps> = ({
  status,
}) => {
  const isCancelled = status === 'CANCELLED';
  const isRejected = status === 'REJECTED';
  const isExpired = status === 'EXPIRED';

  const steps = [
    {
      label: 'Sankalp Request',
      desc: 'Devotee submitted ceremony request',
      isCompleted: true,
      icon: Check,
    },
    {
      label: 'Purohit Confirmation',
      desc: isRejected ? 'Declined by Priest' : isExpired ? 'Request Expired' : 'Purohit accepted slot',
      isCompleted: status === 'CONFIRMED' || status === 'COMPLETED',
      isCurrent: status === 'PENDING',
      isFailed: isRejected || isExpired,
      icon: isRejected ? Ban : Clock,
    },
    {
      label: 'Sacred Vidhi & Dakshina',
      desc: isCancelled ? 'Appointment Cancelled' : 'In-home ritual & cash dakshina',
      isCompleted: status === 'COMPLETED',
      isCurrent: status === 'CONFIRMED',
      isFailed: isCancelled,
      icon: CalendarCheck,
    },
  ];

  return (
    <div className="w-full bg-white border-2 border-amber-300 rounded-2xl p-5 shadow-xs">
      <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-700" />
        <span>Sacred Ceremony Appointment Progress</span>
      </h3>

      {/* Sequential Flexbox Stepper */}
      <div className="flex flex-col sm:flex-row items-stretch justify-between gap-3 sm:gap-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          let badgeBg = 'bg-stone-100 text-stone-500 border-stone-300';
          let cardBorder = 'border-stone-200 bg-white';

          if (step.isCompleted) {
            badgeBg = 'bg-[#780016] text-white border-amber-400 shadow-xs';
            cardBorder = 'border-2 border-amber-300 bg-white';
          } else if (step.isCurrent) {
            badgeBg = 'bg-amber-400 text-stone-950 border-amber-600 shadow-xs';
            cardBorder = 'border-2 border-amber-400 bg-white ring-2 ring-amber-400/20';
          } else if (step.isFailed) {
            badgeBg = 'bg-red-700 text-white border-red-800';
            cardBorder = 'border-2 border-red-300 bg-white';
          }

          return (
            <div
              key={idx}
              className={`flex-1 flex items-start gap-3 p-3.5 rounded-xl ${cardBorder} transition-all`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${badgeBg}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-stone-900 font-serif">{step.label}</p>
                <p className="text-[11px] text-stone-600 leading-tight">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingTimelineCard;
