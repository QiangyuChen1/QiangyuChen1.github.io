import type { ResearchTopic } from "./types.ts";

export const researchTopics: ResearchTopic[] = [
  {
    id: "robot-learning",
    title: "Robot Learning",
    status: "evidenced",
    summary:
      "Learning manipulation policies from demonstrations and synthetic data, and building the data and evaluation pipelines that make that learning reliable.",
    relatedProjects: ["proj-robotwin2", "proj-g3flow"],
    signals: ["ICML 2026", "CVPR 2025"],
    glyph: "policy",
    visualRole: "anchor",
    evidence: ["PUB-ROBOTWIN2", "PUB-G3FLOW", "CHL-MARS", "EXP-PARAMI"],
    order: 1,
  },
  {
    id: "vla",
    title: "Vision-Language-Action Models",
    status: "direction",
    summary:
      "Grounding language and vision in physical action. I’ve worked on vision-language-embodied evaluation in simulation and on MLLM-driven data generation; policies that map language and pixels directly to action are where I’m heading.",
    relatedProjects: ["proj-mars", "proj-robotwin2"],
    relationNote: "Related work, not a VLA model",
    glyph: "vla",
    visualRole: "text",
    evidence: ["CHL-MARS", "PUB-ROBOTWIN2"],
    order: 2,
  },
  {
    id: "dexterous-manipulation",
    title: "Dexterous Manipulation",
    status: "evidenced",
    summary:
      "Multi-fingered hands: mechanism design, embedded control, state machines, and control algorithms that turn a mechanism into a usable manipulator.",
    relatedProjects: ["proj-dexhand-xjgn", "proj-mmhand"],
    signals: ["MM-Hand 1.0"],
    glyph: "hand",
    visualRole: "hardware",
    evidence: ["EXP-XJGN", "EXP-MMHAND"],
    order: 3,
  },
  {
    id: "rl",
    title: "Reinforcement Learning",
    status: "direction",
    summary:
      "Studying dynamic programming and RL formally, with the goal of combining RL fine-tuning with large-scale simulated data for contact-rich control.",
    relatedProjects: [],
    foundation: "Coursework foundation: Dynamic Programming & Reinforcement Learning (M.Sc.)",
    glyph: "rl",
    visualRole: "text",
    evidence: ["EDU-CITYU"],
    order: 4,
  },
  {
    id: "sim2real",
    title: "Sim2Real Transfer & Simulation Data Generation",
    status: "evidenced",
    summary:
      "Using domain randomization and scalable synthetic data so that policies trained in simulation hold up on real robots with little real data.",
    relatedProjects: ["proj-robotwin2", "proj-mars"],
    signals: ["IROS 2025 WS Best Paper"],
    glyph: "sim2real",
    visualRole: "diagram",
    evidence: ["PUB-ROBOTWIN2", "CHL-MARS"],
    order: 5,
  },
];
