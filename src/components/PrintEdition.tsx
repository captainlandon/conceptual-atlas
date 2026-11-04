import React from 'react';
import { Concept } from '../types/concept';
import { atlasData } from '../data/conceptsData';
import { SourceNotes } from './SourceNotes';

interface PrintEditionProps {
  concepts: Concept[];
  isPrintViewOnly?: boolean;
}

export const PrintEdition: React.FC<PrintEditionProps> = ({ concepts, isPrintViewOnly = false }) => {
  return (
    <div className={`print-edition-container ${isPrintViewOnly ? '' : 'print-only'}`}>
      <div className="max-w-[850px] mx-auto py-8 px-4 sm:px-6">
        <header className="border-b border-[var(--line)] pb-6 mb-8">
          <div className="eyebrow mb-1">Meaning · Relationships · Context</div>
          <h1 className="font-serif-atlas text-3xl sm:text-4xl font-normal text-[var(--ink)] mb-2">
            Conceptual Atlas · Complete Pilot Collection
          </h1>
          <p className="text-sm text-[#55625a] leading-relaxed">
            Five sense-level editorial drafts. Relationships are proposed explanatory links. This pilot has not been validated as an educational intervention.
          </p>
          {isPrintViewOnly && (
            <div className="mt-4 no-print flex gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-[var(--ink)] text-white px-4 py-2 rounded text-sm hover:opacity-90 cursor-pointer"
              >
                Send to Printer / Save PDF
              </button>
            </div>
          )}
        </header>

        <div className="space-y-12">
          {concepts.map((r) => (
            <article
              key={r.id}
              id={`print-${r.id}`}
              className="border-b border-[var(--line)] pb-10 page-break-before"
            >
              <div className="eyebrow mb-1">
                {r.id} · {r.status}
              </div>
              <h2 className="font-serif-atlas text-2xl sm:text-3xl text-[var(--ink)] font-normal mb-4">
                {r.label}
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1">
                    Definition
                  </h3>
                  <p className="m-0 text-[var(--ink)]">{r.definition}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1">
                    Recognize it
                  </h3>
                  <p className="m-0 text-[var(--ink)]">{r.recognition}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1">
                    Examples
                  </h3>
                  {r.examples.map((ex, i) => (
                    <p key={i} className="m-0 text-[var(--ink)] italic mb-1">
                      {ex}
                    </p>
                  ))}
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1">
                    Counterexamples
                  </h3>
                  {r.counterexamples.map((cx, i) => (
                    <p key={i} className="m-0 text-[#4c544d] mb-1">
                      {cx}
                    </p>
                  ))}
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1">
                    Context
                  </h3>
                  {r.contexts.map((ctx, i) => (
                    <p key={i} className="m-0 text-[var(--ink)] mb-1">
                      {ctx}
                    </p>
                  ))}
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1">
                    Limits
                  </h3>
                  <p className="m-0 text-[var(--ink)]">{r.limits}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1.5">
                    Relationships
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {r.relations.map((rel, i) => (
                      <li key={i} className="text-sm">
                        <span className="font-semibold">{rel.type}</span> →{' '}
                        <span className="font-medium underline">{rel.target}</span>: {rel.note}
                      </li>
                    ))}
                  </ul>
                </div>

                <SourceNotes ids={r.source_refs} />
                <p className="provenance text-xs text-[#5c635b] pt-3 border-t border-dashed border-[var(--line)]">
                  {r.provenance.review}
                </p>
              </div>
            </article>
          ))}
        </div>

        <footer className="mt-12 pt-6 border-t border-[var(--line)] text-xs text-[#5c635b]">
          Originator: Anier Landon Woodyard · Working title · v{atlasData.version} · Printable Edition
        </footer>
      </div>
    </div>
  );
};
