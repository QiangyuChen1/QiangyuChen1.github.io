import type { TimelineEntry } from "./types.ts";

/** Direction line for the Engineering intro. No items, no tools. */
export const engineeringNext = "Next: taking learned policies from simulation onto physical arms and hands end to end.";

export const timeline: TimelineEntry[] = [
  {
    id: "tl-parami",
    kind: "role",
    org: "Parami AI (HK)",
    title: "Development Intern & Teaching Assistant",
    dates: { start: "2025.09", end: "2026.04" },
    oneLiner: "Technical lead for the LeRobot single- and dual-arm HKAGE course.",
    evidence: ["EXP-PARAMI"],
  },
  {
    id: "tl-mmhand",
    kind: "role",
    org: "Shenzhen Hetao Institute × HKU MMLab",
    title: "Design Consultant",
    dates: { start: "2025.08", end: "2026.05" },
    oneLiner: "Mechanical design concepts, embedded debugging, control and state-machine design.",
    outcome: "MM-Hand 1.0",
    evidence: ["EXP-MMHAND"],
  },
  {
    id: "tl-xjgn",
    kind: "role",
    org: "Shenzhen Xingji Guangnian Technology",
    title: "R&D Intern",
    dates: { start: "2024.09", end: "2025.01" },
    oneLiner: "Embedded control framework, control algorithms, and demo algorithms for an early-generation dexterous hand.",
    evidence: ["EXP-XJGN"],
  },
  {
    id: "tl-agilex",
    kind: "role",
    org: "AgileX Robotics",
    title: "Assistant Development Engineer, R&D",
    dates: { start: "2024.08", end: "2024.09" },
    oneLiner: "ROS2-based driverless car in a training competition; assisted with parts of RoboTwin 1.0.",
    outcome: "Ranked 1st of 8 teams",
    evidence: ["EXP-AGILEX"],
  },
  {
    id: "tl-cityu",
    kind: "education",
    org: "City University of Hong Kong",
    title: "M.Sc. Data Science",
    dates: { inProgress: true },
    oneLiner: "Coursework in Dynamic Programming & Reinforcement Learning, and Embodied AI & Applications.",
    evidence: ["EDU-CITYU"],
  },
  {
    id: "tl-szu",
    kind: "education",
    org: "Shenzhen University",
    title: "B.Eng. Computer Science and Technology",
    dates: { start: "2021.09", end: "2025.06" },
    oneLiner: "Coursework in Microprocessors & Robotics and Computer Vision.",
    evidence: ["EDU-SZU"],
  },
];
