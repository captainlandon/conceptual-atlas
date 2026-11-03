import React from 'react';

interface FooterProps {
  version: string;
}

export const Footer: React.FC<FooterProps> = ({ version }) => {
  return (
    <footer className="px-[5vw] py-5 text-xs text-[#5c635b] border-t border-[var(--line)] bg-[var(--paper)] no-print">
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-3">
        <div>
          Originator: Anier Landon Woodyard · Working title · v{version} · No internet connection needed after download.
        </div>
        <div className="text-[11px] text-[#788274]">
          Independent Conceptual Atlas Pilot
        </div>
      </div>
    </footer>
  );
};
