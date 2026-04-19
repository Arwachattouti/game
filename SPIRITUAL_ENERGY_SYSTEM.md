# 🌙 SPIRITUAL ENERGY SYSTEM - GAME DESIGN DOCUMENT

## Executive Summary
Un système de progression subtil basé sur 5 énergies spirituelles qui influence naturellement le gameplay sans transformer le jeu en RPG complexe. Chaque joueur accumule des "vibrations énergétiques" qui créent des synergies, tout en revivant des moments sacrés via le dhikr intelligemment déclenché.

---

## 📊 PARTIE 1: LES 5 SYSTÈMES D'ÉNERGIE

### **1. DUST STAT** ✨ (Pureté & Clarté)
**Thématique**: "La poussière des étoiles qui guide ton esprit"

**Qu'est-ce que c'est?**
- Représente la **focalisation mentale** et la **clarté du but**
- Plus haut = clics plus "purs" (moins de clics gâchés sur mauvaises cibles)

**Mécanique**:
- **+1 Dust** chaque fois que tu complètes 3 clics consécutifs sans manquer
- **+2 Dust** quand tu réussis un niveau avec >80% d'efficacité (score/tentatives)
- **Max: 100**

**Effets Gameplay**:
- **À 25%**: Cibles en mode "Find" brillent légèrement pendant 0.2s avant de bouger
- **À 50%**: Les mauvais clics (hors cible) ne comptent plus contre toi
- **À 75%**: Les targets "Moving" ralentissent de 10%
- **À 100%**: Combo multiplicateur de score (voir section Combos)

**UI/Feedback**:
- Aura blanche/dorée autour du bouton principal
- Sparkles visuels lors du gain
- Indicator en bas: "Purity: 34/100" avec particules bleues

---

### **2. ENERGY SURGE** ⚡ (Puissance Brute)
**Thématique**: "L'éclat d'une explosion d'amour"

**Qu'est-ce que c'est?**
- La **force pure**, l'intensité des coups
- Plus haut = les clics valent plus

**Mécanique**:
- **+1 Energy** chaque 5 clics réussis
- **+5 Energy** quand tu termines une mission de type "clicker"
- **Max: 100**

**Effets Gameplay**:
- **À 25%**: Chaque clic vaut 1.05x sa valeur normale
- **À 50%**: Chaque clic vaut 1.15x
- **À 75%**: Chaque clic vaut 1.25x
- **À 100%**: Chaque clic vaut 1.5x + décharge visuelle d'électricité autour du bouton

**UI/Feedback**:
- Glow violet/rose autour du bouton
- Effet d'éclair au clic (petite animation)
- Indicator: "Surge: 67/100" avec barre d'électricité

---

### **3. RAPID PULSE** 💓 (Timing Parfait)
**Thématique**: "Le rythme de ton cœur qui résonne"

**Qu'est-ce que c'est?**
- La **synchronisation temporelle**, l'instinct
- Plus haut = bonus sur speed/reflexe

**Mécanique**:
- **+2 Rapid** chaque clic dans une mission "speed"
- **+10 Rapid** quand tu complètes un level "speed" sans timeout
- **-5 Rapid** si tu timeout (punition légère)
- **Max: 100**

**Effets Gameplay**:
- **À 25%**: Gain +0.5s de temps bonus sur speed levels
- **À 50%**: Gain +1.5s de temps bonus
- **À 75%**: Gain +2.5s de temps bonus
- **À 100%**: Temps visible pendant le jeu + "Zone" mode (10% ralenti visuel global, aide la precision)

**UI/Feedback**:
- Heartbeat pulse animation autour du timer
- Couleur du timer change: bleu → rose quand pulse augment
- Indicator: "Pulse: 89/100" avec battement

---

### **4. CORE FUSION** 🔮 (Stabilité & Concentration)
**Thématique**: "La fusion du cœur et de l'âme"

**Qu'est-ce que c'est?**
- La **cohérence énergétique**, la concentration prolongée
- Plus haut = meilleure rétention de focus, combos plus longs

**Mécanique**:
- **+3 Fusion** quand tu complètes un combo de 5+ clics rapides
- **+8 Fusion** quand tu réussis un level "moving" ou "find"
- **-2 Fusion** quand tu fails/timeout (perte de focus)
- **Max: 100**

