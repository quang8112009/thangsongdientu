import React, { useState } from 'react';
import WaveCanvas from './components/WaveCanvas';
import { SPECTRUM_DATA } from './constants';
import SpectrumDetail from './components/SpectrumDetail';
import FrequencyChart from './components/FrequencyChart';
import { Info, ArrowRight, ArrowLeft } from 'lucide-react';
import { SpectrumBand } from './types';

const App: React.FC = () => {
  const [selectedBand, setSelectedBand] = useState<SpectrumBand>(SPECTRUM_DATA[3]); // Default to Visible Light

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-neon-blue selection:text-black pb-20">
      {/* Dynamic Background */}
      <WaveCanvas />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple mb-6 drop-shadow-2xl">
            THANG SÓNG ĐIỆN TỪ
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Mô hình trực quan hóa mối quan hệ mật thiết giữa tần số, bước sóng và năng lượng trong vũ trụ.
          </p>
        </header>

        {/* Main Interactive Scale */}
        <section className="mb-16">
          <div className="bg-space-blue/40 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Axis Labels */}
            <div className="flex justify-between text-sm md:text-base text-gray-300 font-semibold mb-6 px-4">
              <div className="flex flex-col">
                <span className="flex items-center gap-2 text-purple-400 uppercase tracking-wider"><ArrowLeft size={18}/> Tần số cực cao</span>
                <span className="text-xs text-gray-500 font-normal italic">Bước sóng siêu ngắn</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="flex items-center gap-2 text-yellow-400 uppercase tracking-wider">Tần số cực thấp <ArrowRight size={18}/></span>
                <span className="text-xs text-gray-500 font-normal italic">Bước sóng siêu dài</span>
              </div>
            </div>

            {/* The Bar - Enriched Size */}
            <div className="relative h-32 md:h-48 flex rounded-3xl overflow-hidden cursor-pointer ring-1 ring-white/10 group mb-10 shadow-2xl">
              {SPECTRUM_DATA.map((band) => (
                <div
                  key={band.id}
                  onClick={() => setSelectedBand(band)}
                  className={`relative flex-1 transition-all duration-700 hover:flex-[3] group/band
                    ${selectedBand.id === band.id ? 'flex-[3] ring-4 ring-white/50 z-10 scale-[1.03] shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'opacity-60 hover:opacity-100'}
                  `}
                  style={{ 
                    background: band.id === 'VISIBLE' ? band.color : band.color,
                    backgroundBlendMode: 'overlay'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/80"></div>
                  
                  {/* Label inside bar */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <span className={`text-xs md:text-lg font-black text-white drop-shadow-2xl text-center leading-tight transition-all duration-500 uppercase tracking-tighter
                       ${selectedBand.id === band.id ? 'scale-110 tracking-widest' : 'group-hover/band:scale-105'}
                    `}>
                      {band.name}
                    </span>
                  </div>

                  {/* Active Indicator Line */}
                  {selectedBand.id === band.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white shadow-[0_-5px_15px_rgba(255,255,255,0.8)]"></div>
                  )}
                </div>
              ))}
            </div>

            {/* BIG Frequency Visualization Chart */}
            <div className="px-2">
              <FrequencyChart />
            </div>

            {/* Scale Markers (μm) */}
            <div className="flex justify-between mt-10 px-6 text-xs md:text-sm text-gray-500 font-mono relative">
               <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-4"></div>
              <span className="hover:text-white transition-colors cursor-default">10⁻⁶ μm</span>
              <span className="hover:text-white transition-colors cursor-default">10⁻³ μm</span>
              <span className="hover:text-white transition-colors cursor-default font-bold text-green-500/50">1 μm</span>
              <span className="hover:text-white transition-colors cursor-default">10³ μm</span>
              <span className="hover:text-white transition-colors cursor-default">10⁶ μm</span>
              <span className="hover:text-white transition-colors cursor-default">10⁹ μm</span>
            </div>
          </div>
        </section>

        {/* Content Area: Details Only */}
        <div className="max-w-5xl mx-auto transform transition-all duration-500 hover:scale-[1.01]">
          <SpectrumDetail band={selectedBand} />
        </div>
        
        <footer className="mt-24 text-center text-gray-600 text-sm">
          <div className="flex justify-center gap-8 mb-4 opacity-50">
             <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-600 self-center"></div>
             <span className="font-bold tracking-widest uppercase">Thông số Vật Lý</span>
             <div className="h-px w-24 bg-gradient-to-l from-transparent to-gray-600 self-center"></div>
          </div>
          <p className="font-medium">© 2025 Interactive Physics Lab - Electromagnetic Waves</p>
          <p className="mt-2 italic text-neon-blue/60 font-mono">Công thức cơ bản: E = h·f | λ = c/f</p>
        </footer>
      </div>
    </div>
  );
};

export default App;