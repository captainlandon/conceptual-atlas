import React, { useState, useEffect } from 'react';
import { Concept } from '../types/concept';
import { ConceptCard } from './ConceptCard';

interface CompareViewProps {
  primaryConcept: Concept;
  allConcepts: Concept[];
  allConceptsById: Record<string, Concept>;
  onSelectConcept: (id: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  primaryConcept,
  allConcepts,
  allConceptsById,
  onSelectConcept,
}) => {
  const otherConcepts = allConcepts.filter((c) => c.id !== primaryConcept.id);

  // Default other concept to the first available other concept
  const [otherId, setOtherId] = useState<string>(
    otherConcepts.length > 0 ? otherConcepts[0].id : ''
  );

  // If primaryConcept changes and matches otherId, switch otherId
  useEffect(() => {
    if (otherId === primaryConcept.id) {
      const fallback = allConcepts.find((c) => c.id !== primaryConcept.id);
      if (fallback) setOtherId(fallback.id);
    }
  }, [primaryConcept.id, allConcepts, otherId]);

  const secondaryConcept = allConceptsById[otherId] || otherConcepts[0];

  // Check direct relationships between the two
  const directFromPrimary = primaryConcept.relations.filter((r) => r.target === secondaryConcept?.id);
  const directFromSecondary = secondaryConcept?.relations.filter((r) => r.target === primaryConcept.id) || [];

  return (
    <div className="compare-view">
      <h2 className="font-serif-atlas text-3xl sm:text-4xl text-[var(--ink)] font-normal mb-3">
        Compare meanings
      </h2>
      <p className="text-sm text-[#55625a] mb-6">
        Contrast definitions, boundaries, and contextual roles side-by-side to notice what differences matter.
      </p>

      {/* Selector Controls */}
      <div className="bg-[#fffdf7] border border-[var(--line)] rounded-lg p-4 sm:p-5 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--ink)]">Comparing:</span>
          <span className="font-serif-atlas text-lg text-[var(--ink)] font-bold">
            {primaryConcept.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="other-concept" className="text-sm font-medium text-[var(--ink)]">
            with
          </label>
          <select
            id="other-concept"
            value={otherId}
            onChange={(e) => setOtherId(e.target.value)}
            className="border border-[var(--line)] bg-white px-3 py-2 rounded text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
          >
            {otherConcepts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Direct Relationship Highlight if present */}
      {(directFromPrimary.length > 0 || directFromSecondary.length > 0) && (
        <div className="mb-6 p-4 rounded-lg bg-[#eee8db] border-l-4 border-[var(--accent)] text-sm text-[var(--ink)]">
          <div className="font-semibold mb-1">Directly articulated relationship:</div>
          <ul className="list-disc list-inside space-y-1">
            {directFromPrimary.map((r, i) => (
              <li key={`prim-${i}`}>
                <strong>{primaryConcept.label}</strong> <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-white/70 border border-[#cdd5c9]">{r.type}</span> <strong>{secondaryConcept.label}</strong>: {r.note}
              </li>
            ))}
            {directFromSecondary.map((r, i) => (
              <li key={`sec-${i}`}>
                <strong>{secondaryConcept.label}</strong> <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-white/70 border border-[#cdd5c9]">{r.type}</span> <strong>{primaryConcept.label}</strong>: {r.note}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div>
          <div className="text-xs uppercase tracking-wider font-bold text-[#666d5e] mb-2">
            Selected Concept
          </div>
          <ConceptCard
            concept={primaryConcept}
            allConceptsById={allConceptsById}
            onSelectConcept={onSelectConcept}
            isComparison={true}
          />
        </div>

        {secondaryConcept && (
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-[#666d5e] mb-2 flex items-center justify-between">
              <span>Comparison Concept</span>
              <button
                type="button"
                onClick={() => onSelectConcept(secondaryConcept.id)}
                className="text-[11px] lowercase text-[var(--accent)] hover:underline cursor-pointer"
              >
                make active primary
              </button>
            </div>
            <ConceptCard
              concept={secondaryConcept}
              allConceptsById={allConceptsById}
              onSelectConcept={onSelectConcept}
              isComparison={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};
