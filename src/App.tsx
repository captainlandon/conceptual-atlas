import React, { useState, useEffect } from 'react';
import { atlasData, conceptsList, conceptsById } from './data/conceptsData';
import { AtlasMode } from './types/concept';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { NeighborhoodMap } from './components/NeighborhoodMap';
import { ConceptCard } from './components/ConceptCard';
import { CompareView } from './components/CompareView';
import { ContextView } from './components/ContextView';
import { PrintEdition } from './components/PrintEdition';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const initialHash = window.location.hash.replace(/^#/, '');
  const initialId = conceptsById[initialHash] ? initialHash : conceptsList[0]?.id || '';

  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [mode, setMode] = useState<AtlasMode>('explore');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync hash on popstate / hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (conceptsById[hash]) {
        setSelectedId(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectConcept = (id: string) => {
    if (!conceptsById[id]) return;
    setSelectedId(id);
    if (mode === 'context') {
      setMode('explore');
    }
    window.location.hash = id;
  };

  const handleSelectMode = (newMode: AtlasMode) => {
    setMode(newMode);
  };

  const currentConcept = conceptsById[selectedId] || conceptsList[0];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      {/* Skip to atlas accessibility link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[var(--ink)] focus:border focus:border-[var(--line)] focus:rounded focus:shadow-md"
      >
        Skip to atlas
      </a>

      {/* Header */}
      <Header
        currentMode={mode}
        onSelectMode={handleSelectMode}
        version={atlasData.version}
      />

      {/* Main app body */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto no-print">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-140px)]">
          {/* Sidebar */}
          <Sidebar
            concepts={conceptsList}
            selectedId={selectedId}
            onSelectConcept={handleSelectConcept}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Content Area */}
          <main
            id="main"
            tabIndex={-1}
            className="flex-1 p-6 sm:p-8 md:p-10 min-w-0 outline-none"
          >
            {mode !== 'print' && (
              <div className="mb-6">
                <p className="eyebrow mb-1">A map for clearer understanding</p>
                <p className="text-sm sm:text-base text-[#55625a] max-w-2xl leading-relaxed">
                  Explore what concepts help you notice, how they differ, and when context changes their use.
                </p>
              </div>
            )}

            {/* View based on current mode */}
            {mode === 'explore' && currentConcept && (
              <div id="view" className="space-y-6">
                <NeighborhoodMap
                  currentConcept={currentConcept}
                  allConceptsById={conceptsById}
                  onSelectConcept={handleSelectConcept}
                />
                <ConceptCard
                  concept={currentConcept}
                  allConceptsById={conceptsById}
                  onSelectConcept={handleSelectConcept}
                />
              </div>
            )}

            {mode === 'compare' && currentConcept && (
              <CompareView
                primaryConcept={currentConcept}
                allConcepts={conceptsList}
                allConceptsById={conceptsById}
                onSelectConcept={handleSelectConcept}
              />
            )}

            {mode === 'context' && (
              <ContextView onSelectConcept={handleSelectConcept} />
            )}

            {mode === 'print' && (
              <PrintEdition concepts={conceptsList} isPrintViewOnly={true} />
            )}
          </main>
        </div>
      </div>

      {/* Background print edition for standard browser printing */}
      <div className="print-only">
        <PrintEdition concepts={conceptsList} />
      </div>

      {/* Footer */}
      <Footer version={atlasData.version} />
    </div>
  );
};

export default App;
