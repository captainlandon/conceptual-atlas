export type RelationType = 'contrasts-with' | 'supports' | 'informs' | 'can-produce' | string;

export interface Relation {
  type: RelationType;
  target: string;
  note: string;
}

export interface Provenance {
  kind: string;
  originator: string;
  assistance: string;
  review: string;
}

export interface Concept {
  id: string;
  label: string;
  aliases: string[];
  sense: string;
  definition: string;
  recognition: string;
  examples: string[];
  counterexamples: string[];
  contexts: string[];
  limits: string;
  status: 'draft' | 'reviewed' | 'contested' | string;
  provenance: Provenance;
  relations: Relation[];
}

export interface ConceptCollection {
  version: string;
  concepts: Concept[];
}

export type AtlasMode = 'explore' | 'compare' | 'context' | 'print';
