import React from 'react';
import { AtlasMode } from '../types/concept';

interface HeaderProps {
  currentMode: AtlasMode;
  onSelectMode: (mode: AtlasMode) => void;
  version: string;
}

export const Header: React.FC<HeaderProps> = ({ currentMode, onSelectMode, version }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="px-[5vw] py-8 border-b border-[var(--line)] flex flex-wrap justify-between items-center gap-6 bg-[var(--paper)] no-print">
      <div>
        <div className="eyebrow mb-1">Meaning · Relationships · Context</div>
        <div className="flex items-center gap-3">
          <h1 className="font-serif-atlas text-3xl sm:text-4xl m-0 font-normal text-[var(--ink)]">
            Conceptual Atlas
          </h1>
          <span className="inline-block border border-[#b7bda8] text-[#55625a] px-2.5 py-0.5 rounded-full text-xs font-medium">
            Working pilot / v{version}
          </span>
        </div>
      </div>

      <nav aria-label="Atlas modes" className="flex flex-wrap gap-2 items-center">
        <button
          type="button"
          data-mode="explore"
          aria-pressed={currentMode === 'explore'}
          onClick={() => onSelectMode('explore')}
          className={`border border-[var(--line)] px-3.5 py-2 rounded text-sm transition-colors cursor-pointer ${
            currentMode === 'explore'
              ? 'bg-[var(--ink)] text-white'
              : 'bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white'
          }`}
        >
          Explore
        </button>
        <button
          type="button"
          data-mode="compare"
          aria-pressed={currentMode === 'compare'}
          onClick={() => onSelectMode('compare')}
          className={`border border-[var(--line)] px-3.5 py-2 rounded text-sm transition-colors cursor-pointer ${
            currentMode === 'compare'
              ? 'bg-[var(--ink)] text-white'
              : 'bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white'
          }`}
        >
          Compare
        </button>
        <button
          type="button"
          data-mode="context"
          aria-pressed={currentMode === 'context'}
          onClick={() => onSelectMode('context')}
          className={`border border-[var(--line)] px-3.5 py-2 rounded text-sm transition-colors cursor-pointer ${
            currentMode === 'context'
              ? 'bg-[var(--ink)] text-white'
              : 'bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white'
          }`}
        >
          Context
        </button>
        <button
          type="button"
          id="print"
          onClick={handlePrint}
          className="border border-[var(--line)] px-3.5 py-2 rounded text-sm bg-transparent text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          title="Print the entire collection or export to PDF"
        >
          <span>Print collection</span>
        </button>
      </nav>
    </header>
  );
};