**Effets Gameplay**:
- **À 25%**: Combo multiplicateur commence à 2x (au lieu de 1x)
- **À 50%**: Combo multiplicateur commence à 3x
- **À 75%**: Each combo hit = +10% multiplicateur au lieu de +5%
- **À 100%**: Combo jamais expire pendant 10 secondes (buff passif constant)

**UI/Feedback**:
- Aura bleu-vert concentrique autour du bouton
- Effet "cristal" lors de los gains
- Indicator: "Fusion: 45/100" avec ondes de cristal

---

### **5. HYPER DRIVE** 🚀 (Intensité Ultime)
**Thématique**: "L'accélération vers l'infini"

**Qu'est-ce que c'est?**
- L'**énergie chaotique**, l'accélération extrême
- Plus haut = plus de richesse mais aussi plus de risque

**Mécanique**:
- **+1 Hyper** chaque 10 clics (charge lentement et constamment)
- **+15 Hyper** quand tu complètes le level le plus difficile de ta session
- **-10 Hyper** quand tu fail une mission (risque élevé)
- **Max: 100**

**Effets Gameplay**:
- **À 25%**: Random 10% des clics donnent 2x points (chaotique)
- **À 50%**: Random 25% des clics donnent 2x points + 5% donnent 3x
- **À 75%**: Random 40% des clics donnent 2x points + 15% donnent 3x
- **À 100%**: "OVERDRIVE": Tous les clics valent entre 1.5x-3.5x (complètement chaotique mais puissant)

**UI/Feedback**:
- Pulsations rouges/orange extrêmes
- Particules de feu/étincelles
- Indicator: "Drive: 78/100" avec courbe chaotique
- DANGER VISUEL à 100% (pulsations folles)

---

## 🕋 PARTIE 2: DHIKR SYSTEM (Invocations Intelligentes)

### **Vue d'ensemble**
Les dhikrs ne sont JAMAIS spam. Ils respectent l'ambiance calme et émotionnelle du jeu. Chacun a un contexte émotionnel précis.

### **Les 4 Dhikrs**

```
1. سبحان الله (Subhan'Allah) - "Gloire à Allah"
   → Déclencheur: Moments de **clarté & pureté**
   → Contexte: Quand tu nettois ton gameplay (premiers clics purs)

2. الحمد لله (Alhamdulillah) - "Louange à Allah"
   → Déclencheur: Moments de **reconnaissance & gratitude**
   → Contexte: Après une réussite, quand tu achieves une milestone

3. الله أكبر (Allahu Akbar) - "Allah est Plus Grand"
   → Déclencheur: Moments de **défi surmonté & victoire**
   → Contexte: Quand tu complètes un level très difficile ou établis un nouveau record

4. أستغفر الله وأتوب إليه (Astaghfirullah wa atubu ilaih) - "Je cherche pardon"
   → Déclencheur: Moments de **recommencement & humilité**
   → Contexte: Après un fail, quand tu recommences avec sagesse

```

### **Système de Triggers Intelligents**

```typescript
// Les dhikrs s'activent UNIQUEMENT dans ces conditions:

SUBHAN_ALLAH:
  - Première fois que DUST_STAT passe à 25% (clarity breakthrough)
  - Quand tu complètes 3 levels consécutifs sans fail
  - Probabilité 15% quand tu gagnes avec >90% efficiency
  → Fréquence: Max 1x par 5 minutes

ALHAMDULILLAH:
  - Chaque fois que tu complètes un level (mais pas tous les jours)
  - Quand tu déverrouilles un nouveau level
  - Probabilité 40% quand tu reaches une "resonance" (voir partie combos)
  → Fréquence: 1-2x par session de jeu, max 4x par jour

ALLAHU_AKBAR:
  - Première fois que tu complètes une mission Ultra-difficile (id >= 6)
  - Quand tu établis un new personal record de score
  - Première fois que HYPER_DRIVE hits 100%
  → Fréquence: Max 1x par session importante

ASTAGHFIRULLAH:
  - Après 2 fails consécutifs sur le même level (invitation à recommencer)
  - Quand tu fais timeout 3 fois (gentle push to try harder)
  - Première fois que tu reviens après avoir quitté un level hard
  → Fréquence: Max 2x par session

```

