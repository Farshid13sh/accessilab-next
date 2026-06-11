"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Viewport from '@/components/Viewport';
import ResearchPage from '@/components/ResearchPage';
import Header from '@/components/header';
import FilterBar from '@/components/FilterBar';

export default function Home() {
  const [currentView, setCurrentView] = useState('workspace');
  const [urlInput, setUrlInput] = useState('https://example.com');
  const [currentUrl, setCurrentUrl] = useState('https://example.com');
  const [isBlurActive, setIsBlurActive] = useState(false);
  const [isProtanopiaActive, setIsProtanopiaActive] = useState(false);
  const [isTritanopiaActive, setIsTritanopiaActive] = useState(false);
  const [isLowContrastActive, setIsLowContrastActive] = useState(false);
  const [isTunnelVisionActive, setIsTunnelVisionActive] = useState(false);
  const [isAchromatopsiaActive, setIsAchromatopsiaActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeFilters = {
    blur:       isBlurActive,
    protanopia: isProtanopiaActive,
    tritanopia: isTritanopiaActive,
    contrast:   isLowContrastActive,
    tunnel:     isTunnelVisionActive,
    mono:       isAchromatopsiaActive,
  };

  const handleFilterToggle = (key) => {
    const map = {
      blur:       setIsBlurActive,
      protanopia: setIsProtanopiaActive,
      tritanopia: setIsTritanopiaActive,
      contrast:   setIsLowContrastActive,
      tunnel:     setIsTunnelVisionActive,
      mono:       setIsAchromatopsiaActive,
    };
    map[key]?.((prev) => !prev);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    let cleanUrl = urlInput.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`;
    }
    setCurrentUrl(cleanUrl);
  };

  return (
    <div className="flex h-svh w-screen overflow-hidden bg-slate-950 font-sans text-slate-200">

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        currentView={currentView}
        setCurrentView={setCurrentView}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
        onUrlSubmit={handleUrlSubmit}
        isBlurActive={isBlurActive}
        setIsBlurActive={setIsBlurActive}
        isProtanopiaActive={isProtanopiaActive}
        setIsProtanopiaActive={setIsProtanopiaActive}
        isTritanopiaActive={isTritanopiaActive}
        setIsTritanopiaActive={setIsTritanopiaActive}
        isLowContrastActive={isLowContrastActive}
        setIsLowContrastActive={setIsLowContrastActive}
        isTunnelVisionActive={isTunnelVisionActive}
        setIsTunnelVisionActive={setIsTunnelVisionActive}
        isAchromatopsiaActive={isAchromatopsiaActive}
        setIsAchromatopsiaActive={setIsAchromatopsiaActive}
      />

      {/* Right column: header + main stage */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          currentUrl={currentUrl}
          currentView={currentView}
        />

        <main className="flex-1 overflow-hidden">
          {currentView === 'workspace' ? (
            /* pb-16 on mobile reserves space for the fixed FilterBar handle */
            <div className="h-full p-2 pb-16 sm:p-3 sm:pb-16 md:p-4 md:pb-4">
              <div className="h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-inner">
                <Viewport
                  currentUrl={currentUrl}
                  urlInput={urlInput}
                  setUrlInput={setUrlInput}
                  onUrlSubmit={handleUrlSubmit}
                  isBlurActive={isBlurActive}
                  isProtanopiaActive={isProtanopiaActive}
                  isTritanopiaActive={isTritanopiaActive}
                  isLowContrastActive={isLowContrastActive}
                  isTunnelVisionActive={isTunnelVisionActive}
                  isAchromatopsiaActive={isAchromatopsiaActive}
                />
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              <ResearchPage />
            </div>
          )}
        </main>
      </div>

      {/* Mobile-only filter bar — fixed bottom sheet, hidden on md+ */}
      {currentView === 'workspace' && (
        <FilterBar
          activeFilters={activeFilters}
          onToggle={handleFilterToggle}
        />
      )}

    </div>
  );
}