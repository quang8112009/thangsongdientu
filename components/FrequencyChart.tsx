import React, { useEffect, useRef } from 'react';

const FrequencyChart: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const requestRef = useRef<number>(null);
  
  const width = 1000;
  const height = 120;
  const centerY = height / 2;

  const animate = (time: number) => {
    if (!pathRef.current) return;

    // Tốc độ trôi của sóng
    const t = time * 0.005; 
    let pathData = "M 0 " + centerY;
    
    let phase = 0;
    for (let x = 0; x <= width; x += 2) { // Bước nhảy x=2 để mượt mà mà vẫn nhẹ
      const nx = x / width;
      
      // Tần số thay đổi từ cao (trái) sang thấp (phải)
      const freq = 0.5 * Math.pow(1 - nx, 2.5) + 0.01;
      
      // phase tích lũy theo x, trừ đi t để tạo hiệu ứng sóng chạy
      // Chúng ta nhân t với freq để sóng cao tần chạy nhanh hơn sóng thấp tần
      const wavePhase = (phase * 15) - (t * (freq * 50));
      
      const y = centerY + Math.sin(wavePhase) * (height / 2.2);
      pathData += ` L ${x} ${y}`;
      
      phase += freq;
    }

    pathRef.current.setAttribute('d', pathData);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-black/50 rounded-2xl p-6 border border-white/10 mt-6 shadow-inner overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-bold text-gray-200 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
          Biểu đồ động Tần số & Bước sóng
        </h3>
        <span className="text-xs text-gray-400 font-mono bg-white/5 px-2 py-1 rounded">Động lực học thời gian thực</span>
      </div>
      
      <div className="relative">
        {/* SVG Wave Animated */}
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-32 md:h-40 drop-shadow-[0_0_20px_rgba(0,243,255,0.5)]"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            fill="none"
            stroke="url(#waveGradientAnim)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeJoin="round"
          />
          <defs>
            <linearGradient id="waveGradientAnim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="20%" stopColor="#6366f1" />
              <stop offset="40%" stopColor="#06b6d4" />
              <stop offset="60%" stopColor="#22c55e" />
              <stop offset="80%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </svg>

        {/* Labels */}
        <div className="flex justify-between mt-6 text-xs md:text-sm text-gray-300 font-mono border-t border-white/10 pt-4">
          <div className="flex flex-col items-start gap-1">
            <span className="text-purple-400 font-bold">10²² Hz</span>
            <span className="text-gray-500 text-[10px]">10⁻¹⁴ m</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-blue-400 font-bold">10¹⁶ Hz</span>
            <span className="text-gray-500 text-[10px]">10⁻⁸ m</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-green-400 font-bold">10¹⁴ Hz</span>
            <span className="text-gray-500 text-[10px]">0.5 μm</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-red-400 font-bold">10¹⁰ Hz</span>
            <span className="text-gray-500 text-[10px]">10⁻² m</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-yellow-400 font-bold">10⁴ Hz</span>
            <span className="text-gray-500 text-[10px]">10⁴ m</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-medium text-gray-400">
        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
          <div className="w-8 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.5)]"></div>
          <span>Dao động nhanh (Năng lượng cao)</span>
        </div>
        <div className="flex items-center gap-3 justify-end bg-white/5 p-2 rounded-lg text-right">
          <span>Dao động chậm (Năng lượng thấp)</span>
          <div className="w-8 h-1 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
        </div>
      </div>
    </div>
  );
};

export default FrequencyChart;