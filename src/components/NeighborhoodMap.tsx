import React from 'react';
import { Concept } from '../types/concept';

interface NeighborhoodMapProps {
  currentConcept: Concept;
  allConceptsById: Record<string, Concept>;
  onSelectConcept: (id: string) => void;
}

export const NeighborhoodMap: React.FC<NeighborhoodMapProps> = ({
  currentConcept,
  allConceptsById,
  onSelectConcept,
}) => {
  // Target IDs directly referenced in relations
  const targetIds = Array.from(new Set(currentConcept.relations.map((x) => x.target)));
  const allIds = [currentConcept.id, ...targetIds];
  const totalTargets = targetIds.length;
  const height = Math.max(200, 120 + Math.max(1, totalTargets - 1) * 78);

  const sourceX = 180;
  const sourceY = height / 2;
  const targetX = 500;

  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="text-sm font-semibold tracking-wide text-[var(--ink)] uppercase">
          Neighborhood
        </h3>
      </div>
      <p className="text-xs text-[#5c635b] mb-3 leading-relaxed">
        Select a concept to explore. Lines show the explained relationships below; position and distance have no quantitative meaning.
      </p>

      <div className="w-full overflow-x-auto bg-[#e9ede3] rounded-lg border border-[var(--line)] p-2">
        <svg
          viewBox={`0 0 680 ${height}`}
          className="w-full h-auto min-w-[540px] block select-none"
          role="img"
          aria-label="Concept neighborhood"
        >
          <title>{`${currentConcept.label} and its related concepts`}</title>

          {/* Edges from source to targets */}
          {targetIds.map((targetId, index) => {
            const targetY = 65 + index * 78;
            const matchingRelations = currentConcept.relations.filter((r) => r.target === targetId);
            const relationType = matchingRelations.map((r) => r.type).join(', ');

            // midpoint for optional badge or label
            const midX = (sourceX + targetX) / 2;
            const midY = (sourceY + targetY) / 2;

            return (
              <g key={`edge-${targetId}`}>
                <line
                  x1={sourceX}
                  y1={sourceY}
                  x2={targetX}
                  y2={targetY}
                  stroke="#a5afa0"
                  strokeWidth="2"
                  className="transition-colors hover:stroke-[var(--accent)]"
                />
                {relationType && (
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-48"
                      y="-10"
                      width="96"
                      height="20"
                      rx="4"
                      fill="#e9ede3"
                      stroke="#cdd5c9"
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fontSize="9.5"
                      fontFamily="system-ui, sans-serif"
                      fill="#55625a"
                      fontWeight="600"
                    >
                      {relationType}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Node: Source (Current Selected) */}
          <g transform={`translate(${sourceX}, ${sourceY})`} className="cursor-default">
            <rect
              x="-90"
              y="-24"
              width="180"
              height="48"
              rx="8"
              fill="#183b38"
              stroke="#183b38"
              strokeWidth="2"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="Georgia, serif"
              fontSize="15"
              fontWeight="normal"
            >
              {currentConcept.label}
            </text>
          </g>

          {/* Nodes: Targets (Connected concepts) */}
          {targetIds.map((targetId, index) => {
            const nodeY = 65 + index * 78;
            const targetConcept = allConceptsById[targetId];
            if (!targetConcept) return null;

            return (
              <g
                key={`node-${targetId}`}
                transform={`translate(${targetX}, ${nodeY})`}
                onClick={() => onSelectConcept(targetId)}
                className="cursor-pointer group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectConcept(targetId);
                  }
                }}
                aria-label={`Explore ${targetConcept.label}`}
              >
                <rect
                  x="-90"
                  y="-23"
                  width="180"
                  height="46"
                  rx="8"
                  fill="#fffdf7"
                  stroke="#728a79"
                  strokeWidth="1.5"
                  className="transition-all duration-150 group-hover:fill-[#f7d8b9] group-hover:stroke-[var(--accent)]"
                />
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill="#183b38"
                  fontFamily="system-ui, sans-serif"
                  fontSize="14"
                  className="group-hover:fill-[var(--accent)]"
                >
                  {targetConcept.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