### **Présentation Visuelle des Dhikrs**

```
Affichage:
- Au center de l'écran, texte arabe + translittération en bas
- Animation: Fade in, attendre 3s, fade out doucement
- Particules: Orbes de couleur qui tournent autour du texte
- Son: Chime doré subtil (très bas volume, pas lourd)
- Timing: Jamais pendant une action gameplay (hors du way)

Poétique:
L'écran se remplit de sérénité quand le dhikr s'affiche.
C'est un moment de pause, pas une "popup" agressive.

```

---

## 🎮 PARTIE 3: MISSION MAPPING

### **Comment les stats influencent chaque niveau**

```
LEVEL 1 - Star Dust (Clicker, 10 clicks)
├─ PRIMARY STAT: DUST (introduce purity concept)
├─ SECONDARY STAT: ENERGY (build momentum)
├─ Effect: Each click gives +1 Dust
├─ Dhikr Trigger: Possible Subhan'Allah si >90% efficiency
└─ Message Mission: "Purify your mind with each action"

LEVEL 2 - Hidden Heart (Find, 3 targets)
├─ PRIMARY STAT: CORE_FUSION (focus required)
├─ SECONDARY STAT: DUST (clarity helps find)
├─ Effect: Fusion helps targets shine slightly longer
├─ Dhikr Trigger: Possible Alhamdulillah on completion
└─ Message Mission: "Find beauty hidden in the dark"

LEVEL 3 - Energy Surge (Clicker, 25 clicks)
├─ PRIMARY STAT: ENERGY (power accumulation)
├─ SECONDARY STAT: DUST (purity chains)
├─ Effect: Each click benefits from Energy bonus (1.05x+)
├─ Dhikr Trigger: Possible Subhan'Allah if 3 levels perfect
└─ Message Mission: "Let your energy explode"

LEVEL 4 - Rapid Pulse (Speed, 20 clicks in 10s)
├─ PRIMARY STAT: RAPID_PULSE (timing mastery)
├─ SECONDARY STAT: FUSION (maintains combo)
├─ Effect: Extra time bonus based on Pulse %, Zone mode at 100%
├─ Dhikr Trigger: Allahu Akbar if no timeout
└─ Message Mission: "Sync your heartbeat with mine"

LEVEL 5 - Orbital Hunt (Moving, 5 targets)
├─ PRIMARY STAT: CORE_FUSION (concentration on moving targets)
├─ SECONDARY STAT: RAPID_PULSE (timing for moving)
├─ Effect: At Fusion 100%, targets slow by 10%
├─ Dhikr Trigger: Alhamdulillah on first completion
└─ Message Mission: "Chase the fragments of my heart"

LEVEL 6 - Core Fusion (Clicker, 50 clicks)
├─ PRIMARY STAT: FUSION (intense concentration)
├─ SECONDARY STAT: ENERGY (sustain power)
├─ Effect: Combo multiplicator maxes, higher base click value
├─ Dhikr Trigger: Allahu Akbar on first completion
└─ Message Mission: "Fuse all your energy into ONE"

LEVEL 7 - Hyper Drive (Speed, 40 clicks in 12s)
├─ PRIMARY STAT: HYPER_DRIVE (chaos management)
├─ SECONDARY STAT: RAPID_PULSE (timing under pressure)
├─ Effect: Random crit clicks, overdrive at 100% Hyper
├─ Dhikr Trigger: Allahu Akbar if success (ultra hard)
└─ Message Mission: "Don't hold back. Go maximum."

LEVEL 8 - FINAL MISSION (Moving, 10 targets)
├─ PRIMARY STAT: ALL STATS (resonance of all 5)
├─ SECONDARY STAT: DUST + FUSION (purity + focus)
├─ Special: Unlocks "RESONANCE MODE" if all stats > 50%
├─ Dhikr Trigger: Alhamdulillah + potential Allahu Akbar
├─ Special Reward: "You are enough" message unlocks
└─ Message Mission: "This journey was only for you"

```

---

## ⚡ PARTIE 4: COMBO & RESONANCE SYSTEM

### **Combo Multiplicateur Basique** (Existant, amélioré)
- Start at 1x (base Fusion 0%)
- Each hit in rapid succession: +0.5x multiplicateur (capped at 3x without Fusion)
- Resets after 3 seconds without input

