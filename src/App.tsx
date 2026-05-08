import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Stars } from "lucide-react";
import StarrySky from "./components/StarrySky";
import EmotionInput from "./components/EmotionInput";
import SentenceCard from "./components/SentenceCard";
import TranscriptionBoard from "./components/TranscriptionBoard";
import { curateSentence, CuratedSentence } from "./services/gemini";

type ViewState = "input" | "loading" | "result" | "transcription";

export default function App() {
  const [view, setView] = useState<ViewState>("input");
  const [curatedData, setCuratedData] = useState<CuratedSentence | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSendEmotion = async (emotion: string) => {
    setView("loading");
    setError(null);
    try {
      const result = await curateSentence(emotion);
      setCuratedData(result);
      setView("result");
    } catch (err) {
      console.error(err);
      setError("밤하늘의 연결이 잠시 불안정합니다. 조금 뒤에 다시 시도해주세요.");
      setView("input");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <StarrySky />

      <main className="flex-grow relative z-10 container mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 flex flex-col items-center">
        {/* Navigation Section */}
        <nav className="w-full flex justify-between items-center px-4 mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center space-x-3 text-white"
          >
            <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-light tracking-celestial serif-display uppercase">Star-Sentence</span>
          </motion.div>
          <div className="hidden md:flex space-x-8 text-[10px] tracking-widest text-white/40 uppercase">
            {["Library", "Transcription", "My Stars"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Dynamic Views */}
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            {view === "input" && (
              <EmotionInput key="input" onSend={handleSendEmotion} isLoading={false} />
            )}

            {view === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-12 py-32"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 bg-blue-500/20 rounded-full blur-[80px] absolute -inset-8"
                  />
                  <div className="relative z-10 text-white/50">
                    <Sparkles size={40} className="animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-4">
                  <p className="text-2xl korean-serif font-light glow-text italic">밤하늘에 당신의 별을 띄우는 중...</p>
                  <p className="text-xs tracking-[0.2em] text-white/20 uppercase">Forging Constellations</p>
                </div>
              </motion.div>
            )}

            {view === "result" && curatedData && (
              <SentenceCard
                key="result"
                data={curatedData}
                onTranscriptionClick={() => setView("transcription")}
              />
            )}

            {view === "transcription" && curatedData && (
              <TranscriptionBoard
                key="transcription"
                sentence={curatedData.sentence}
                onBack={() => setView("result")}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer Section */}
        <footer className="fixed bottom-0 left-0 right-0 z-20 px-10 py-6 border-t border-white/5 flex justify-between items-center text-[10px] tracking-celestial text-white/20 uppercase">
          <div className="flex items-center gap-4">
            <span className="serif-display italic lowercase tracking-normal text-xs">the night is still young</span>
          </div>
          <div className="hidden sm:block">Seoul, {new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
          <div className="flex gap-6">
            <span className="hover:text-white/40 cursor-pointer">IG</span>
            <span className="hover:text-white/40 cursor-pointer">TW</span>
            <span className="hover:text-white/40 cursor-pointer">DM</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
