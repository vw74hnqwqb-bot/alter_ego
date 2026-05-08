import { motion } from "motion/react";
import { Send } from "lucide-react";
import { useState } from "react";

interface EmotionInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export default function EmotionInput({ onSend, isLoading }: EmotionInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text);
      setText("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
    >
      <div className="md:col-span-4 space-y-6">
        <div>
          <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2 block">Emotional Echo</span>
          <h2 className="text-3xl font-light leading-snug korean-serif glow-text">
            오늘 당신의 밤은<br/>어떤 색인가요?
          </h2>
        </div>
        
        <div className="flex items-center gap-4 pt-4">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 glass-card" />
            ))}
          </div>
          <p className="text-[10px] text-white/40 italic tracking-wider">지금 1,248명이 당신과 같은 하늘을 보고 있습니다.</p>
        </div>
      </div>

      <div className="md:col-span-8">
        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-[2rem] flex flex-col space-y-4 shadow-2xl relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="누구에게도 말하지 못한 마음의 한 조각을 적어주세요..."
            className="bg-transparent border-none outline-none resize-none min-h-[160px] text-white/80 placeholder:text-white/20 korean-serif text-lg leading-[1.8] focus:ring-0"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="w-full py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-[11px] tracking-[0.3em] uppercase text-white/60 hover:text-white disabled:opacity-30"
          >
            Find My Star
          </button>
        </form>
      </div>
    </motion.div>
  );
}
