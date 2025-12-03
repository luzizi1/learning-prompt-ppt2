import React, { useState } from 'react';
import { Brain, Calculator, ArrowDown, X, Check } from 'lucide-react';

const CoTSlide = () => {
  const [showLogic, setShowLogic] = useState(false);

  // The math problem
  const problem = "自助餐厅有 23 个苹果。如果他们用这 23 个苹果做午餐，并再买 6 个。如果他们平均分给 5 个人，每人能分到几个？";

  // Standard (Wrong) Response
  // Note: 23 + 6 = 29. 29 / 5 = 5.8.
  // Models often trip up on "lunch" thinking they ate them, or just hallucinate integer division.
  // For this demo, let's show a common logic skip error or just a direct (possibly wrong) guess vs detailed steps.
  // Let's use the Roger example from the paper or a similar clear logic trap.
  // Actually, the prompt says "23 used for lunch AND bought 6 more".
  // Wait, if they used 23 for lunch, they have 0 left? Or is "used... to make lunch" meaning they are serving them?
  // Let's stick to the classic Roger example for clarity:
  // "Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?"
  // Direct: 5 + 2 = 7? (Wrong)
  // CoT: 5 + (2 * 3) = 11. (Correct)

  const questionText = "Roger 有 5 个网球。他又买了两罐网球。每罐有 3 个网球。现在他一共有多少个网球？";

  const directAnswer = "答案是 11 个。"; // Even if correct, without reasoning it's risky.
  // Actually, standard LLM failure mode on this is often "5 + 2 = 7". Let's simulate that for "Standard Prompting".
  const wrongAnswer = "答案是 7 个。";

  const cotReasoning = `
1. Roger 一开始有 5 个球。
2. 他买了两罐球。
3. 每罐有 3 个球，所以两罐就是 2 * 3 = 6 个球。
4. 总数 = 初始的 5 个 + 新买的 6 个 = 11 个。

答案是 11 个。`;

  return (
    <div className="h-full flex flex-col items-center justify-start p-4">

      {/* The Question */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg shrink-0">
            <Calculator size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Question (Math Word Problem)</h3>
            <p className="text-xl font-medium text-slate-800">{questionText}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-stretch">

        {/* Left: Standard Prompting */}
        <div className={`flex-1 rounded-2xl border-2 p-6 flex flex-col transition-all duration-500 ${showLogic ? 'opacity-50 border-slate-200' : 'border-red-200 bg-red-50 shadow-md'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">直接提问 (Standard Prompting)</h3>
            {!showLogic && <X className="text-red-500" />}
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 font-mono text-sm text-slate-600 mb-4 flex-1">
             <span className="text-slate-400">Input:</span> {questionText}<br/>
             <span className="text-slate-400">Output:</span> {wrongAnswer}
          </div>

          <p className="text-sm text-slate-500 italic">
            模型试图直接预测答案，忽略了中间的乘法步骤，导致类似 "5+2=7" 的直觉错误。
          </p>
        </div>

        {/* Action Button (Centered) */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowLogic(true)}
            disabled={showLogic}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all ${
              showLogic
                ? 'bg-slate-200 text-slate-400 cursor-default'
                : 'bg-google-blue hover:bg-blue-600 text-white hover:scale-105'
            }`}
          >
            <Brain size={20} />
            {showLogic ? "思维链已激活" : "加入咒语: Let's think step by step"}
          </button>
        </div>

        {/* Right: Chain of Thought */}
        <div className={`flex-1 rounded-2xl border-2 p-6 flex flex-col transition-all duration-700 ${showLogic ? 'border-green-200 bg-green-50 shadow-md translate-y-0 opacity-100' : 'border-transparent opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">思维链 (Chain of Thought)</h3>
            <Check className="text-green-600" />
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 font-mono text-sm text-slate-800 mb-4 flex-1 whitespace-pre-wrap leading-relaxed relative overflow-hidden">
             {/* Highlight effect */}
             <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
             <span className="text-slate-400">Input:</span> {questionText} <span className="text-blue-600 font-bold">Let's think step by step.</span><br/>
             <span className="text-slate-400">Output:</span>
             {cotReasoning}
          </div>

          <p className="text-sm text-green-700 font-medium">
            强制模型把“思考过程”显式打印出来，不仅增加了推理的准确性，也让结果可解释。
          </p>
        </div>

      </div>

    </div>
  );
};

export default CoTSlide;
