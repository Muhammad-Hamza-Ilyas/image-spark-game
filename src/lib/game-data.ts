export type Question = {
  q: string;
  options: string[];
  answer: number;
};

export type StudyCard = {
  year?: string;
  title: string;
  text: string;
};

export type GameModule = {
  id: string;
  index: number;
  name: string;
  tagline: string;
  xp: number;
  icon: string;
  badge: string;
  brief: string;
  studyTitle: string;
  study: StudyCard[];
  quiz: Question[];
};

export const MODULES: GameModule[] = [
  {
    id: "gateway",
    index: 1,
    name: "The Gateway",
    tagline: "Begin your journey with YTM",
    xp: 50,
    icon: "✳",
    badge: "YTM Trailblazer",
    brief: "Your first step inside Yunus Textile Mills. Learn who we are before the road opens up.",
    studyTitle: "Welcome to YTM",
    study: [
      { title: "Who we are", text: "Yunus Textile Mills is the flagship home textile company of Yunus Brothers Group, one of Pakistan's largest business houses." },
      { title: "What we make", text: "From cotton to finished home textiles — bedding, drapery and made-ups shipped to leading retailers worldwide." },
      { title: "Our promise", text: "Textiles for a BETTER life. Quality, integrity and people-first growth guide every shift." },
    ],
    quiz: [
      { q: "YTM is the flagship company of which group?", options: ["Yunus Brothers Group", "Lucky Group", "Gadoon Group", "Aziz Group"], answer: 0 },
      { q: "What does YTM primarily produce?", options: ["Automobiles", "Home textiles", "Cement only", "Software"], answer: 1 },
    ],
  },
  {
    id: "ytm-story",
    index: 2,
    name: "The YTM Story",
    tagline: "Explore our legacy and global impact",
    xp: 100,
    icon: "🌍",
    badge: "Legacy Keeper",
    brief: "Take a good look through the milestones below before the quiz begins.",
    studyTitle: "Yunus Brothers Group — Journey",
    study: [
      { year: "1962", title: "YBG Founded", text: "Yunus Brother Group (YBG) is founded." },
      { year: "1983", title: "Lucky Textile Mills", text: "Lucky Textile Mills begins operations." },
      { year: "1987", title: "Fazal Textile Mills", text: "Fazal Textile Mills & Aziz Tabba Foundation established." },
      { year: "1988", title: "Aziz Tabba Kidney Center", text: "Healthcare arm opens its doors." },
      { year: "1993", title: "Energy & Cement", text: "Lucky Energy Ltd. and Lucky Cement Ltd. launched." },
      { year: "1995", title: "Gadoon Textile Mills", text: "Gadoon Textile Mills joins the group." },
      { year: "1998", title: "Yunus Textile Mills", text: "Yunus Textile Mills Limited is established." },
      { year: "2005", title: "Expansion", text: "Lucky Paragon, Lucky Knits and Tabba Heart Institute." },
      { year: "2012", title: "New ventures", text: "LCI, Lucky Air and Yunus Energy Limited." },
      { year: "2013", title: "Holdings & Homes", text: "YB Holdings, Future Home and Lucky Commodities." },
      { year: "2014", title: "Foods & Retail", text: "Lucky Landmark, Lucky Foods Ltd. and Lucky One." },
      { year: "2015–2021", title: "Power & Motors", text: "Lucky Electric Power, Lucky Motors (KIA) and Samsung." },
    ],
    quiz: [
      { q: "When was Yunus Textile Mills Ltd. founded?", options: ["1996", "1998", "1999", "2001"], answer: 1 },
      { q: "In which year was Yunus Brothers Group founded?", options: ["1962", "1983", "1987", "1993"], answer: 0 },
    ],
  },
  {
    id: "cotton-to-customer",
    index: 3,
    name: "From Cotton to Customer",
    tagline: "Experience our home textile value chain",
    xp: 150,
    icon: "🧵",
    badge: "Value Chain Master",
    brief: "Follow a single cotton fibre all the way to a customer's bedroom.",
    studyTitle: "The Value Chain",
    study: [
      { title: "1. Spinning", text: "Raw cotton is cleaned, carded and spun into yarn." },
      { title: "2. Weaving", text: "Yarn is woven into greige fabric on high-speed looms." },
      { title: "3. Processing", text: "Bleaching, dyeing and printing bring colour and finish." },
      { title: "4. Stitching", text: "Cut and sewn into duvets, sheets and made-ups." },
      { title: "5. Delivery", text: "Packed, quality checked and shipped to global retailers." },
    ],
    quiz: [
      { q: "Which step comes right after spinning?", options: ["Stitching", "Weaving", "Packing", "Printing"], answer: 1 },
      { q: "What is greige fabric?", options: ["Dyed fabric", "Unprocessed woven fabric", "Packed product", "Raw cotton"], answer: 1 },
    ],
  },
  {
    id: "values-quest",
    index: 4,
    name: "Values Quest",
    tagline: "Climb with character. Decide with values.",
    xp: 250,
    icon: "⛰",
    badge: "Values Champion",
    brief: "Real situations, real choices. Your values decide the outcome.",
    studyTitle: "Our Core Values",
    study: [
      { title: "Integrity", text: "Do the right thing even when nobody is watching." },
      { title: "Respect", text: "Every person on every shift deserves dignity." },
      { title: "Excellence", text: "Good enough is never the finish line." },
      { title: "Teamwork", text: "One mill, one team, one standard." },
    ],
    quiz: [
      { q: "A colleague asks you to skip a quality check to hit target. You:", options: ["Skip it quietly", "Report and run the check", "Ask someone else to skip it", "Ignore the order"], answer: 1 },
      { q: "Which value means doing right when unobserved?", options: ["Teamwork", "Excellence", "Integrity", "Speed"], answer: 2 },
    ],
  },
  {
    id: "policy-vault",
    index: 5,
    name: "The Policy Vault",
    tagline: "Know our policies. Make it right.",
    xp: 100,
    icon: "🗄",
    badge: "Policy Guardian",
    brief: "Unlock the vault of the policies that keep everyone safe and fair.",
    studyTitle: "Key Policies",
    study: [
      { title: "Attendance", text: "Shifts start on time; leave is applied through your supervisor." },
      { title: "Anti-harassment", text: "Zero tolerance. Confidential reporting channels are always open." },
      { title: "Confidentiality", text: "Customer designs and data never leave the mill." },
      { title: "Code of conduct", text: "Honest work, honest reporting, no conflicts of interest." },
    ],
    quiz: [
      { q: "What is YTM's stance on harassment?", options: ["Case by case", "Zero tolerance", "Warnings only", "Handled informally"], answer: 1 },
      { q: "Customer design files may be:", options: ["Shared with friends", "Posted online", "Kept strictly confidential", "Sold"], answer: 2 },
    ],
  },
  {
    id: "goal-compass",
    index: 6,
    name: "The Goal Setting Compass",
    tagline: "Set clear goals. Turn purpose into measurable action.",
    xp: 300,
    icon: "🧭",
    badge: "Compass Bearer",
    brief: "Point your compass: goals that are specific, measurable and owned.",
    studyTitle: "SMART Goals",
    study: [
      { title: "Specific", text: "Name the exact outcome, not a vague wish." },
      { title: "Measurable", text: "If you cannot count it, you cannot improve it." },
      { title: "Achievable", text: "Stretch, but stay inside reality." },
      { title: "Relevant", text: "Tie every goal to a mill or team priority." },
      { title: "Time-bound", text: "A goal without a date is only a hope." },
    ],
    quiz: [
      { q: "The 'M' in SMART stands for:", options: ["Motivating", "Measurable", "Managed", "Mandatory"], answer: 1 },
      { q: "A goal without a deadline is:", options: ["Still SMART", "Just a hope", "Automatically achieved", "Preferred"], answer: 1 },
    ],
  },
  {
    id: "safety-command",
    index: 7,
    name: "Safety Command Center",
    tagline: "Work safe. Stay protected.",
    xp: 150,
    icon: "🛡",
    badge: "Safety Sentinel",
    brief: "Take command of the floor: hazards, gear and emergency drill.",
    studyTitle: "Safety Essentials",
    study: [
      { title: "PPE always", text: "Ear protection, masks and safe footwear on the production floor." },
      { title: "Report hazards", text: "Spot it, stop it, report it — immediately." },
      { title: "Fire drill", text: "Know your nearest exit and assembly point." },
      { title: "Machine safety", text: "Never bypass a guard or interlock." },
    ],
    quiz: [
      { q: "You spot a fuel spill near a machine. First action:", options: ["Keep working", "Report and cordon it", "Clean it with cloth later", "Tell nobody"], answer: 1 },
      { q: "Bypassing a machine guard is:", options: ["Allowed if fast", "Never allowed", "Supervisor's choice", "Fine at night"], answer: 1 },
    ],
  },
  {
    id: "ytm-challenge",
    index: 8,
    name: "The YTM Challenge",
    tagline: "Prove your leadership. Create real impact.",
    xp: 150,
    icon: "🏆",
    badge: "YTM Certified Leader",
    brief: "The final trial. Everything you learned, in one run.",
    studyTitle: "Final Briefing",
    study: [
      { title: "Lead by example", text: "Standards you walk past are standards you accept." },
      { title: "Own the outcome", text: "Leaders escalate early and fix root causes." },
      { title: "Grow others", text: "A leader is measured by the people they build." },
    ],
    quiz: [
      { q: "A leader who walks past a broken standard is:", options: ["Efficient", "Accepting it", "Delegating", "Neutral"], answer: 1 },
      { q: "Best response to a recurring defect:", options: ["Rework quietly", "Find the root cause", "Blame the shift", "Ignore it"], answer: 1 },
    ],
  },
];

export const TOTAL_XP = MODULES.reduce((s, m) => s + m.xp, 0);

export const getModule = (id: string) => MODULES.find((m) => m.id === id);

export const LEVELS = [
  { level: 1, title: "New Innovator", min: 0 },
  { level: 2, title: "Explorer", min: 50 },
  { level: 3, title: "Pathfinder", min: 250 },
  { level: 4, title: "Strategist", min: 600 },
  { level: 5, title: "YTM Certified Leader", min: 1000 },
];

export const levelFor = (xp: number) =>
  [...LEVELS].reverse().find((l) => xp >= l.min) ?? LEVELS[0];
