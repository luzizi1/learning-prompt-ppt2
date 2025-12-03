import React from 'react';

const CoverSlide = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden rounded-2xl bg-slate-900 text-white p-8">
      {/* Abstract Neural Network Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <defs>
             <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" style={{stopColor:'#4285F4', stopOpacity:1}} />
               <stop offset="100%" style={{stopColor:'#DB4437', stopOpacity:1}} />
             </linearGradient>
           </defs>
           <circle cx="10" cy="10" r="1" fill="white" className="animate-pulse" />
           <circle cx="90" cy="90" r="1" fill="white" className="animate-pulse" />
           <circle cx="50" cy="50" r="1" fill="white" className="animate-pulse" />
           <path d="M10,10 Q50,50 90,90" stroke="url(#grad1)" strokeWidth="0.5" fill="none" />
           <path d="M10,90 Q50,50 90,10" stroke="url(#grad1)" strokeWidth="0.5" fill="none" />
           {/* More complex network lines can be added here */}
        </svg>
      </div>

      <div className="z-10 relative max-w-3xl">
        <div className="mb-6 inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium tracking-wider uppercase">
          Google AI Technical Guide
        </div>
        <h1 className="text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-white to-red-400">
          解锁 AI 潜能：<br/>提示工程系统指南
        </h1>
        <p className="text-xl text-slate-300 mb-12 font-light">
          基于 Google 官方白皮书的核心实践，<br/>将您的认知从随意的“聊天”提升到结构化的“工程设计”。
        </p>

        <button className="px-8 py-3 bg-google-blue hover:bg-blue-600 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/30">
          开始探索
        </button>
      </div>
    </div>
  );
};

export default CoverSlide;
