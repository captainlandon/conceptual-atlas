import conceptsJson from '../../data/concepts.json';
import { ConceptCollection, Concept } from '../types/concept';

export const atlasData: ConceptCollection = conceptsJson as ConceptCollection;
export const conceptsList: Concept[] = atlasData.concepts;
export const conceptsById: Record<string, Concept> = Object.fromEntries(
  conceptsList.map((c) => [c.id, c])
);
