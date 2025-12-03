import React, { useState } from 'react';
import SlideLayout from './components/SlideLayout';
import CoverSlide from './components/slides/CoverSlide';
import ConceptSlide from './components/slides/ConceptSlide';
import TemperatureSlide from './components/slides/TemperatureSlide';
import FewShotSlide from './components/slides/FewShotSlide';
import RoleSlide from './components/slides/RoleSlide';
import CoTSlide from './components/slides/CoTSlide';
import SummarySlide from './components/slides/SummarySlide';

function App() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const slides = [
    { component: CoverSlide, title: "", subtitle: "" },
    { component: ConceptSlide, title: "观念转变：什么是提示工程？", subtitle: "从“搜索”到“教导”的思维跃迁" },
    { component: TemperatureSlide, title: "核心配置：控制随机性", subtitle: "理解 Temperature 参数对输出的影响" },
    { component: FewShotSlide, title: "最强技巧：少样本提示 (Few-Shot)", subtitle: "Example is all you need" },
    { component: RoleSlide, title: "结构化技巧：角色与系统提示", subtitle: "赋予 AI 人格与大局观" },
    { component: CoTSlide, title: "进阶逻辑：思维链 (CoT)", subtitle: "Let's think step by step" },
    { component: SummarySlide, title: "最佳实践清单", subtitle: "Takeaways" }
  ];

  const CurrentSlideComponent = slides[currentSlide - 1].component;
  const currentTitle = slides[currentSlide - 1].title;
  const currentSubtitle = slides[currentSlide - 1].subtitle;

  const handleNext = () => {
    if (currentSlide < slides.length) {
      setCurrentSlide(curr => curr + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 1) {
      setCurrentSlide(curr => curr - 1);
    }
  };

  return (
    <SlideLayout
      title={currentTitle}
      subtitle={currentSubtitle}
      currentSlide={currentSlide}
      totalSlides={slides.length}
      onNext={handleNext}
      onPrev={handlePrev}
    >
      <CurrentSlideComponent />
    </SlideLayout>
  );
}

export default App;
