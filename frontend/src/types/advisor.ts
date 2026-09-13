export interface PujaCatalogEntry {
  id: string;
  name: string;
  deity: string;
  description: string;
  intentTags: string[];
  samagriList: string[];
  steps: string[];
  // Static reference text this phase per TRD §4
  timingNote: string;
  category: 'life-event' | 'dosha-nivaran' | 'festival' | 'business' | 'ancestral';
}

// RitualProfile: name-only after astrology fields were removed in scope-reduction pass
export interface RitualProfile {
  fullName: string;
}

export interface AdvisorMatch {
  entry: PujaCatalogEntry;
  score: number;
  reason: string;
}

export interface AdvisorQuery {
  id: string;
  rawInput: string;
  structuredFilters?: {
    occasion?: string;
    concern?: string;
    urgency?: 'low' | 'medium' | 'high';
  };
  matchedEntryIds: string[];
  scores: number[];
  // Populated by matching engine for display
  reasons?: string[];
  matches?: AdvisorMatch[];
  timestamp: string;
}
