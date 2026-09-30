import type { MediaRef } from "./types.ts";

/** Official figures and marks. Paths are local copies of public project, paper, and organization images; the school logos are the ones used on their English Wikipedia pages. */

export const robotwinTeaser: MediaRef = {
  src: "/figures/robotwin-teaser.jpg",
  alt: "RoboTwin 2.0 teaser: dual-arm robots, the object dataset, domain randomization, and a real-world transfer photo.",
  width: 1400,
  height: 881,
  credit: "Figure from the RoboTwin 2.0 project page",
  href: "https://robotwin-platform.github.io/",
};

export const g3flowTeaser: MediaRef = {
  src: "/figures/g3flow-teaser.jpg",
  alt: "G3Flow teaser: pose tracking, a semantic flow of a shoe, and success-rate comparisons.",
  width: 1234,
  height: 777,
  credit: "Teaser from the G3Flow paper, arXiv:2411.18369",
  href: "https://arxiv.org/abs/2411.18369",
};

/** The Control Track certificate, padded with white to the RoboTwin teaser's ratio. */
export const marsCertificateCover: MediaRef = {
  src: "/figures/neurips25-mars-cover.jpg",
  alt: "Certificate of the Multi-Agent Embodied Intelligence Challenge Control Track Champion at the NeurIPS 2025 SpaVLE Workshop, awarded to MMLab@HKU×D-Robotics; Qiangyu Chen is among the listed members.",
  width: 1400,
  height: 881,
  credit: "Certificate · NeurIPS 2025 SpaVLE",
  href: "/figures/neurips25-mars.pdf",
};

export const caproIntro: MediaRef = {
  src: "/figures/capro-intro.jpg",
  alt: "CaPro pipeline for adapting a segmentation model to thin curvilinear structures from one unlabeled image.",
  width: 1338,
  height: 842,
  credit: "Figure from the CaPro repository, xmed-lab/CaPro",
  href: "https://github.com/xmed-lab/CaPro",
};

export const aiclReliability: MediaRef = {
  src: "/figures/aicl-reliability.png",
  alt: "Reliability diagrams for crack recognition on SDNET2018 without and with AICL; with AICL, accuracy tracks confidence closely.",
  width: 1005,
  height: 632,
  credit: "Figure 4 of the AICL paper, AAAI 2025",
  href: "https://ojs.aaai.org/index.php/AAAI/article/view/33755",
};

export const mmhandOverview: MediaRef = {
  src: "/figures/mmhand-overview.jpg",
  alt: "MM-Hand 1.0, a tendon-driven dexterous hand mounted on an arm, with its motor hub and interface.",
  width: 1398,
  height: 880,
  credit: "MM-Hand 1.0, arXiv:2604.17245",
  href: "https://arxiv.org/abs/2604.17245",
};

/** Fig. 2 of the paper without its right-hand degree-of-freedom diagram. */
export const mmhandStructure: MediaRef = {
  src: "/figures/mmhand-structure.jpg",
  alt: "MM-Hand structure: the palm PCB and quick tendon connector box on the back, and tactile sensors, angle sensors, and in-palm cameras on the front.",
  width: 900,
  height: 564,
  credit: "Fig. 2 · MM-Hand 1.0",
  href: "https://arxiv.org/abs/2604.17245",
};

export const g3flowSpatialAlignment: MediaRef = {
  src: "/figures/g3flow-spatial-alignment.png",
  alt: "G3Flow spatial alignment: an object's semantic point cloud is tracked from object to world coordinates until it lines up with the real object in the robot's gripper.",
  width: 575,
  height: 354,
  credit: "Fig. 4 · G3Flow",
  href: "https://arxiv.org/abs/2411.18369",
};

/** Fig. 10 of the paper with its four panels arranged 2×2 instead of in one row. */
export const robotwinRealWorld: MediaRef = {
  src: "/figures/robotwin-real-world.jpg",
  alt: "RoboTwin 2.0 real-world evaluation: a dual-arm robot and a bottle on seen and unseen table backgrounds, with and without clutter.",
  width: 966,
  height: 608,
  credit: "Fig. 10 · RoboTwin 2.0",
  href: "https://arxiv.org/abs/2506.18088",
};

export const irosCertificate: MediaRef = {
  src: "/figures/iros25-robotwin-thumb.jpg",
  alt: "Certificate of the IROS 2025 RoDGE Workshop Best Poster, awarded for RoboTwin 2.0.",
  width: 360,
  height: 255,
  credit: "IROS 2025 RoDGE",
  href: "/figures/iros25-robotwin.jpg",
};

export const chinasiCertificate: MediaRef = {
  src: "/figures/chinasi25-robotwin-thumb.jpg",
  alt: "Certificate of an Excellent Poster at ChinaSI 2025, the China Spatial Intelligence Conference, awarded for RoboTwin 2.0.",
  width: 280,
  height: 396,
  credit: "ChinaSI 2025 Excellent Poster",
  href: "/figures/chinasi25-robotwin.pdf",
};

export const cityuMark: MediaRef = {
  src: "/figures/cityu.svg",
  alt: "City University of Hong Kong logo",
  width: 512,
  height: 288,
  credit: "City University of Hong Kong",
  href: "https://www.cityu.edu.hk/",
  presentation: "logo",
  darkPlate: true,
};

export const szuMark: MediaRef = {
  src: "/figures/szu.svg",
  alt: "Shenzhen University emblem",
  width: 316,
  height: 316,
  credit: "Shenzhen University",
  href: "https://www.szu.edu.cn/",
  presentation: "logo",
  darkPlate: true,
};

export const xsparkMark: MediaRef = {
  src: "/figures/xspark.png",
  alt: "Xspark AI logo",
  width: 284,
  height: 256,
  credit: "Xspark AI",
  href: "https://github.com/XsparkAI",
  presentation: "logo",
  monochrome: true,
};

export const mmlabMark: MediaRef = {
  src: "/figures/mmlab.png",
  alt: "HKU MMLab mark",
  width: 176,
  height: 176,
  credit: "HKU MMLab",
  presentation: "logo",
};

export const paramiMark: MediaRef = {
  src: "/figures/parami.webp",
  alt: "Parami logo",
  width: 992,
  height: 236,
  credit: "Parami",
  href: "https://parami.ai/",
  presentation: "logo",
};

export const stellaMark: MediaRef = {
  src: "/figures/stella-robot.png",
  alt: "Stella-Robot logo",
  width: 288,
  height: 256,
  credit: "Stella-Robot",
  href: "https://www.stella-robot.com/",
  presentation: "logo",
};

export const agilexMark: MediaRef = {
  src: "/figures/agilex.png",
  alt: "AgileX Robotics logo",
  width: 1170,
  height: 363,
  credit: "AgileX Robotics",
  href: "https://www.agilex.ai/",
  presentation: "logo",
};

export const luminaMark: MediaRef = {
  src: "/figures/lumina.png",
  alt: "Lumina Embodied AI Community logo: a robot arm drawn as the letter L",
  width: 202,
  height: 256,
  credit: "Lumina Embodied AI Community",
  href: "https://github.com/Lumina-EAI",
  presentation: "logo",
  monochrome: true,
};
