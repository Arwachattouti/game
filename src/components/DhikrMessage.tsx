import { AnimatePresence, motion } from 'framer-motion';
import { DhikrEvent } from '../types/spiritual';

interface DhikrMessageProps {
  dhikr?: (DhikrEvent & { subtitle: string }) | null;
  showAllDhikr?: boolean;
}

const DhikrMessage: React.FC<DhikrMessageProps> = ({ dhikr, showAllDhikr = false }) => {
  const allDhikr = [
    { arabic: 'سبحان الله', transliteration: 'SubhanAllah', meaning: 'Glory be to Allah' },
    { arabic: 'الحمد لله', transliteration: 'Alhamdulillah', meaning: 'Praise be to Allah' },
    { arabic: 'الله أكبر', transliteration: 'Allahu Akbar', meaning: 'Allah is Greatest' }
  ];

  return (
    <AnimatePresence>
      {showAllDhikr ? (
        <motion.div
          key="all-dhikr"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-50 space-y-4"
        >
          {allDhikr.map((dhikrItem, index) => (
            <motion.div
              key={dhikrItem.arabic}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-gradient-to-r from-purple-900/95 via-purple-950/90 to-violet-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-violet-900/40 min-w-[280px]"
            >
              <div className="text-2xl leading-tight mb-1 text-white font-bold">{dhikrItem.arabic}</div>
              <div className="text-xs text-purple-200/70 uppercase tracking-[0.15em]">{dhikrItem.transliteration}</div>
              <div className="text-xs text-purple-100/80 italic">{dhikrItem.meaning}</div>
            </motion.div>
          ))}
        </motion.div>
      ) : dhikr ? (
        <motion.div
          key={dhikr.type}
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[min(92vw,34rem)] rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/90 via-purple-950/80 to-violet-950/90 p-5 shadow-2xl shadow-violet-900/30 backdrop-blur-xl text-center"
        >
          <div className="text-3xl leading-tight mb-2 text-white">{dhikr.arabic}</div>
          <div className="text-sm text-purple-200/80 uppercase tracking-[0.24em] mb-3">{dhikr.emotion}</div>
          <div className="text-sm text-purple-100/90">{dhikr.subtitle}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default DhikrMessage;
