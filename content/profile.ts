import type { Profile } from "./types.ts";

export const profile: Profile = {
  publicName: "Qiangyu Chen",
  legalName: "Qiangyu Chen",
  legalNameNative: "陈锵宇",
  role: "Embodied AI Researcher",
  eyebrow: "Embodied AI · Robot Learning · Manipulation",
  statement:
    "I build intelligent robotic systems through robot learning, simulation, perception, and control, from dexterous hands on the bench to scalable simulated data for bimanual manipulation.",
  affiliationLine: "M.Sc. Data Science, City University of Hong Kong",
  signals: [
    {
      work: "RoboTwin 2.0",
      detail: "ICML 2026 · Best Paper, IROS 2025 RoDGE Workshop",
      href: "#pub-robotwin2",
      evidence: ["PUB-ROBOTWIN2"],
    },
    { work: "G3Flow", detail: "CVPR 2025", href: "#pub-g3flow", evidence: ["PUB-G3FLOW"] },
    { work: "MARS Challenge @ NeurIPS 2025", detail: "Track 2 Champion", href: "#proj-mars", evidence: ["CHL-MARS"] },
  ],
  interests: [
    "Robot Learning",
    "Dexterous Manipulation",
    "Sim2Real Transfer",
    "Simulation Data Generation",
    "Vision-Language-Action Models",
    "Reinforcement Learning",
  ],
  education: [
    {
      id: "edu-cityu",
      institution: "City University of Hong Kong",
      degree: "M.Sc., Data Science",
      dates: { inProgress: true },
      highlights: [
        "Dynamic Programming & Reinforcement Learning",
        "Embodied AI & Applications",
        "Time Series & Neural Networks",
        "Machine Learning",
      ],
      awards: ["Outstanding Research Project Award 2026"],
      evidence: ["EDU-CITYU", "EDU-CITYU-AWD"],
    },
    {
      id: "edu-szu",
      institution: "Shenzhen University",
      degree: "B.Eng., Computer Science and Technology",
      dates: { start: "2021.09", end: "2025.06" },
      highlights: ["Microprocessors & Robotics", "Computer Vision", "Algorithm Design & Analysis"],
      evidence: ["EDU-SZU"],
    },
  ],
  contact: {
    intro:
      "Interested in robot learning, dexterous manipulation, or simulation for embodied AI? I’m glad to talk about research collaboration.",
    email: "qiangyuchen516@gmail.com",
    allowPersonalEmail: true,
    emptyFallback: "Contact details coming soon.",
  },
  seo: {
    title: "Qiangyu Chen, Embodied AI Researcher",
    description:
      "Embodied AI researcher working on robot learning, dexterous manipulation, and simulation data generation for sim-to-real transfer.",
    canonical: "https://qiangyuchen1.github.io/",
  },
};
