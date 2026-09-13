import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate?: string | Date;
  onExpire?: () => void;
  compact?: boolean;
  label?: string;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onExpire,
  compact = false,
  label = 'Priest response deadline',
  className,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    isUrgent: boolean;
  } | null>(null);

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft(null);
      return;
    }

    const calculateTime = () => {
      const targetTime = new Date(targetDate).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true, isUrgent: false });
        if (onExpire) onExpire();
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const isUrgent = diff < 60 * 60 * 1000; // Less than 1 hour

      setTimeLeft({ hours, minutes, seconds, isExpired: false, isUrgent });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  if (!targetDate || !timeLeft) return null;

  const pad = (n: number) => String(n).padStart(2, '0');

  if (timeLeft.isExpired) {
    if (compact) {
      return (
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-sm',
            className
          )}
        >
          <AlertTriangle className="w-3 h-3" />
          SLA Expired
        </span>
      );
    }
    return (
      <div
        className={cn(
          'flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-sm',
          className
        )}
      >
        <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
        <div>
          <span className="font-semibold">Response window expired.</span> Booking has exceeded the 5-hour SLA and will be released.
        </div>
      </div>
    );
  }

  const timeString = `${timeLeft.hours}h ${pad(timeLeft.minutes)}m ${pad(timeLeft.seconds)}s`;

  if (compact) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold border rounded-sm transition-colors',
          timeLeft.isUrgent
            ? 'text-amber-800 bg-amber-50 border-amber-300'
            : 'text-stone-700 bg-stone-50 border-stone-200',
          className
        )}
      >
        <Clock className={cn('w-3.5 h-3.5', timeLeft.isUrgent ? 'text-amber-600 animate-pulse' : 'text-stone-500')} />
        <span>{timeString} left</span>
      </span>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3.5 rounded-sm border transition-colors',
        timeLeft.isUrgent
          ? 'bg-amber-50/80 border-amber-300 text-amber-900'
          : 'bg-stone-50 border-stone-200 text-stone-800',
        className
      )}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={cn(
            'w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border',
            timeLeft.isUrgent
              ? 'bg-amber-100 border-amber-200 text-amber-700'
              : 'bg-white border-stone-200 text-stone-600'
          )}
        >
          <Clock className={cn('w-4 h-4', timeLeft.isUrgent && 'animate-pulse')} />
        </div>
        <div>
          <p className="text-xs font-medium text-stone-500">{label}</p>
          <p className="text-xs text-stone-600">Priest must accept within 5 hours to confirm slot.</p>
        </div>
      </div>
      <div className="text-right">
        <span
          className={cn(
            'font-mono text-sm font-bold tracking-tight px-2 py-1 rounded-sm border',
            timeLeft.isUrgent
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-white text-stone-900 border-stone-200'
          )}
        >
          {timeString}
        </span>
      </div>
    </div>
  );
};