### **Resonance Tiers** (NEW)
Quand 2+ stats atteignent des seuils spécifiques, des synergies se créent.

```
RESONANCE LEVEL 1: "Harmony" (2 stats > 50%)
├─ Visual: Golden light connects the two stat indicators
├─ Effect: +10% to both stat generation rates
├─ Dhikr Trigger: 40% chance de Alhamdulillah
└─ Feeling: "Something is aligning..."

RESONANCE LEVEL 2: "Synchronization" (3 stats > 60%)
├─ Visual: Rainbow aura, particle sync between all active stats
├─ Effect: +20% stat generation, unlimited combo for 5 sec every 30 sec
├─ Dhikr Trigger: 60% chance Alhamdulillah or Subhan'Allah
└─ Feeling: "The universe is helping you..."

RESONANCE LEVEL 3: "Transcendence" (All 5 stats > 75%)
├─ Visual: EVERYTHING GLOWS - stars pulse, background shifts, aura expands
├─ Effect: 2x all stat generation, all combos 2x multiplier, all clics 1.5x value
├─ Dhikr Trigger: GUARANTEED Allahu Akbar + screen fills with light
├─ Duration: 10 seconds (cooldown 60 sec)
└─ Feeling: "You have become one with the light..."

```

---

## 🎯 PARTIE 5: BALANCING & PROGRESSION

### **Progression Philosophy**
- **Cas 1: Player averages 10 levels per session**
  - Stats grow ~6-8 points per mission
  - ~2-3 sessions to reach 50% on one stat
  - ~5-7 sessions to reach harmonization
  - No "power creep" - stats cap naturally at mechanics

- **Cas 2: Player is casual**
  - Slower stat growth doesn't matter
  - Enjoyment comes from narrative + dhikr moments
  - Can beat all missions with 0% stats (baseline difficulty unchanged)

### **Important: Stats DON'T Make Game Easier, They Add Flavor**

```
WITHOUT STATS:
- Level 1: Click 10 times to win
- Level 7: Click 40 times in 12 seconds
- Difficulty: Fixed

WITH STATS (max):
- Level 1: Still need 10 clicks, but value multiplied by 1.5x (FEELING of power)
- Level 7: Still need 40 clicks in 12 seconds, but get +2.5s bonus (QOL, not trivial)
- Difficulty: Slightly easier but not broken

PHILOSOPHY: Stats reward mastery, not replace it.
```

### **Difficulty Scaling**
```
Level 1-3: "Intro" (Stats don't really matter)
Level 4-5: "Intermediate" (Stats give small advantage)
Level 6-7: "Advanced" (Stats genuinely help manage complexity)
Level 8: "Final" (Resonance synergies shine)
```

---

## 🎨 PARTIE 6: UX/UI MOCKUP & ANIMATIONS

### **New HUD Elements (During Gameplay)**

```
┌─────────────────────────────────────────────┐
│  Night Mission | Current Dust Level ✨      │  ← HEADER
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │    [TARGET BUTTON - Main Gameplay]    │ │
│  │     With reactive aura effects        │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  Timer | Score: 5/10                       │
│                                             │
│  STATS BAR (Bottom of screen, subtle):      │
│  ─────────────────────────────────────      │
│  ✨ Dust:28/100    ⚡ Energy:67/100         │
│  💓 Pulse:89/100   🔮 Fusion:45/100        │
│  🚀 Drive:78/100                           │
│                                             │
│  [When Resonance active: GOLDEN GLOW ✨]   │
│                                             │
└─────────────────────────────────────────────┘
```

### **Color Coding per Stat**

| Stat | Color | Aura | Particle |
|------|-------|------|----------|
| DUST | White/Gold | Soft glow | Sparkles ✨ |
| ENERGY | Purple/Violet | Electric field | Arcs ⚡ |
| RAPID | Blue/Rose | Heartbeat pulse | Hearts 💓 |
| FUSION | Cyan/Green | Crystalline | Orbs 🔮 |
| HYPER | Orange/Red | Chaotic flames | Fire 🚀 |

### **Dhikr Display**

