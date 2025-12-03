import React from 'react';
import { Search, Bot, BrainCircuit, ArrowRight } from 'lucide-react';

const ConceptSlide = () => {
  return (
    <div className="h-full flex flex-col md:flex-row gap-8 items-stretch justify-center p-4">
      {/* Left Column: Technical Reality */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <BrainCircuit size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">技术本质：预测引擎</h3>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            LLM 不是在“回答问题”，而是在基于概率<strong className="text-blue-600">预测下一个 Token</strong>。
            提示工程的本质，就是通过调整输入，引导模型进入正确的预测路径。
          </p>

          {/* Visualizing Next Token Prediction */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm shadow-inner">
            <div className="flex flex-wrap gap-2 items-center text-lg">
              <span className="text-slate-500">Input:</span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">The</span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">sky</span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">is</span>
              <ArrowRight className="text-slate-400" size={20} />
              <div className="relative group">
                <span className="bg-blue-600 text-white px-2 py-1 rounded shadow-lg animate-pulse cursor-help">blue</span>
                {/* Tooltip for probabilities */}
                <div className="absolute left-0 top-full mt-2 w-32 bg-slate-800 text-slate-200 text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  blue: 85%<br/>clear: 10%<br/>gray: 3%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Mental Model */}
      <div className="flex-1 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
            <Bot size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">心智模型：聪明的实习生</h3>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-8">
          {/* Comparison Cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 opacity-60">
             <div className="flex items-center gap-2 mb-2 text-red-500 font-semibold">
               <Search size={20} />
               <span>错误思维：搜索引擎</span>
             </div>
             <p className="text-slate-500">“我只要输入关键词，它就应该知道我要什么。”</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-200 ring-2 ring-indigo-50">
             <div className="flex items-center gap-2 mb-2 text-indigo-600 font-bold">
               <Bot size={20} />
               <span>正确思维：超级实习生</span>
             </div>
             <p className="text-slate-700">“它极其聪明、博学，但<strong className="text-indigo-700">非常死板且没有常识</strong>。你需要给出极其明确的指令、背景和示例。”</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptSlide;
