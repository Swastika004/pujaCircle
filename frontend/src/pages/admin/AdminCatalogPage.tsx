import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  X,
  Layers,
} from 'lucide-react';
import { PujaCatalogEntry } from '@/types/advisor';
import { mockDb } from '@/mocks/data';
import { modalTransition, buttonPress } from '@/motion/variants';

export const AdminCatalogPage: React.FC = () => {
  const [catalog, setCatalog] = useState<PujaCatalogEntry[]>([...mockDb.pujaCatalog]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Modal states for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<PujaCatalogEntry | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [deity, setDeity] = useState('');
  const [category, setCategory] = useState<PujaCatalogEntry['category']>('life-event');
  const [description, setDescription] = useState('');
  const [intentTagsText, setIntentTagsText] = useState('');
  const [samagriText, setSamagriText] = useState('');
  const [stepsText, setStepsText] = useState('');
  const [timingNote, setTimingNote] = useState('');

  const filteredCatalog = catalog.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.intentTags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'ALL' || entry.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingEntry(null);
    setName('');
    setDeity('');
    setCategory('life-event');
    setDescription('');
    setIntentTagsText('');
    setSamagriText('');
    setStepsText('');
    setTimingNote('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (entry: PujaCatalogEntry) => {
    setEditingEntry(entry);
    setName(entry.name);
    setDeity(entry.deity);
    setCategory(entry.category);
    setDescription(entry.description);
    setIntentTagsText(entry.intentTags.join(', '));
    setSamagriText(entry.samagriList.join('\n'));
    setStepsText(entry.steps.join('\n'));
    setTimingNote(entry.timingNote);
    setIsModalOpen(true);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();

    const tags = intentTagsText
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    const samagri = samagriText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const steps = stepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingEntry) {
      // Edit existing entry per FR-18 & FR-21
      const updatedIndex = mockDb.pujaCatalog.findIndex((e) => e.id === editingEntry.id);
      if (updatedIndex !== -1) {
        mockDb.pujaCatalog[updatedIndex] = {
          ...editingEntry,
          name,
          deity,
          category,
          description,
          intentTags: tags,
          samagriList: samagri,
          steps,
          timingNote,
        };
      }
    } else {
      // Add new entry per FR-18 & FR-21
      const newEntry: PujaCatalogEntry = {
        id: `catalog-custom-${Date.now()}`,
        name,
        deity,
        category,
        description,
        intentTags: tags,
        samagriList: samagri,
        steps,
        timingNote: timingNote || 'Auspicious timing determined by tradition.',
      };
      mockDb.pujaCatalog.unshift(newEntry);
    }

    setCatalog([...mockDb.pujaCatalog]);
    setIsModalOpen(false);
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this puja catalog entry?')) {
      // Delete entry from session mockDb per FR-18
      const index = mockDb.pujaCatalog.findIndex((e) => e.id === id);
      if (index !== -1) {
        mockDb.pujaCatalog.splice(index, 1);
        setCatalog([...mockDb.pujaCatalog]);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[hsl(var(--brand-secondary))]" />
            <h1 className="font-serif text-2xl font-bold text-[hsl(var(--brand-secondary))]">
              Puja Catalog Management Console
            </h1>
          </div>
          <p className="text-xs text-[hsl(var(--foreground-muted))] mt-1">
            Curate and moderate rituals, deities, and intent-tag mappings powering the Sankalp Advisor (SRS FR-18)
          </p>
        </div>

        <motion.button
          type="button"
          whileTap={buttonPress}
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--brand-primary))] px-4 py-2 text-xs font-semibold text-white hover:bg-[hsl(var(--brand-primary-dark))] transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Catalog Entry</span>
        </motion.button>
      </div>

      
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[hsl(var(--surface-alt))] p-3 rounded-lg border border-[hsl(var(--border))]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[hsl(var(--foreground-muted))]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by puja name, deity, or tag..."
            className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] pl-9 pr-3 py-1.5 text-xs text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground-muted))] focus:outline-none focus:border-[hsl(var(--brand-primary))]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-[hsl(var(--foreground-muted))]" />
          {['ALL', 'life-event', 'dosha-nivaran', 'festival', 'business', 'ancestral'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[hsl(var(--brand-secondary))] text-white'
                  : 'bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-alt))] border border-[hsl(var(--border))]'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[hsl(var(--foreground))] divide-y divide-[hsl(var(--border))]">
            <thead className="bg-[hsl(var(--surface-alt))] text-[hsl(var(--foreground-muted))] font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Puja / Deity</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Intent Tags (Rules Engine)</th>
                <th className="py-3 px-4">Items / Steps</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {filteredCatalog.map((entry) => (
                <tr key={entry.id} className="hover:bg-[hsl(var(--surface-alt))]/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-[hsl(var(--foreground))]">{entry.name}</div>
                    <div className="text-[11px] text-[hsl(var(--brand-primary))]">
                      Deity: {entry.deity}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded-full bg-[hsl(var(--surface-alt))] px-2 py-0.5 text-[10px] font-medium border border-[hsl(var(--border))]">
                      {entry.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {entry.intentTags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-[hsl(var(--surface-alt))] px-1.5 py-0.5 text-[10px] text-[hsl(var(--foreground-muted))] border border-[hsl(var(--border))]"
                        >
                          {tag}
                        </span>
                      ))}
                      {entry.intentTags.length > 4 && (
                        <span className="text-[10px] text-[hsl(var(--foreground-muted))] pt-0.5">
                          +{entry.intentTags.length - 4} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[hsl(var(--foreground-muted))]">
                    <div>{entry.samagriList.length} samagri items</div>
                    <div>{entry.steps.length} sequential steps</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(entry)}
                        className="rounded p-1.5 text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--surface-alt))] transition-colors"
                        title="Edit Entry"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="rounded p-1.5 text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger))]/10 transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-[hsl(var(--surface-alt))] border-t border-[hsl(var(--border))] text-[11px] text-[hsl(var(--foreground-muted))] flex justify-between items-center">
          <span>Showing {filteredCatalog.length} of {catalog.length} catalog entries</span>
          <span>Session In-Memory Persistence Active (FR-21)</span>
        </div>
      </div>

      
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
            <motion.div
              variants={modalTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 shadow-xl space-y-4 text-xs"
            >
              <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
                <h3 className="font-serif text-lg font-bold text-[hsl(var(--brand-secondary))]">
                  {editingEntry ? 'Edit Catalog Entry' : 'Create New Puja Catalog Entry'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded p-1 text-[hsl(var(--foreground-muted))] hover:bg-[hsl(var(--surface-alt))]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveEntry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[hsl(var(--foreground))] mb-1">
                      Puja Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maha Ganapati Homam"
                      className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-[hsl(var(--foreground))] mb-1">
                      Presiding Deity *
                    </label>
                    <input
                      type="text"
                      required
                      value={deity}
                      onChange={(e) => setDeity(e.target.value)}
                      placeholder="e.g. Lord Ganesha"
                      className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[hsl(var(--foreground))] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PujaCatalogEntry['category'])}
                    className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs"
                  >
                    <option value="life-event">Life Event (Samskara)</option>
                    <option value="dosha-nivaran">Dosha Nivaran (Remedial)</option>
                    <option value="festival">Festival / Seasonal Vrat</option>
                    <option value="business">Business / Commercial</option>
                    <option value="ancestral">Ancestral / Shraddha</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[hsl(var(--foreground))] mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the ritual's significance..."
                    className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[hsl(var(--foreground))] mb-1">
                    Intent Tags (Comma-separated, powers matching engine) *
                  </label>
                  <input
                    type="text"
                    required
                    value={intentTagsText}
                    onChange={(e) => setIntentTagsText(e.target.value)}
                    placeholder="new-home, vastu, flat, apartment, relocation..."
                    className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[hsl(var(--foreground))] mb-1">
                    Samagri List (One item per line)
                  </label>
                  <textarea
                    rows={3}
                    value={samagriText}
                    onChange={(e) => setSamagriText(e.target.value)}
                    placeholder="Copper Kalash&#10;Mango leaves&#10;Havan Samagri..."
                    className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[hsl(var(--foreground))] mb-1">
                    Vedic Vidhi Steps (One step per line)
                  </label>
                  <textarea
                    rows={3}
                    value={stepsText}
                    onChange={(e) => setStepsText(e.target.value)}
                    placeholder="Ganesha Sthapana and Kalash pujan&#10;Navagraha invocation&#10;Havan offering..."
                    className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[hsl(var(--foreground))] mb-1">
                    Auspicious Timing Note
                  </label>
                  <input
                    type="text"
                    value={timingNote}
                    onChange={(e) => setTimingNote(e.target.value)}
                    placeholder="e.g. Shukla Paksha morning hours recommended."
                    className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[hsl(var(--border))]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-md border border-[hsl(var(--border))] px-3 py-1.5 text-xs text-[hsl(var(--foreground-muted))] hover:bg-[hsl(var(--surface-alt))]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-[hsl(var(--brand-primary))] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[hsl(var(--brand-primary-dark))]"
                  >
                    {editingEntry ? 'Update Entry' : 'Create Entry'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCatalogPage;
