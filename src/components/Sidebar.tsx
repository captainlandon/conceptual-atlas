import React from 'react';
import { Concept } from '../types/concept';

interface SidebarProps {
  concepts: Concept[];
  selectedId: string;
  onSelectConcept: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  concepts,
  selectedId,
  onSelectConcept,
  searchQuery,
  onSearchChange,
}) => {
  const query = searchQuery.trim().toLowerCase();

  const filteredConcepts = concepts.filter((c) => {
    if (!query) return true;
    const searchable = JSON.stringify(c).toLowerCase();
    return searchable.includes(query);
  });

  return (
    <aside className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[var(--line)] w-full md:w-[280px] shrink-0 bg-[var(--paper)]">
      <div className="mb-4">
        <label
          htmlFor="search"
          className="block text-sm font-semibold text-[var(--ink)] mb-2"
        >
          Find a concept
        </label>
        <div className="relative">
          <input
            id="search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Meaning or word…"
            autoComplete="off"
            className="w-full border border-[var(--line)] rounded bg-white px-3 py-2 text-sm text-[var(--ink)] placeholder:text-[#8d9487] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#717b6e] hover:text-[var(--ink)] px-1"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div id="concepts" aria-label="Concepts" className="grid gap-2 mt-5">
        {filteredConcepts.length > 0 ? (
          filteredConcepts.map((r) => {
            const isSelected = r.id === selectedId;
            return (
              <button
                key={r.id}
                type="button"
                data-id={r.id}
                aria-pressed={isSelected}
                onClick={() => onSelectConcept(r.id)}
                className={`text-left px-3.5 py-2.5 rounded border transition-colors cursor-pointer text-sm font-medium ${
                  isSelected
                    ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                    : 'bg-transparent text-[var(--ink)] border-[var(--line)] hover:bg-[var(--ink)] hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{r.label}</span>
                  <span
                    className={`text-[10px] uppercase tracking-wider ${
                      isSelected ? 'text-[#cdd5c9]' : 'text-[#7e8779]'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <p className="p-4 text-sm text-[#7e8779] italic" role="status">
            No matching concepts.
          </p>
        )}
      </div>

      <p className="mt-8 text-xs text-[#5c635b] leading-relaxed border-t border-[var(--line)] pt-4">
        Five connected meanings with sources. Independent specialist review pending.
      </p>
    </aside>
  );
};
