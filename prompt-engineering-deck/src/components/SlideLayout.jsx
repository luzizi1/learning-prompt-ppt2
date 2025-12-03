import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SlideLayout = ({
  children,
  title,
  subtitle,
  currentSlide,
  totalSlides,
  onNext,
  onPrev
}) => {
  return (
    <div className="h-screen w-screen bg-slate-50 text-slate-900 flex flex-col overflow-hidden relative font-sans">
      {/* Header */}
      <header className="px-8 py-4 bg-white border-b border-slate-200 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-google-blue rounded-full"></div>
           <h1 className="font-bold text-lg text-slate-700 tracking-tight">AI 提示工程系统指南</h1>
        </div>
        <div className="text-sm font-medium text-slate-500">
          Google AI Best Practices
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative">
        <div className="max-w-6xl mx-auto h-full p-8 flex flex-col">
          {title && (
            <div className="mb-8">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-2">{title}</h2>
              {subtitle && <p className="text-xl text-slate-600">{subtitle}</p>}
            </div>
          )}

          <div className="flex-1 relative">
            {children}
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="px-8 py-4 bg-white border-t border-slate-200 flex justify-between items-center z-10">
        <div className="text-sm text-slate-400">
          Page {currentSlide} of {totalSlides}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onPrev}
            disabled={currentSlide === 1}
            className={`p-2 rounded-full transition-all ${
              currentSlide === 1
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:shadow-md'
            }`}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides}
            className={`p-2 rounded-full transition-all ${
              currentSlide === totalSlides
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : 'bg-google-blue hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SlideLayout;
