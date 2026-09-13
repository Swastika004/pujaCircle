import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { RitualProfile } from '@/types/advisor';

interface RitualProfileState {
  profile: RitualProfile;
  setProfile: (updated: Partial<RitualProfile>) => void;
  resetProfile: () => void;
}

// Default profile holds name only — astrology fields removed in scope-reduction pass
const DEFAULT_PROFILE: RitualProfile = {
  fullName: 'Aditi Sharma',
};

// Implements FR-3 and FR-4 with localStorage persistence for the devotee session
export const useRitualProfileStore = create<RitualProfileState>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,
      setProfile: (updated: Partial<RitualProfile>) =>
        set((state) => ({
          profile: { ...state.profile, ...updated },
        })),
      resetProfile: () => set({ profile: DEFAULT_PROFILE }),
    }),
    {
      name: 'pujacircle-ritual-profile',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
