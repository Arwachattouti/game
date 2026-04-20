export interface Level {
  id: number;
  title: string;
  description: string;
  gameType: 'clicker' | 'find' | 'speed' | 'moving';
  targetScore: number;
  message: string;
  timeLimit?: number; // for speed levels
}

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Mission: Star Dust",
    description: "Collect light to guide your way.",
    gameType: 'clicker',
    targetScore: 14,
    message: "As night falls, shield yourself with the Adhkar. May Allah grant you a restful sleep and protect your soul until you wake. Don't forget: 'Bismika Allahumma amutu wa ahya'. 🌙✨"
},
  {
    id: 2,
    title: "Mission: Hidden Heart",
    description: "A rare treasure is hidden in the dark.",
    gameType: 'find',
    targetScore: 5,
    message: "May Allah preserve your integrity and increase you in wisdom, patience, and good character. 🕊️"
  },
  {
    id: 3,
    title: "Mission: Energy Surge",
    description: "Power up for the challenges ahead.",
    gameType: 'clicker',
    targetScore: 30,
    message: "May Allah grant you the strength to overcome any obstacle and provide you with ease (Yusr) after every hardship. 🤲🌙"
  },
  {
    id: 4,
    title: "Mission: Rapid Pulse",
    description: "Sync your rhythm before the time runs out!",
    gameType: 'speed',
    targetScore: 22,
    timeLimit: 8,
    message: "May Allah grant you Tawfiq (success) in your endeavors and bless your time with productivity and peace. 🎮✨"
  },
  {
    id: 5,
    title: "Mission: Orbital Hunt",
    description: "Find the moving fragments of my heart.",
    gameType: 'moving',
    targetScore: 7,
    message: "May Allah bless your hard work, open the doors of Rizq (provision) for you, and reward your persistence. 💼✨"
  },
  {
    id: 6,
    title: "Mission: Core Fusion",
    description: "Combine all your energy for a massive burst.",
    gameType: 'clicker',
    targetScore: 60,
    message: "Keep your heart for Allah alone… and let everything else fade🤍 , May Allah facilitate for you whatever is best for your Deen, your life, and your future. ✨🤲"
  },
  {
    id: 7,
    title: "Mission: Hyper Drive",
    description: "Maximum speed required! Go go go!",
    gameType: 'speed',
    targetScore: 45,
    timeLimit: 10,
    message: "Reduce online noise and ragebait… protect your calm and stay focused on Allah. 🛡️"
  },
  {
    id: 8,
    title: "Final Mission: Eternal Glow",
    description: "Unleash the ultimate light. The final challenge.",
    gameType: 'moving',
    targetScore: 12,
    message: "Missions complete. May Allah accept your efforts, answer your prayers, and always keep you under His guidance. 🏆"
  }
];

export const SURPRISE_MESSAGES = [
  "May Allah put Barakah (blessing) in your day and your work. 🌟",
  "May your path always be easy and filled with success. 🤗",
  "Don't forget to take a break; your health is an Amanah (trust). 💧",
  "May Allah grant you success that exceeds your expectations. 💪",
  "May you always find peace in the remembrance of Allah. 😊",
  "Protect your peace of mind: avoid toxic content or 'ragebait' that brings no benefit to your soul. 🕊️",
  "Alhamdulillah for the progress you have made so far. 🍀",
  "May Allah choose for you what is best, even if it's hidden from your sight. ✨"
];
