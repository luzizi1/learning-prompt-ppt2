import React, { useState } from 'react';
import { User, Bot, MapPin, MessageSquare, ArrowRight } from 'lucide-react';

const RoleSlide = () => {
  const [role, setRole] = useState('standard'); // 'standard' or 'sarcastic'
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (isTyping) return;

    // Clear previous chat for this demo to keep it clean
    setMessages([{ role: 'user', text: '推荐一些纽约的景点，我不想走太多路。' }]);
    setIsTyping(true);

    setTimeout(() => {
      const responseText = role === 'standard'
        ? "当然。如果您不想步行太多，建议您参观：\n1. 帝国大厦：可以直接乘电梯到达观景台。\n2. 时代广场：您可以坐在红台阶上观看人流。\n3. 中央公园：您可以乘坐马车游览主要景点。\n4. 大都会艺术博物馆：虽然很大，但轮椅和休息区设施完善。"
        : "哦，看来我们在寻找一种“久坐式”观光体验？\n\n好吧，懒人福音来了：去坐那个红色的双层观光巴士吧。你只需要坐在那里，让纽约在你的窗外移动，甚至不需要抬起你的脚趾。或者直接去时代广场找个椅子坐下，看看那些疯狂的游客——那本身就是一场免费的秀。别去爬自由女神像了，相信我，你的膝盖会感谢我的。";

      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col items-center p-4">

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl h-full">

        {/* Left: Configuration Panel */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
               <Bot size={20} className="text-google-blue" />
               设置系统提示 (System Prompt)
            </h3>

            <div className="space-y-4">
              <label className={`block cursor-pointer p-4 rounded-xl border-2 transition-all ${role === 'standard' ? 'border-google-blue bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input
                  type="radio"
                  name="role"
                  value="standard"
                  checked={role === 'standard'}
                  onChange={() => setRole('standard')}
                  className="hidden"
                />
                <div className="font-bold text-slate-800 mb-1">普通助手模式</div>
                <div className="text-xs text-slate-500 font-mono">System: You are a helpful travel assistant. Be polite and concise.</div>
              </label>

              <label className={`block cursor-pointer p-4 rounded-xl border-2 transition-all ${role === 'sarcastic' ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input
                  type="radio"
                  name="role"
                  value="sarcastic"
                  checked={role === 'sarcastic'}
                  onChange={() => setRole('sarcastic')}
                  className="hidden"
                />
                <div className="font-bold text-slate-800 mb-1">毒舌导游模式</div>
                <div className="text-xs text-slate-500 font-mono">System: You are a sarcastic, humorous tour guide. You dislike physical effort and roast tourists gently.</div>
              </label>
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-xl text-sm text-slate-600">
            <p>
              <strong>为什么这很重要？</strong><br/>
              如果不设定角色，模型会回归到“平庸的平均值”。赋予具体的角色（Persona）能显著改变用词、语气甚至思维方式。
            </p>
          </div>
        </div>

        {/* Right: Chat Simulation */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-inner">

          {/* Chat Header */}
          <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${role === 'standard' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
            <span className="font-bold text-slate-700">
              {role === 'standard' ? 'AI Assistant' : 'Sarcastic Guide'}
            </span>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                <MessageSquare size={48} className="mb-2" />
                <p>点击下方发送按钮开始对话</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-slate-800 text-white rounded-br-none'
                    : `${role === 'standard' ? 'bg-white border-blue-100 text-slate-700' : 'bg-purple-50 border-purple-100 text-purple-900'} border shadow-sm rounded-bl-none`
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
               <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area (Mock) */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="relative">
              <input
                type="text"
                value="推荐一些纽约的景点，我不想走太多路。"
                readOnly
                className="w-full bg-slate-100 border border-slate-200 rounded-full py-3 px-6 text-slate-600 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-google-blue hover:bg-blue-600 text-white p-2 rounded-full transition-colors disabled:bg-slate-300"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default RoleSlide;
