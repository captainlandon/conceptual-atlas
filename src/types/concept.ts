export type RelationType = 'contrasts-with' | 'supports' | 'informs' | 'can-produce';
export type EditorialStatus = 'draft' | 'reviewed' | 'contested';
export interface Relation { type: RelationType; target: string; note: string; scope: string; status: 'proposed' | 'reviewed' | 'contested'; }
export interface Provenance { kind: string; originator: string; assistance: string; review: string; scope: string; }
export interface Expression { id: string; language: string; text: string; script: string; direction: 'ltr' | 'rtl' | 'auto'; usage: string; cultural_context: string; source_refs: string[]; status: EditorialStatus; }
export interface SourceRecord { id: string; title: string; authors: string; url: string; location: string; accessed: string; rights: string; review_note: string; }
export interface Concept { id: string; label: string; aliases: string[]; language: string; scheme: string; preferred_expression: string; expressions: Expression[]; sense: string; definition: string; recognition: string; examples: string[]; counterexamples: string[]; contexts: string[]; limits: string; status: EditorialStatus; provenance: Provenance; relations: Relation[]; source_refs: string[]; }
export interface Mapping { id: string; source: string; target: string; type: 'exact' | 'close' | 'broader' | 'narrower' | 'related'; rationale: string; status: EditorialStatus; reviewer?: string; source_refs: string[]; }
export interface ConceptCollection { version: string; schema_version: string; concepts: Concept[]; sources: SourceRecord[]; mappings: Mapping[]; }
export interface Scenario { id: string; title: string; expression: string; observation: string; analyses: {concept: string; explanation: string}[]; question: string; sources: string[]; }
export type AtlasMode = 'explore' | 'compare' | 'context' | 'print';
