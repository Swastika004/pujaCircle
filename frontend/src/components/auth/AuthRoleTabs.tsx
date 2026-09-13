import React from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AuthRoleTabsProps {
  activeRole: 'USER' | 'PRIEST';
  onChange?: (role: 'USER' | 'PRIEST') => void;
  onRoleChange?: (role: 'USER' | 'PRIEST') => void;
  className?: string;
}

/**
 * AuthRoleTabs
 * Fluid segmented role-switcher pill for Auth forms (Devotee vs Purohit).
 * 100% Flexbox, pure solid white background, radiant Haldi gold trims,
 * deep temple vermilion active fill, and sacred Om insignia.
 */
export const AuthRoleTabs: React.FC<AuthRoleTabsProps> = ({
  activeRole,
  onChange,
  onRoleChange,
  className,
}) => {
  const triggerChange = (role: 'USER' | 'PRIEST') => {
    if (onChange) onChange(role);
    if (onRoleChange) onRoleChange(role);
  };

  return (
    <div
      className={cn(
        'w-full bg-white p-1.5 rounded-lg border-2 border-amber-300 shadow-sm mb-4',
        className
      )}
    >
      <div className="flex items-center gap-2 w-full">
        {/* 1. Devotee Tab */}
        <button
          type="button"
          onClick={() => triggerChange('USER')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-xs font-bold transition-all duration-200 select-none cursor-pointer active:scale-[0.98]',
            activeRole === 'USER'
              ? 'bg-[#780016] text-white border-2 border-amber-400 shadow-sm'
              : 'text-stone-700 hover:text-stone-950 hover:bg-amber-50/60'
          )}
          aria-pressed={activeRole === 'USER'}
        >
          <User
            className={cn(
              'h-4 w-4 shrink-0 transition-transform duration-200',
              activeRole === 'USER' ? 'text-amber-300 scale-105' : 'text-stone-500'
            )}
          />
          <span>Devotee</span>
        </button>

        {/* 2. Priest Tab */}
        <button
          type="button"
          onClick={() => triggerChange('PRIEST')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-xs font-bold transition-all duration-200 select-none cursor-pointer active:scale-[0.98]',
            activeRole === 'PRIEST'
              ? 'bg-[#780016] text-white border-2 border-amber-400 shadow-sm'
              : 'text-stone-700 hover:text-stone-950 hover:bg-amber-50/60'
          )}
          aria-pressed={activeRole === 'PRIEST'}
        >
          <span
            className={cn(
              'text-sm font-serif font-black leading-none shrink-0 transition-transform duration-200',
              activeRole === 'PRIEST' ? 'text-amber-300 scale-105' : 'text-amber-600'
            )}
          >
            ॐ
          </span>
          <span>Vedic Purohit</span>
        </button>
      </div>
    </div>
  );
};

export default AuthRoleTabs;
