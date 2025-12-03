import React, { useState } from 'react';
import { Thermometer, RefreshCw, Zap, AlignLeft } from 'lucide-react';

const TemperatureSlide = () => {
  const [temp, setTemp] = useState(0.5);
  const [output, setOutput] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  // Scenarios configuration
  const scenarios = {
    precise: {
      question: "用户提问：15 * 15 等于多少？",
      answers: ["225", "225", "225", "225", "225"] // Always the same
    },
    creative: {
      question: "用户提问：给一款辣味巧克力起个名字",
      answers: [
        "烈焰熔岩 (Lava Heat) - 仿佛置身火山的味觉爆发。",
        "魔鬼之吻 (Devil's Kiss) - 甜蜜中带着危险的诱惑。",
        "甜辣交响曲 (Sweet & Spicy Symphony) - 两种极端的完美融合。",
        "可可辣椒 (Cocoa Chili) - 朴实无华但直击灵魂。",
        "红椒恋人 (Pepper Lover) - 献给那些无辣不欢的甜食党。"
      ]
    }
  };

  const activeScenario = temp < 0.5 ? scenarios.precise : scenarios.creative;
  const activeMode = temp < 0.5 ? "精确模式 (Temperature = 0)" : "创意模式 (Temperature = 1)";
  const activeColor = temp < 0.5 ? "bg-blue-600" : "bg-orange-500";
  const activeIcon = temp < 0.5 ? <Zap /> : <RefreshCw />;

  const generateResponse = () => {
    setIsAnimating(true);
    setOutput("");

    setTimeout(() => {
      const answers = activeScenario.answers;
      // If temp is low, pick index 0 always. If high, pick random.
      // We simulate "Temperature" behavior mathematically here for the demo.
      let selectedAnswer;
      if (temp < 0.3) {
        selectedAnswer = answers[0];
      } else {
        const randomIndex = Math.floor(Math.random() * answers.length);
        selectedAnswer = answers[randomIndex];
      }

      setOutput(selectedAnswer);
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div className="h-full flex flex-col items-center justify-start p-4">

      {/* Control Panel */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">

          {/* Slider Section */}
          <div className="flex-1 w-full">
            <div className="flex justify-between mb-4">
               <div className="flex items-center gap-2 text-slate-700 font-bold">
                 <Thermometer className={temp < 0.5 ? "text-blue-500" : "text-orange-500"} />
                 <span>参数设定</span>
               </div>
               <span className={`px-3 py-1 rounded-full text-sm font-mono ${temp < 0.5 ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>
                 Temperature: {temp}
               </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temp}
              onChange={(e) => {
                setTemp(parseFloat(e.target.value));
                setOutput(""); // Clear output on change
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
            />

            <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
              <span>0 (精确/逻辑/数学)</span>
              <span>1 (创意/发散/写作)</span>
            </div>
          </div>

          {/* Description Section */}
          <div className="flex-1 border-l border-slate-100 pl-8">
            <h4 className={`text-lg font-bold mb-2 ${temp < 0.5 ? "text-blue-600" : "text-orange-500"}`}>
              {activeMode}
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              {temp < 0.5
                ? "低温度让模型选择概率最高的 Token。适合数学、代码、事实性问答，结果稳定唯一。"
                : "高温度增加了选择低概率 Token 的机会。适合头脑风暴、创意写作，结果多样且不可预测。"}
            </p>
          </div>

        </div>
      </div>

      {/* Demo Section */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">

        {/* Input Card */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Input / Prompt</span>
          <div className="flex-1 flex items-center justify-center text-center">
            <p className="text-xl text-slate-800 font-medium">{activeScenario.question}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={generateResponse}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${activeColor} text-white hover:scale-110`}
          >
            {isAnimating ? <RefreshCw className="animate-spin" /> : <Zap size={32} fill="currentColor" />}
          </button>
        </div>

        {/* Output Card */}
        <div className={`flex-1 border rounded-xl p-6 flex flex-col transition-colors duration-300 min-h-[200px] ${output ? "bg-white border-slate-300 shadow-md" : "bg-slate-50 border-slate-200 border-dashed"}`}>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Output / Completion</span>
          <div className="flex-1 flex items-center justify-center">
             {output ? (
               <p className={`text-lg font-medium animate-in fade-in slide-in-from-bottom-2 ${temp < 0.5 ? "text-blue-800" : "text-orange-800 font-serif italic"}`}>
                 {output}
               </p>
             ) : (
               <span className="text-slate-300 italic">点击按钮生成回答...</span>
             )}
          </div>

          {output && temp >= 0.5 && (
            <div className="mt-4 text-center">
              <span className="text-xs text-orange-400 bg-orange-50 px-2 py-1 rounded">
                *尝试再次点击，看看结果是否不同
              </span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default TemperatureSlide;
