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
    message: "May your night be as peaceful as the stars, and your dreams as bright as the sun. ✨"
  },
  {
    id: 2,
    title: "Mission: Hidden Heart",
    description: "A rare treasure is hidden in the dark.",
    gameType: 'find',
    targetScore: 5,
    message: "I appreciate your kindness and the way you care. You're truly special. 💖"
  },
  {
    id: 3,
    title: "Mission: Energy Surge",
    description: "Power up for the challenges ahead.",
    gameType: 'clicker',
    targetScore: 30,
    message: "May Allah protect you and give you strength in everything you do. I'm always rooting for you. 🤲🌙"
  },
  {
    id: 4,
    title: "Mission: Rapid Pulse",
    description: "Sync your rhythm before the time runs out!",
    gameType: 'speed',
    targetScore: 22,
    timeLimit: 8,
    message: "I'm so grateful to have you as my teammate in this game called life. You make everything better. 🎮✨"
  },
  {
    id: 5,
    title: "Mission: Orbital Hunt",
    description: "Find the moving fragments of my heart.",
    gameType: 'moving',
    targetScore: 7,
    message: "I'm so proud of all the hard work you do. You're a hero in my eyes. 🦸‍♂️💙"
  },
  {
    id: 6,
    title: "Mission: Core Fusion",
    description: "Combine all your energy for a massive burst.",
    gameType: 'clicker',
    targetScore: 60,
    message: "May your heart always be filled with joy and your path always be clear. You deserve the best. ✨🤲"
  },
  {
    id: 7,
    title: "Mission: Hyper Drive",
    description: "Maximum speed required! Go go go!",
    gameType: 'speed',
    targetScore: 45,
    timeLimit: 10,
    message: "Even on your toughest days, remember you're doing amazing. I'll always be your support. 🛡️💖"
  },
  {
    id: 8,
    title: "Final Mission: Eternal Glow",
    description: "Unleash the ultimate light. The final challenge.",
    gameType: 'moving',
    targetScore: 12,
    message: "You've completed all missions! Just remember: you are enough, you are loved, and you are my favorite player. ❤️🏆"
  }
];

export const SURPRISE_MESSAGES = [
  "You're doing great today! 🌟",
  "Sending you a warm digital hug. 🤗",
  "Don't forget to drink some water! 💧",
  "You are capable of amazing things. 💪",
  "May your day be filled with unexpected smiles. 😊",
  "Allah has something beautiful planned for you. 🤲",
  "I'm so lucky to know you. 🍀",
  "You make the world a bit brighter. ✨"
];