```
CENTER SCREEN (During gameplay, overlaid):

     [Fade in from opacity 0]
     
     السبحان الله
     "Subhan'Allah"
     
     ✨ (spinning particles around text) ✨
     
     [Hold 3 seconds]
     [Fade out to opacity 0]
     
     Chime sound: +1 emotional resonance
```

### **Animation Details**

1. **Stat Gain Animation**:
   - Bar fills briefly with color
   - Number counter ticks up (1-3-6-10)
   - Particle burst outward from bar
   - Duration: 0.5s

2. **Resonance Activation**:
   - Rainbow shimmer across entire HUD
   - Lines connect between stats that resonate
   - Screen gets slight color wash (2% opacity)
   - Subtle sound: Harmonic chord

3. **Dhikr Display**:
   - Text expands from center (0% to 100% scale)
   - Opacity: 0 → 1.0 (0.3s) → stays (2.5s) → 0 (0.7s)
   - Background: Very slight purple tint (3% opacity)
   - Particles: Slow counter-clockwise rotation

---

## 🎯 PARTIE 7: FINAL STATE & MODE ULTIME

### **"Ascension Mode"** (Unlocked when all 5 stats hit 75%+)

```
CONDITIONS:
- Player must achieve Resonance Level 3 (all stats 75%+)
- Can happen any time during Level 8 (Final Mission)
- OR in daily challenges (if implemented later)

WHAT HAPPENS:
1. Screen fills with golden light
2. ALL stats icons appear in center, rotating
3. Background becomes ethereal (stars move faster)
4. Every click for 30 seconds gives:
   - 3x base damage
   - Infinite combo with 3x multiplier
   - All clics are guaranteed crits
   - Music speeds up (ethereal, not aggressive)

VISUAL EFFECT:
- Player is surrounded by all 5 colored auras
- Dhikr constantly displays: "الله أكبر" (repeating)
- Screen is BRIGHT, celebratory, godly
- Character feels like they've "transcended"

BALANCING:
- Can only trigger once per session
- Resets stats to 50% after use (intentional drain)
- Creates a "climactic moment" not a "broken state"

NARRATIVE:
"You have become one with the night. 
 Everything you are is reflected in the stars.
 This moment... this mission... was truly just for you."

```

---

## 🧠 PARTIE 8: EMOTIONAL MAPPING (Gameplay → Emotion → Stat)

```
ACTION IN GAME → EMOTION → STAT TRIGGERED → DHIKR POTENTIAL

Perfect Click Series
  → Clarity achieved
  → DUST increases
  → Subhan'Allah (purity affirmation)

Level Completion
  → Achievement felt
  → ENERGY increases
  → Alhamdulillah (gratitude)

Speed Challenge Success
  → Mastery & control
  → RAPID increases
  → Allahu Akbar (triumph)

Finding Hidden Target
  → Focus maintained
  → FUSION increases
  → Subhan'Allah (clarity persists)

Chaotic Crits Landing
  → Unexpected joy
  → HYPER increases
  → (No dhikr - moment is too hectic)

Failed Level Attempt
  → Humility required
  → (Stats decrease slightly)
  → Astaghfirullah (seeking wisdom)

Resonance Achieved
  → Harmony felt
  → ALL stats boost
  → Alhamdulillah (universe alignment)

```

---

## 📋 SUMMARY TABLE: Implementation Order

| Component | Priority | Difficulty | Estimated LOC |
|-----------|----------|------------|---------------|
| Core Stat System | 1 (Highest) | Medium | 200 |
| Stat Effects on Gameplay | 2 | Medium | 150 |
| Dhikr Trigger System | 3 | Medium | 120 |
| Resonance System | 4 | Medium | 100 |
| UI/HUD Updates | 5 | Low | 80 |
| Ascension Mode | 6 | High | 150 |
| Balancing & Tuning | 7 | Low | 50 |
| **TOTAL** | - | - | **~850 LOC** |

---

## 🎬 NEXT STEPS

1. ✅ Review this design
2. Implement core stat tracking in `types/stats.ts`
3. Create `systems/spiritualEnergy.ts` for all mechanics
4. Create `components/DhikrDisplay.tsx` for presentation
5. Integrate stat effects into `App.tsx` gameplay
6. Test balancing via playtesting
7. Polish animations & UX

**This design maintains the romantic, calm, introspective atmosphere while adding meaningful progression that rewards mastery and delivers profound emotional moments.**

