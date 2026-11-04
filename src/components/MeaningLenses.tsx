import React from 'react';
export const MeaningLenses: React.FC = () => <div className="grid sm:grid-cols-2 gap-4" aria-label="Two explanatory lenses">
 <figure className="border border-[var(--line)] bg-[var(--card-bg)] rounded p-4">
  <figcaption className="font-semibold">Ambiguity: distinct readings</figcaption>
  <svg viewBox="0 0 300 125" className="w-full my-3" role="img" aria-label="One expression branches to reading A and reading B"><path d="M30 63H115M115 63L195 28H270M115 63L195 98H270" fill="none" stroke="currentColor" strokeWidth="3"/><text x="12" y="48" fontSize="12">Expression</text><text x="201" y="19" fontSize="12">Reading A</text><text x="201" y="118" fontSize="12">Reading B</text></svg>
  <p className="text-sm">Which reading applies? The branches represent possible meanings, not evidence of a speaker’s intent.</p>
 </figure>
 <figure className="border border-[var(--line)] bg-[var(--card-bg)] rounded p-4">
  <figcaption className="font-semibold">Vagueness: borderline application</figcaption>
  <svg viewBox="0 0 300 125" className="w-full my-3" role="img" aria-label="A category has clear negative cases, a hatched borderline region, and clear positive cases"><defs><pattern id="borderline-hatch" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6L6 0" stroke="currentColor" strokeWidth="1"/></pattern></defs><path d="M15 62H285" stroke="currentColor" strokeWidth="3"/><rect x="110" y="38" width="80" height="48" fill="url(#borderline-hatch)" stroke="currentColor"/><text x="15" y="106" fontSize="11">Clear no</text><text x="120" y="24" fontSize="11">Borderline</text><text x="240" y="106" fontSize="11">Clear yes</text></svg>
  <p className="text-sm">Does this case count? The diagram illustrates borderline application; it does not settle competing theories of vagueness.</p>
 </figure>
</div>;
