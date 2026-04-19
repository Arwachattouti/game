import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Battery, Trophy, ArrowRight, Play, Lock, Gift, BookOpen, RefreshCw, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LEVELS, Level, SURPRISE_MESSAGES } from './config';
import StarBackground from './components/StarBackground';
import DhikrMessage from './components/DhikrMessage';
import { soundManager } from './utils/sounds';

type GameState = 'home' | 'map' | 'playing' | 'reward' | 'gallery' | 'loot' | 'failed';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('home');
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem('nightMission_unlocked');
    return saved ? JSON.parse(saved) : [1];
  });
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [targetPos, setTargetPos] = useState({ top: '50%', left: '50%' });
  const [lastLootTime, setLastLootTime] = useState(() => {
    return Number(localStorage.getItem('nightMission_lastLoot')) || 0;
  });
  const [lootMessage, setLootMessage] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [showAllDhikr, setShowAllDhikr] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showAllDhikrMessages = useCallback(() => {
    setShowAllDhikr(true);
    // Hide after 2 seconds
    setTimeout(() => setShowAllDhikr(false), 2000);
  }, []);

  useEffect(() => {
    localStorage.setItem('nightMission_unlocked', JSON.stringify(unlockedLevels));
  }, [unlockedLevels]);

  useEffect(() => {
    if (gameState === 'playing' && currentLevel?.timeLimit) {
      setTimeLeft(currentLevel.timeLimit);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            soundManager.playError();
            setGameState('failed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, currentLevel]);

  const moveTarget = useCallback(() => {
    setTargetPos({
      top: `${Math.random() * 70 + 15}%`,
      left: `${Math.random() * 70 + 15}%`
    });
  }, []);

  const startLevel = (level: Level) => {
    setCurrentLevel(level);
    setScore(0);
    moveTarget();
    setGameState('playing');
  };

  const completeLevel = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    soundManager.playSuccess();
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#d946ef', '#3b82f6', '#f472b6']
    });

    if (currentLevel && !unlockedLevels.includes(currentLevel.id + 1) && currentLevel.id < LEVELS.length) {
      setUnlockedLevels(prev => [...prev, currentLevel.id + 1]);
    }

    setGameState('reward');
  }, [currentLevel, unlockedLevels]);

  const handleAction = () => {
    if (!currentLevel) return;
    soundManager.playPop();
    const newScore = score + 1;
    setScore(newScore);

    if (currentLevel.gameType === 'moving' || currentLevel.gameType === 'find') {
      moveTarget();
    }

    // Show all 3 Dhikr messages on every click
    showAllDhikrMessages();

    if (newScore >= currentLevel.targetScore) {
      completeLevel();
    }
  };

  const openLootBox = () => {
    const now = Date.now();
    const diff = now - lastLootTime;
    const cooldown = 60 * 1000; // 1 minute cooldown for testing, usually 1 day

    if (diff < cooldown) {
      const remaining = Math.ceil((cooldown - diff) / 1000);
      setNotification(`Supply drop incoming in ${remaining}s! 🫡`);
      setTimeout(() => setNotification(null), 3000);
      soundManager.playError();
      return;
    }

    soundManager.playSuccess();
    const msg = SURPRISE_MESSAGES[Math.floor(Math.random() * SURPRISE_MESSAGES.length)];
    setLootMessage(msg);
    setLastLootTime(now);
    localStorage.setItem('nightMission_lastLoot', now.toString());
    setGameState('loot');
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-purple-500/30 overflow-hidden">
      <StarBackground />
      
      <main className="relative z-10 container mx-auto px-4 h-screen flex flex-col items-center justify-center">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-full text-red-200 text-sm font-bold backdrop-blur-md shadow-2xl flex items-center gap-3"
            >
              <Lock size={16} /> {notification}
            </motion.div>
          )}
        </AnimatePresence>

        <DhikrMessage showAllDhikr={showAllDhikr} />

        <AnimatePresence mode="wait">
          {gameState === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8"
            >
              <div className="space-y-2">
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 drop-shadow-sm"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Night Mission
                </motion.h1>
                <p className="text-purple-200/80 text-lg md:text-xl italic font-light">
                  "This mission is only for you 🌙"
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  soundManager.playPop();
                  setGameState('map');
                }}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-full font-bold text-xl transition-all flex items-center gap-2 mx-auto border border-purple-400/30 shadow-lg"
              >
                Start Mission <Play size={24} fill="currentColor" />
              </motion.button>
            </motion.div>
          )}

          {gameState === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl px-4"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-purple-200">Mission Terminal</h2>
                <div className="h-1 w-24 bg-purple-500 mx-auto mt-2 rounded-full" />
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openLootBox}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600/20 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm font-bold"
                >
                  <Gift size={18} /> Daily Supply Drop
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameState('gallery')}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-bold"
                >
                  <BookOpen size={18} /> Memory Log
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {LEVELS.map((level) => {
                  const isUnlocked = unlockedLevels.includes(level.id);
                  const isCompleted = unlockedLevels.includes(level.id + 1) || (level.id === LEVELS.length && unlockedLevels.includes(level.id));
                  return (
                    <motion.button
                      key={level.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: level.id * 0.05 }}
                      whileHover={isUnlocked ? { scale: 1.05, y: -2 } : {}}
                      whileTap={isUnlocked ? { scale: 0.95 } : {}}
                      disabled={!isUnlocked}
                      onClick={() => startLevel(level)}
                      className={`relative p-4 rounded-xl text-left border transition-all group ${
                        isUnlocked 
                          ? 'bg-purple-900/40 border-purple-500/50 hover:border-purple-400 cursor-pointer shadow-lg' 
                          : 'bg-black/40 border-gray-800 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-purple-500/20' : 'bg-gray-800/40'}`}>
                          {level.id === LEVELS.length ? (
                            <Trophy size={18} className={isUnlocked ? "text-yellow-400" : "text-gray-500"} />
                          ) : (
                            <Star size={18} className={isUnlocked ? "text-purple-300" : "text-gray-500"} />
                          )}
                        </div>
                        {!isUnlocked && <Lock className="text-gray-500" size={14} />}
                        {isCompleted && isUnlocked && <div className="p-1 bg-green-500/20 rounded-full border border-green-500/30"><Trophy size={10} className="text-green-400" /></div>}
                      </div>
                      <h3 className="text-sm font-bold mb-1 line-clamp-1">{level.title}</h3>
                      <div className="mt-2 flex items-center gap-1 text-[8px] font-mono uppercase tracking-tighter text-purple-400/60">
                         <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-green-500' : isUnlocked ? 'bg-purple-500 animate-pulse' : 'bg-gray-600'}`} />
                         {isCompleted ? 'Completed' : isUnlocked ? 'Ready' : 'Locked'}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <button 
                onClick={() => setGameState('home')}
                className="mt-8 text-purple-300/40 hover:text-purple-300 transition-colors flex items-center gap-2 mx-auto text-sm"
              >
                Back to Home
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && currentLevel && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="w-full max-w-lg text-center"
            >
              <div className="mb-4 space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono text-purple-400/60 uppercase">
                  <span>Objective: {currentLevel.title}</span>
                  {currentLevel.timeLimit && (
                    <span className={timeLeft < 5 ? 'text-red-500 animate-pulse font-bold' : ''}>
                      Time Remaining: {timeLeft}s
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold">{currentLevel.description}</h2>
              </div>

              <div className="relative aspect-square bg-purple-900/10 rounded-[2.5rem] border-2 border-purple-500/20 overflow-hidden flex items-center justify-center p-8 backdrop-blur-sm">
                {(currentLevel.gameType === 'clicker' || currentLevel.gameType === 'speed') && (
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleAction}
                      className={`w-36 h-36 md:w-52 md:h-52 rounded-full flex items-center justify-center shadow-2xl group relative overflow-hidden transition-colors ${
                        currentLevel.gameType === 'speed' ? 'bg-gradient-to-br from-red-600 to-purple-700' : 'bg-gradient-to-br from-purple-600 to-pink-600'
                      }`}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-white/20"
                        initial={{ y: '100%' }}
                        animate={{ y: `${100 - (score / currentLevel.targetScore) * 100}%` }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                      />
                      {currentLevel.id >= 6 ? (
                        <Trophy size={64} className="text-white group-hover:scale-110 transition-transform relative z-10" />
                      ) : (
                        <Battery size={64} className="text-white relative z-10" />
                      )}
                    </motion.button>
                    <div className="w-full max-w-[240px] space-y-2">
                       <div className="flex justify-between text-[10px] font-mono text-purple-300/60">
                         <span>SYNC PROGRESS</span>
                         <span>{Math.floor((score / currentLevel.targetScore) * 100)}%</span>
                       </div>
                       <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-purple-500/20">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${(score / currentLevel.targetScore) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(currentLevel.gameType === 'find' || currentLevel.gameType === 'moving') && (
                  <div className="relative w-full h-full">
                     <motion.button
                      animate={{ 
                        top: targetPos.top, 
                        left: targetPos.left,
                      }}
                      transition={{ 
                        type: 'spring', 
                        damping: 15, 
                        stiffness: 100,
                        duration: currentLevel.gameType === 'moving' ? 0.3 : 0 
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={handleAction}
                      className="absolute -translate-x-1/2 -translate-y-1/2 p-4 bg-pink-500/20 border-2 border-pink-500/40 rounded-full transition-colors cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.3)] group"
                    >
                      <Heart size={32} className="text-pink-400 group-hover:text-pink-300 group-hover:scale-110 transition-all" />
                    </motion.button>
                    <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-purple-200/40 text-[10px] font-mono tracking-[0.2em] uppercase">
                      Tracking pulse: {score}/{currentLevel.targetScore}
                    </p>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setGameState('map')}
                className="mt-8 text-purple-300/40 hover:text-purple-300 transition-colors flex items-center gap-2 mx-auto text-sm"
              >
                <X size={16} /> Abort Mission
              </button>
            </motion.div>
          )}

          {gameState === 'reward' && currentLevel && (
            <motion.div
              key="reward"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl w-full text-center px-4"
            >
              <div className="mb-6 inline-flex p-4 bg-yellow-400/10 rounded-full text-yellow-400 border border-yellow-400/20">
                <Trophy size={48} />
              </div>
              
              <h2 className="text-3xl font-bold mb-8 text-purple-100">Mission Accomplished</h2>
              
              <motion.div 
                className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
                
                <div className="absolute top-4 left-6 text-[10px] font-mono text-purple-400/40 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Secure Message Decrypted
                </div>

                <motion.p 
                  className="text-2xl md:text-3xl font-medium leading-relaxed italic text-purple-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  "{currentLevel.message}"
                </motion.p>
                
                <div className="mt-8 flex justify-center gap-2">
                   {[1,2,3].map(i => (
                     <motion.div 
                       key={i}
                       animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                       transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                       className="w-2 h-2 bg-purple-400 rounded-full"
                     />
                   ))}
                </div>
              </motion.div>

              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setGameState('map')}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-all border border-white/10"
                >
                  Return to Terminal
                </button>
                {currentLevel.id < LEVELS.length && (
                  <button
                    onClick={() => {
                      const next = LEVELS.find(l => l.id === currentLevel.id + 1);
                      if (next) startLevel(next);
                    }}
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                  >
                    Next Mission <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {gameState === 'loot' && (
            <motion.div
              key="loot"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-lg w-full text-center"
            >
              <div className="mb-8 relative inline-block">
                <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full" />
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Gift size={80} className="text-yellow-400 relative z-10" />
                </motion.div>
              </div>

              <h2 className="text-3xl font-bold mb-4 text-yellow-400">Supply Drop Unlocked!</h2>
              
              <motion.div 
                className="bg-gradient-to-b from-yellow-500/10 to-transparent p-8 rounded-3xl border border-yellow-500/20 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xl font-medium text-yellow-100 italic">
                  "{lootMessage}"
                </p>
              </motion.div>

              <button
                onClick={() => setGameState('map')}
                className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-full font-bold transition-all text-white shadow-lg shadow-yellow-900/20"
              >
                Confirm Collection
              </button>
            </motion.div>
          )}

          {gameState === 'failed' && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-md w-full text-center space-y-8"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
                <X size={80} className="text-red-500 relative z-10 mx-auto" />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-red-500 tracking-tighter uppercase italic">Mission Failed</h2>
                <p className="text-purple-200/60 font-mono text-sm uppercase">Connection Lost • Time Expired</p>
              </div>
              <p className="text-purple-100 text-lg">
                Don't worry, even the best gamers need a second try. I believe in you! 🎮💪
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => currentLevel && startLevel(currentLevel)}
                  className="px-8 py-4 bg-red-600 hover:bg-red-500 rounded-full font-bold text-xl transition-all shadow-lg shadow-red-900/40 flex items-center justify-center gap-2"
                >
                  <RefreshCw size={24} /> Retry Mission
                </button>
                <button
                  onClick={() => setGameState('map')}
                  className="text-purple-300/60 hover:text-purple-300 transition-colors"
                >
                  Return to Terminal
                </button>
              </div>
            </motion.div>
          )}

          {gameState === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl max-h-[80vh] flex flex-col"
            >
              <div className="text-center mb-8 shrink-0">
                <h2 className="text-3xl font-bold text-purple-200">Memory Log</h2>
                <p className="text-purple-400/60 text-sm">Reviewing your mission history</p>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar">
                {LEVELS.map((level) => {
                  const isUnlocked = unlockedLevels.includes(level.id + 1) || (level.id === LEVELS.length && unlockedLevels.includes(level.id));
                  return (
                    <div 
                      key={level.id}
                      className={`p-6 rounded-2xl border transition-all ${
                        isUnlocked 
                          ? 'bg-white/5 border-purple-500/30' 
                          : 'bg-black/20 border-gray-800 opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <div className={`p-2 rounded-lg ${isUnlocked ? 'bg-purple-500/20 text-purple-300' : 'bg-gray-800 text-gray-500'}`}>
                          {isUnlocked ? <Trophy size={16} /> : <Lock size={16} />}
                        </div>
                        <h3 className="font-bold text-purple-100">{level.title}</h3>
                      </div>
                      <p className="text-purple-200/80 italic text-sm">
                        {isUnlocked ? `"${level.message}"` : "Mission data encrypted. Complete mission to view."}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => setGameState('map')}
                className="mt-8 px-6 py-2 bg-purple-600/20 hover:bg-purple-600/40 rounded-full text-purple-300 transition-all flex items-center gap-2 mx-auto"
              >
                <RefreshCw size={16} /> Update Feed
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-4 left-0 w-full px-4 flex justify-between items-center text-purple-200/20 text-[10px] uppercase tracking-[0.2em]">
        <div className="pointer-events-none">
          Operative: My Favorite Person • Mission {unlockedLevels.length}/{LEVELS.length}
        </div>
        <button 
          onClick={() => {
            if(confirm('Reset all mission progress?')) {
              setUnlockedLevels([1]);
              setGameState('home');
              localStorage.removeItem('nightMission_unlocked');
            }
          }}
          className="pointer-events-auto hover:text-purple-400/40 transition-colors"
        >
          Reset Data
        </button>
      </footer>
    </div>
  );
};

export default App;
