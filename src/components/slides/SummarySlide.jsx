import React from 'react';
import { CheckSquare, List, PlayCircle, FileJson, Repeat } from 'lucide-react';

const SummarySlide = () => {
  const cards = [
    {
      icon: <CheckSquare className="text-green-500" size={32} />,
      title: "Tell what to do, NOT what NOT to do",
      desc: "使用积极指令（Positive Instructions）。告诉模型“请做X”，而不是“别做Y”。",
      example: "Bad: 不要写太长。\nGood: 请将回复限制在 50 字以内。"
    },
    {
      icon: <FileJson className="text-blue-500" size={32} />,
      title: "明确输出格式",
      desc: "模型不知道你心里的默认格式。明确要求 JSON、表格或特定的分隔符。",
      example: "请以 CSV 格式输出，包含表头：Name, Age, Occupation。"
    },
    {
      icon: <Repeat className="text-purple-500" size={32} />,
      title: "迭代与记录 (Iterate & Document)",
      desc: "没有完美的提示词。就像写代码一样，不断测试、修改并记录不同版本的 Prompt 效果。",
      example: "保留 Prompt v1, v2 的测试记录，找出最优解。"
    },
    {
      icon: <PlayCircle className="text-orange-500" size={32} />,
      title: "Provide Examples (Few-Shot)",
      desc: "如果只记住一条规则，那就是这条。一个好的示例胜过一千字的描述。",
      example: "Input: A -> Output: B\nInput: C -> Output: D"
    }
  ];

  return (
    <div className="h-full flex flex-col justify-center items-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white group-hover:scale-110 transition-all border border-slate-100">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{card.title}</h3>
            </div>

            <p className="text-slate-600 mb-6 flex-1 leading-relaxed">
              {card.desc}
            </p>

            <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-500 border-l-4 border-slate-300">
              <pre className="whitespace-pre-wrap font-sans">{card.example}</pre>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-400 text-sm">
          Google AI Technical Guide | Internal Use Only
        </p>
      </div>
    </div>
  );
};

export default SummarySlide;
