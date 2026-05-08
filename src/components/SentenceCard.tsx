import { motion } from "motion/react";
import { Quote, Heart, Edit3 } from "lucide-react";
import { CuratedSentence } from "../services/gemini";

interface SentenceCardProps {
  data: CuratedSentence;
  onTranscriptionClick: () => void;
}

export default function SentenceCard({ data, onTranscriptionClick }: SentenceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 25 }}
      className="w-full max-w-2xl mx-auto glass-card p-12 md:p-16 rounded-[3rem] relative overflow-hidden group"
    >
      {/* Background Glow Effect */}
      <div className="absolute w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] -top-32 -left-32 z-0" />
      
      {/* Decorative Quote Icon */}
      <div className="absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center">
        <span className="text-5xl text-white/5 serif-display">“</span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-2xl md:text-3xl leading-[1.8] korean-serif text-white/90 glow-text italic">
            "{data.sentence}"
          </p>
          <div className="w-12 h-[1px] bg-white/20 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-base text-white/60 korean-serif font-light">{data.bookTitle}</p>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] serif-display mt-1">{data.author}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-md text-slate-400 text-sm leading-relaxed font-light italic korean-serif px-4"
        >
          {data.explanation}
        </motion.div>

        <div className="flex gap-8 pt-4">
          <button className="flex flex-col items-center gap-2 group/btn">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-white/10 transition-all">
              <Heart size={20} className="text-white/40 group-hover/btn:text-pink-500/80 group-hover/btn:fill-pink-500/20 transition-all" />
            </div>
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">Connect</span>
          </button>
          
          <button 
            onClick={onTranscriptionClick}
            className="flex flex-col items-center gap-2 group/btn"
          >
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-white/10 transition-all">
              <Edit3 size={20} className="text-white/40 group-hover/btn:text-white transition-all" />
            </div>
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">Transcribe</span>
          </button>
        </div>
      </div>

      {/* Background Decorative Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]">
        <motion.path
          d="M 10,10 L 90,90 M 90,10 L 10,90"
          stroke="white"
          strokeWidth="0.2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
}
