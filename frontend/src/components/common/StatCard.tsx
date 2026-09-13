import React from 'react';

export interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ElementType;
  accentColor?: 'red' | 'amber' | 'emerald' | 'blue' | 'purple';
}

// Reusable StatCard component extracted for Priest and Admin dashboards
export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  accentColor = 'amber',
}) => {
  // Color configuration mapping
  const colorStyles = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-[#991B1B]',
      badge: 'text-[#991B1B]',
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      badge: 'text-[#B45309]',
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      badge: 'text-emerald-700',
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      badge: 'text-blue-700',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      badge: 'text-purple-700',
    },
  }[accentColor];

  return (
    <div className="rounded-2xl border border-[hsl(var(--border))] bg-white p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {label}
        </span>
        <div className={`h-9 w-9 rounded-xl ${colorStyles.bg} border ${colorStyles.border} flex items-center justify-center shrink-0`}>
          <Icon className={`h-4.5 w-4.5 ${colorStyles.text}`} />
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          {value}
        </div>
        {subtext && (
          <p className="text-[11px] text-stone-500 font-medium">
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
