import React, { useState } from 'react';
import { XCircle, CheckCircle, ArrowRight, Pizza } from 'lucide-react';

const FewShotSlide = () => {
  const [activeTab, setActiveTab] = useState('bad'); // 'bad' or 'good'

  const zeroShotPrompt = `把这个披萨订单转成 JSON:
"我要一个双拼披萨，左边意大利香肠，右边夏威夷。"`;

  const zeroShotOutput = `{
  "order": "pizza",
  "desc": "half pepperoni half hawaiian"
}
// ❌ 结构混乱，没有处理嵌套逻辑`;

  const fewShotPrompt = `把这个披萨订单转成 JSON。

示例 1:
输入: "我要一个芝士披萨。"
输出: { "type": "pizza", "toppings": ["cheese"] }

示例 2:
输入: "来个双拼，一半蘑菇，一半火腿。"
输出: {
  "type": "pizza",
  "style": "split",
  "left": ["mushroom"],
  "right": ["ham"]
}

任务:
输入: "我要一个双拼披萨，左边意大利香肠，右边夏威夷。"
输出:`;

  const fewShotOutput = `{
  "type": "pizza",
  "style": "split",
  "left": ["pepperoni"],
  "right": ["ham", "pineapple"]
}
// ✅ 完美理解“夏威夷”包含火腿和菠萝，结构清晰`;

  return (
    <div className="h-full flex flex-col items-center justify-start p-2">

      {/* Tab Switcher */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6 w-full max-w-md">
        <button
          onClick={() => setActiveTab('bad')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'bad' ? 'bg-white text-red-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <XCircle size={18} />
          Zero-Shot (零样本)
        </button>
        <button
          onClick={() => setActiveTab('good')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'good' ? 'bg-white text-green-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <CheckCircle size={18} />
          Few-Shot (少样本)
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full h-full max-h-[60vh]">

        {/* Left: Concept */}
        <div className="w-full md:w-1/3 flex flex-col justify-center gap-6">
           <div className={`p-6 rounded-2xl border-2 transition-colors ${activeTab === 'bad' ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-full ${activeTab === 'bad' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'}`}>
                  <Pizza size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  {activeTab === 'bad' ? '不仅是“没给例子”' : '核心原则：Provide Examples'}
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {activeTab === 'bad'
                  ? '当你不给示例时，模型只能猜测你想要的 JSON 格式。对于“双拼”这种复杂逻辑，它往往会偷懒或产生幻觉。'
                  : '通过提供 1-2 个清晰的示例（Input -> Output），你不仅定义了格式，还教会了模型处理“边缘情况”的逻辑。'}
              </p>
           </div>
        </div>

        {/* Right: Code/Prompt Area */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Prompt Box */}
          <div className="flex-1 bg-slate-800 rounded-xl p-0 overflow-hidden shadow-lg flex flex-col">
            <div className="bg-slate-900 px-4 py-2 text-xs font-mono text-slate-400 flex justify-between items-center">
              <span>PROMPT INPUT</span>
              <span className="bg-slate-700 text-white px-2 py-0.5 rounded text-[10px]">TEXT</span>
            </div>
            <div className="p-4 overflow-auto font-mono text-sm text-slate-300 whitespace-pre-wrap">
              {activeTab === 'bad' ? zeroShotPrompt : fewShotPrompt}
            </div>
          </div>

          <div className="flex justify-center -my-2 z-10">
            <div className="bg-white rounded-full p-2 shadow border border-slate-200">
              <ArrowRight className="text-slate-400" />
            </div>
          </div>

          {/* Output Box */}
          <div className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl p-0 overflow-hidden flex flex-col">
             <div className="bg-slate-100 px-4 py-2 text-xs font-mono text-slate-500 flex justify-between items-center">
              <span>MODEL OUTPUT</span>
              <span className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px]">JSON</span>
            </div>
            <div className={`p-4 overflow-auto font-mono text-sm whitespace-pre-wrap ${activeTab === 'bad' ? 'text-red-600' : 'text-green-700'}`}>
              {activeTab === 'bad' ? zeroShotOutput : fewShotOutput}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FewShotSlide;
