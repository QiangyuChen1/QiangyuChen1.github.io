import type { WorkDirection } from "./types.ts";
import { g3flowSpatialAlignment, mmhandStructure, robotwinRealWorld } from "./figures.ts";

export const workDirections: WorkDirection[] = [
  {
    id: "real-robot-infra",
    title: "Real-Robot Infra",
    summary:
      "The hardware and software a physical robot runs on: dexterous-hand mechanisms, embedded control and state machines, ROS2 systems, and the single- and dual-arm LeRobot setups behind the course I led.",
    media: mmhandStructure,
    relatedProjects: ["proj-mmhand"],
    signals: ["HKU MMLab", "Stella-Robot"],
    evidence: ["EXP-MMHAND", "EXP-XJGN", "EXP-AGILEX", "EXP-PARAMI"],
    order: 1,
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    summary:
      "Perception for robots and for inspection: X-Dec at Xspark AI today; before that, a 3D semantic flow that keeps object features aligned with the real scene during manipulation, the Segment Anything Model adapted to thin structures from a single image, and calibrated crack recognition.",
    media: g3flowSpatialAlignment,
    relatedProjects: ["proj-g3flow", "proj-capro"],
    signals: ["X-Dec", "CVPR 2025"],
    evidence: ["EXP-XSPARK", "PUB-G3FLOW", "PUB-CAPRO", "PUB-AICL"],
    order: 2,
  },
  {
    id: "real-robot-deployment",
    title: "Real-Robot Deployment",
    summary:
      "Getting systems working on physical robots: real-robot delivery at Xspark AI today, and before that RoboTwin 2.0, whose synthetic data was evaluated on a real dual-arm robot against unseen backgrounds and clutter.",
    media: robotwinRealWorld,
    relatedProjects: ["proj-robotwin2"],
    signals: ["Xspark AI", "ICML 2026"],
    evidence: ["EXP-XSPARK", "PUB-ROBOTWIN2"],
    order: 3,
  },
];
