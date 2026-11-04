import React from 'react';
import { atlasData } from '../data/conceptsData';
export const SourceNotes: React.FC<{ids: string[]}> = ({ids}) => <div className="mt-5 border-t border-[var(--line)] pt-4 text-sm">
  <h3 className="font-semibold mb-2">Sources and scope</h3>
  <ul className="space-y-3">{ids.map(id => {const s=atlasData.sources.find(source=>source.id===id);return s && <li key={id}>
    <a className="underline text-[var(--accent)]" href={s.url} target="_blank" rel="noreferrer">{s.title}</a> · {s.authors}
    <p className="text-xs mt-1">{s.location}. {s.review_note}</p>
  </li>})}</ul>
</div>;
