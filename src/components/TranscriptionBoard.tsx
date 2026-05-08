import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { CheckCircle2, ChevronLeft } from "lucide-react";

interface TranscriptionBoardProps {
  sentence: string;
  onBack: () => void;
}

export default function TranscriptionBoard({ sentence, onBack }: TranscriptionBoardProps) {
  const [input, setInput] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (input.trim() === sentence.trim()) {
      setComplete(true);
    }
  }, [input, sentence]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-2xl mx-auto space-y-10"
    >
      <button
        onClick={onBack}
        className="flex items-center text-white/30 hover:text-white/60 transition-colors group uppercase text-[10px] tracking-widest font-medium"
      >
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform mr-2" />
        <span>Return to the night</span>
      </button>

      <div className="space-y-8">
        <div className="p-10 glass-card rounded-[2rem] space-y-4">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-semibold italic">Original Passage</p>
          <p className="text-xl md:text-2xl korean-serif leading-[1.8] text-white/50 select-none italic">
            {sentence}
          </p>
        </div>

        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="이곳에 문장을 천천히 필사해보세요..."
            className={`w-full h-56 p-10 glass-card rounded-[2.5rem] text-xl md:text-2xl korean-serif leading-[1.8] focus:outline-none transition-all resize-none shadow-2xl ${
              complete ? "ring-1 ring-white/20 bg-white/[0.02]" : ""
            }`}
          />
          <AnimatePresence>
            {complete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-6 right-6 text-white/40"
              >
                <CheckCircle2 size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center px-4">
          <p className="text-[10px] text-white/20 uppercase tracking-widest font-light">
            {input.length} / {sentence.length} characters
          </p>
          {complete && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/40 text-xs italic korean-serif font-light"
            >
              마음을 정갈히 비우는 소중한 시간이었습니다.
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
