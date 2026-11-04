import React from 'react';
import { Concept } from '../types/concept';
import { SourceNotes } from './SourceNotes';

interface ConceptCardProps {
  concept: Concept;
  allConceptsById: Record<string, Concept>;
  onSelectConcept?: (id: string) => void;
  isComparison?: boolean;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
  concept,
  allConceptsById,
  onSelectConcept,
  isComparison = false,
}) => {
  const getRelationBadgeClass = (type: string) => {
    switch (type) {
      case 'contrasts-with':
        return 'text-[#9c381c] bg-[#faebe6] border-[#e8c2b7]';
      case 'supports':
        return 'text-[#184a3b] bg-[#e6f4ee] border-[#b9ded0]';
      case 'informs':
        return 'text-[#204969] bg-[#e7f1f7] border-[#bdd4e7]';
      case 'can-produce':
        return 'text-[#6d460d] bg-[#fbf3e5] border-[#ead5b0]';
      default:
        return 'text-[#444] bg-[#f0f0f0] border-[#ccc]';
    }
  };

  return (
    <article className="p-6 sm:p-7 border border-[var(--line)] rounded-lg bg-[var(--card-bg)] shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="eyebrow">
          {concept.id} · {concept.status}
        </div>
        {concept.sense && (
          <span className="text-xs text-[#717b6e] italic">
            {concept.sense}
          </span>
        )}
      </div>

      <h2 className="font-serif-atlas text-3xl sm:text-4xl text-[var(--ink)] font-normal mb-5 leading-tight">
        {concept.label}
      </h2>

      <details className="mb-5 text-sm border border-[var(--line)] p-3 rounded">
        <summary className="cursor-pointer font-semibold">Expressions and language context</summary>
        {concept.expressions.map(e => <div key={e.id} className="mt-3"><p><bdi lang={e.language} dir={e.direction}>{e.text}</bdi> · {e.language} · {e.status}</p><p className="text-xs mt-1">{e.usage}. {e.cultural_context}</p></div>)}
        <p className="text-xs mt-3">Separate senses and documented mappings preserve differences across languages. This pilot currently contains English entries.</p>
      </details>
      {/* Meaning / Definition */}
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1.5">
          Meaning
        </h3>
        <p className="text-[15px] sm:text-base text-[var(--ink)] leading-relaxed m-0">
          {concept.definition}
        </p>
      </div>

      {/* Recognize it */}
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1.5">
          Recognize it
        </h3>
        <p className="text-[15px] sm:text-base text-[var(--ink)] leading-relaxed m-0">
          {concept.recognition}
        </p>
      </div>

      {/* Examples */}
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1.5">
          Examples
        </h3>
        {concept.examples.map((item, idx) => (
          <p
            key={idx}
            className="text-[15px] sm:text-base text-[var(--ink)] leading-relaxed m-0 italic bg-[#f8f6f0] p-3 rounded border-l-2 border-[#183b38]"
          >
            {item}
          </p>
        ))}
      </div>

      {/* Counterexamples */}
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1.5">
          Counterexamples
        </h3>
        {concept.counterexamples.map((item, idx) => (
          <p
            key={idx}
            className="text-[15px] sm:text-base text-[var(--ink)] leading-relaxed m-0 text-[#4c544d] bg-[#f8f6f0] p-3 rounded border-l-2 border-[#b55633]"
          >
            {item}
          </p>
        ))}
      </div>

      {/* Context */}
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1.5">
          Context
        </h3>
        {concept.contexts.map((item, idx) => (
          <p key={idx} className="text-[15px] sm:text-base text-[var(--ink)] leading-relaxed m-0 mb-1.5">
            {item}
          </p>
        ))}
      </div>

      {/* Limits */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-1.5">
          Limits
        </h3>
        <p className="text-[15px] sm:text-base text-[var(--ink)] leading-relaxed m-0">
          {concept.limits}
        </p>
      </div>

      {/* Connected Concepts */}
      <div className="mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#55625a] mb-2.5">
          Connected concepts
        </h3>
        <div className="grid gap-2.5">
          {concept.relations.map((rel, idx) => {
            const targetConcept = allConceptsById[rel.target];
            const targetName = targetConcept ? targetConcept.label : rel.target;

            return (
              <button
                key={idx}
                type="button"
                data-id={rel.target}
                onClick={() => onSelectConcept?.(rel.target)}
                className="w-full text-left p-3 rounded border border-[var(--line)] bg-[#fffdfa] hover:bg-[#183b38] hover:text-white group transition-colors cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-1.5 text-sm font-semibold mb-1">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono border ${getRelationBadgeClass(
                      rel.type
                    )} group-hover:bg-white/20 group-hover:text-white group-hover:border-white/40`}
                  >
                    {rel.type}
                  </span>
                  <span className="text-[#6d7568] group-hover:text-white/80">→</span>
                  <span className="text-[var(--ink)] group-hover:text-white underline decoration-[var(--line)] underline-offset-2">
                    {targetName}
                  </span>
                </div>
                <small className="block text-xs text-[#55625a] group-hover:text-white/90 leading-normal">
                  {rel.note} ({rel.status})
                </small>
              </button>
            );
          })}
        </div>
      </div>

      <SourceNotes ids={concept.source_refs} />
      {/* Provenance */}
      <p className="provenance text-xs text-[#5c635b] border-t border-[var(--line)] pt-3 mt-6">
        {concept.provenance.review} {concept.provenance.scope}
      </p>
    </article>
  );
};
