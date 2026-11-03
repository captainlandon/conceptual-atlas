import React, { useState } from 'react';
import { Concept } from '../types/concept';

interface ContextViewProps {
  onSelectConcept: (id: string) => void;
}

export const ContextView: React.FC<ContextViewProps> = ({ onSelectConcept }) => {
  const [reflection, setReflection] = useState('');

  return (
    <div className="context-view max-w-4xl">
      <h2 className="font-serif-atlas text-3xl sm:text-4xl text-[var(--ink)] font-normal mb-3">
        Investigate a situation
      </h2>
      <p className="text-base text-[#55625a] mb-6 leading-relaxed">
        A guided example: a friend replies, <span className="font-serif-atlas italic text-[var(--ink)] font-bold">“Fine.”</span> What can you reasonably infer?
      </p>

      <article className="card p-6 sm:p-8 border border-[var(--line)] rounded-lg bg-[var(--card-bg)] shadow-xs space-y-6">
        {/* Ambiguity */}
        <section className="border-b border-[var(--line)] pb-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-[var(--ink)] font-serif-atlas m-0">
              Ambiguity
            </h3>
            <button
              type="button"
              onClick={() => onSelectConcept('ambiguity-01')}
              className="text-xs text-[var(--accent)] hover:underline cursor-pointer"
            >
              View concept →
            </button>
          </div>
          <p className="text-sm sm:text-[15px] text-[var(--ink)] leading-relaxed m-0">
            The reply might communicate agreement, reluctance, or reassurance. These are possible readings, not established facts about the friend.
          </p>
        </section>

        {/* Vagueness */}
        <section className="border-b border-[var(--line)] pb-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-[var(--ink)] font-serif-atlas m-0">
              Vagueness
            </h3>
            <button
              type="button"
              onClick={() => onSelectConcept('vagueness-01')}
              className="text-xs text-[var(--accent)] hover:underline cursor-pointer"
            >
              View concept →
            </button>
          </div>
          <p className="text-sm sm:text-[15px] text-[var(--ink)] leading-relaxed m-0">
            Even if “fine” means acceptable, how acceptable is enough? The threshold may be unclear.
          </p>
        </section>

        {/* Uncertainty */}
        <section className="border-b border-[var(--line)] pb-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-[var(--ink)] font-serif-atlas m-0">
              Uncertainty
            </h3>
            <button
              type="button"
              onClick={() => onSelectConcept('uncertainty-01')}
              className="text-xs text-[var(--accent)] hover:underline cursor-pointer"
            >
              View concept →
            </button>
          </div>
          <p className="text-sm sm:text-[15px] text-[var(--ink)] leading-relaxed m-0">
            You may not know which interpretation fits. A clear word can still leave you uncertain about the underlying situation.
          </p>
        </section>

        {/* Context and distinction */}
        <section className="border-b border-[var(--line)] pb-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-[var(--ink)] font-serif-atlas m-0">
              Context and distinction
            </h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onSelectConcept('context-01')}
                className="text-xs text-[var(--accent)] hover:underline cursor-pointer"
              >
                Context →
              </button>
              <button
                type="button"
                onClick={() => onSelectConcept('distinction-01')}
                className="text-xs text-[var(--accent)] hover:underline cursor-pointer"
              >
                Distinction →
              </button>
            </div>
          </div>
          <p className="text-sm sm:text-[15px] text-[var(--ink)] leading-relaxed m-0">
            What question preceded the reply? What relationship and circumstances matter? Separate what was observed from what you inferred.
          </p>
        </section>

        {/* Reflection Box */}
        <div className="pt-2">
          <label
            htmlFor="reflection"
            className="block text-sm font-semibold text-[var(--ink)] mb-2"
          >
            Your reflection: what would you ask next?
          </label>
          <textarea
            id="reflection"
            rows={4}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="A question that could clarify the situation…"
            className="w-full border border-[var(--line)] rounded-md bg-white p-3.5 text-sm sm:text-[15px] text-[var(--ink)] placeholder:text-[#8d9487] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          {reflection && (
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setReflection('')}
                className="text-xs text-[#717b6e] hover:text-[var(--ink)] cursor-pointer"
              >
                Clear reflection
              </button>
            </div>
          )}
        </div>

        <p className="provenance text-xs text-[#5c635b] pt-2">
          Your text stays on this page and is not saved. This is a curated exercise; no automatic interpretation is performed.
        </p>
      </article>
    </div>
  );
};
