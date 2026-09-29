import type { EvidenceId } from "./types.ts";

/** Source ledger. Every ID traces to a line in QiangyuChen.pdf. */
export const evidence: Record<EvidenceId, string> = {
  "EDU-SZU": "Shenzhen University, B.Eng. Computer Science and Technology, 2021.09 – 2025.06",
  "EDU-SZU-AWD":
    "Silver prize, preliminary round, National Algorithm Elite Contest; Top Talent Innovation Award; Outstanding Student Cadre",
  "EDU-CITYU": "City University of Hong Kong, M.Sc. Data Science (in progress); coursework incl. Dynamic Programming & RL, Embodied AI & Applications",
  "EDU-CITYU-AWD": "Outstanding Research Project Award 2026 (Low-Rank MERA Image Fitting)",
  "EXP-XJGN": "Shenzhen Xingji Guangnian Technology, R&D Intern, 2024.09 – 2025.01 (dexterous hand control)",
  "EXP-MMHAND": "Shenzhen Hetao Institute × HKU MMLab, Design Consultant, 2025.08 – 2026.05 (MM-Hand 1.0)",
  "EXP-PARAMI": "Parami AI (HK), Development Intern & TA, 2025.09 – 2026.04 (LeRobot course technical lead)",
  "EXP-AGILEX": "AgileX Robotics, Assistant Development Engineer, 2024.08 – 2024.09 (ROS2 car, RoboTwin 1.0)",
  "PUB-ROBOTWIN2": "RoboTwin 2.0: ICML 2026; Best Paper, RoDGE Workshop @ IROS 2025; Excellent Poster, China Spatial Intelligence Conference",
  "PUB-G3FLOW": "G3Flow: CVPR 2025 (accepted)",
  "PUB-CAPRO": "CaPro: AAAI 2026 poster, co-first author",
  "PUB-AICL": "AICL: AAAI 2025 poster, second author",
  "CHL-MARS": "MARS 2025 Challenge on SpaVLE @ NeurIPS 2025, Track 2, Champion",
  "RES-MERA": "Low-Rank MERA Image Fitting research project (CityU award 2026)",
  "COM-LUMINA": "Founder / lead organizer (主理人), Lumina Embodied AI Community",
};
