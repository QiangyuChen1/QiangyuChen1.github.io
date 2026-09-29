import type { Profile } from "./types.ts";

export const profile: Profile = {
  publicName: "Qiangyu Chen（陈锵宇）",
  legalName: "Qiangyu Chen",
  legalNameNative: "陈锵宇",
  role: "Embodied AI Researcher",
  eyebrow: "Embodied AI · Robot Learning · Manipulation",
  statement:
    "I build intelligent robotic systems through robot learning, simulation, perception, and control, from dexterous hands on the bench to scalable simulated data for bimanual manipulation.",
  affiliationLine: "Xspark AI, Shenzhen · M.Sc. Data Science, City University of Hong Kong",
  worksFor: { name: "Xspark AI", url: "https://github.com/XsparkAI" },
  signals: [
    {
      work: "RoboTwin 2.0",
      detail: "ICML 2026 · Best Poster, IROS 2025 RoDGE Workshop",
      href: "#proj-robotwin2",
      evidence: ["PUB-ROBOTWIN2"],
    },
    { work: "G3Flow", detail: "CVPR 2025", href: "#proj-g3flow", evidence: ["PUB-G3FLOW"] },
    { work: "MARS Challenge @ NeurIPS 2025", detail: "Control Track Champion", href: "#proj-mars", evidence: ["CHL-MARS"] },
  ],
  interests: [
    "Real-Robot Infra",
    "Computer Vision",
    "Real-Robot Deployment",
    "Dexterous Manipulation",
    "Simulation Data Generation",
    "Sim2Real Transfer",
  ],
  contact: {
    intro:
      "Interested in robot learning, dexterous manipulation, or simulation for embodied AI? I’m glad to talk about research collaboration.",
    email: "qiangyuchen516@gmail.com",
    allowPersonalEmail: true,
  },
  seo: {
    title: "Qiangyu Chen（陈锵宇）, Embodied AI Researcher",
    description:
      "Embodied AI researcher working on robot learning, dexterous manipulation, and simulation data generation for sim-to-real transfer.",
    canonical: "https://qiangyuchen1.github.io/",
  },
};
