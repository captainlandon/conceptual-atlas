import React, { useState } from 'react';
import scenariosJson from '../../data/scenarios.json';
import { Scenario } from '../types/concept';
import { conceptsById } from '../data/conceptsData';
import { SourceNotes } from './SourceNotes';
import { MeaningLenses } from './MeaningLenses';

const scenarios=scenariosJson as Scenario[];
const lenses=[['ambiguity-01','Multiple distinct readings?'],['vagueness-01','Borderline application?'],['uncertainty-01','Unsettled confidence or knowledge?'],['context-01','Relevant circumstances missing?']];
export const ContextView: React.FC<{onSelectConcept:(id:string)=>void}> = ({onSelectConcept}) => {
 const [id,setId]=useState('both');
 const [selected,setSelected]=useState<string[]>([]);
 const [revealed,setRevealed]=useState(false);
 const [reflection,setReflection]=useState('');
 const current=scenarios.find(s=>s.id===id)!;
 const choose=(value:string)=>{setId(value);setSelected([]);setRevealed(false);setReflection('')};
 return <div className="max-w-4xl space-y-6">
  <div><p className="eyebrow">Guided inquiry</p><h2 className="font-serif-atlas text-3xl sm:text-4xl mt-2">Ambiguity, vagueness, and what remains unknown</h2><p className="mt-3">Read a situation, choose any lenses that seem useful, then inspect a worked explanation. More than one can apply.</p></div>
  <MeaningLenses />
  <label className="block font-semibold" htmlFor="scenario">Choose a situation</label>
  <select id="scenario" value={id} onChange={e=>choose(e.target.value)} className="w-full bg-white border border-[var(--line)] rounded p-3">{scenarios.map(s=><option key={s.id} value={s.id}>{s.title}</option>)}</select>
  <article className="bg-[var(--card-bg)] border border-[var(--line)] rounded-lg p-6 sm:p-8">
   <blockquote className="font-serif-atlas text-2xl mb-4">{current.expression}</blockquote>
   <h3 className="font-semibold">What is given</h3><p className="mt-2 mb-5">{current.observation}</p>
   <fieldset><legend className="font-semibold mb-3">Which questions would you investigate? Select all that help.</legend><div className="grid sm:grid-cols-2 gap-3">{lenses.map(([key,label])=><label key={key} className="flex gap-3 items-start p-3 border border-[var(--line)] rounded cursor-pointer"><input type="checkbox" checked={selected.includes(key)} onChange={()=>setSelected(old=>old.includes(key)?old.filter(v=>v!==key):[...old,key])} className="mt-1"/><span>{label}</span></label>)}</div></fieldset>
   <button type="button" onClick={()=>setRevealed(v=>!v)} aria-expanded={revealed} aria-controls="worked-analysis" className="mt-5 px-4 py-2 rounded bg-[var(--ink)] text-white">{revealed?'Hide worked explanation':'Inspect worked explanation'}</button>
   {revealed&&<div id="worked-analysis" className="mt-6 space-y-5" role="region" aria-label="Worked explanation"><p className="text-sm border-l-4 border-[var(--accent)] pl-3">These are reasoned examples, not automatic diagnoses. Your choices are prompts for investigation rather than a scored test.</p>{current.analyses.map(a=><section key={a.concept}><h3 className="font-semibold">{conceptsById[a.concept].label}</h3><p className="mt-1">{a.explanation}</p><button className="underline text-sm text-[var(--accent)] mt-1" onClick={()=>onSelectConcept(a.concept)}>Explore {conceptsById[a.concept].label.toLowerCase()} →</button></section>)}</div>}
   <div className="mt-6 border-t border-[var(--line)] pt-5"><label htmlFor="reflection" className="block font-semibold mb-2">{current.question}</label><textarea id="reflection" rows={4} value={reflection} onChange={e=>setReflection(e.target.value)} placeholder="Separate what you observed, inferred, and would ask…" className="w-full bg-white border border-[var(--line)] rounded p-3"/>{reflection&&<button className="text-sm underline" onClick={()=>setReflection('')}>Clear reflection</button>}<p className="text-xs mt-2">Your choices and writing stay in this view. They are not saved or transmitted and clear when you leave or change the situation.</p></div>
   <SourceNotes ids={current.sources}/>
  </article>
  <aside className="bg-[#eee8db] p-5 rounded"><h3 className="font-semibold">A fork and a fading boundary</h3><p className="mt-2">A fork can illustrate distinct readings; a graded boundary can illustrate borderline application. These metaphors are teaching aids. Neither implies that every concept has a literal shape or that ambiguity and vagueness exclude one another.</p></aside>
 </div>;
};
