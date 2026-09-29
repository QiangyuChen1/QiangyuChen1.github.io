import type { EvidenceId } from "./types.ts";

/** Source ledger. Each ID traces to QiangyuChen.pdf, a fact supplied by Qiangyu, or a cited public page. */
export const evidence: Record<EvidenceId, string> = {
  "EDU-SZU": "Shenzhen University, B.Eng. Computer Science and Technology, 2021.09 – 2025.06",
  "EDU-SZU-AWD":
    "Silver prize, preliminary round, National Algorithm Elite Contest; Top Talent Innovation Award; Outstanding Student Cadre",
  "EDU-CITYU": "City University of Hong Kong, M.Sc. Data Science (in progress); coursework incl. Dynamic Programming & RL, Embodied AI & Applications",
  "EDU-CITYU-AWD": "Outstanding Research Project Award 2026 (Low-Rank MERA Image Fitting)",
  "EXP-XSPARK":
    "Supplied by Qiangyu (2026-09): Xspark AI (深圳无界智航), 真机交付与事业部, 2026.06 – present; main outcome X-Dec, a computer vision project. Company description from github.com/XsparkAI",
  "EXP-XJGN": "Stella-Robot (深圳星际光年科技有限公司), R&D Intern, 2024.09 – 2025.01 (dexterous hand control)",
  "EXP-MMHAND": "Shenzhen Hetao Institute × HKU MMLab, Design Consultant, 2025.08 – 2026.05 (MM-Hand 1.0)",
  "EXP-PARAMI": "Parami AI (HK), Development Intern & TA, 2025.09 – 2026.04 (LeRobot course technical lead)",
  "EXP-AGILEX": "AgileX Robotics, Assistant Development Engineer, 2024.08 – 2024.09 (ROS2 car, RoboTwin 1.0)",
  "PUB-ROBOTWIN2":
    "RoboTwin 2.0: ICML 2026; Best Poster, RoDGE Workshop @ IROS 2025 (the supplied certificate reads \"IROS25 RoDGE Workshop Best Poster\"); Excellent Poster (优秀墙报), China Spatial Intelligence Conference (ChinaSI 2025, CSIG, 2025.07). Both certificates supplied by Qiangyu",
  "PUB-G3FLOW": "G3Flow: CVPR 2025 (accepted)",
  "PUB-CAPRO":
    "CaPro: AAAI 2026 poster, co-first author; proceedings page ojs.aaai.org/index.php/AAAI/article/view/37315 (Qiangyu Chen listed; PDF marks the first two authors as equal contribution)",
  "PUB-AICL":
    "AICL: AAAI 2025 poster, second author; abstract, results, and Figure 4 from ojs.aaai.org/index.php/AAAI/article/view/33755",
  "CHL-MARS":
    "MARS 2025 Challenge on SpaVLE @ NeurIPS 2025, Control Track Champion (MMLab@HKU×D-Robotics; Qiangyu Chen listed). Certificate supplied by Qiangyu; track name confirmed in arXiv:2601.18733",
  "RES-MERA": "Low-Rank MERA Image Fitting research project (CityU award 2026)",
  "COM-LUMINA": "Lead organizer (主理人), Lumina Embodied AI Community; logo and GitHub from github.com/Lumina-EAI",
};
