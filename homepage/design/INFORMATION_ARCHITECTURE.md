# Information Architecture — Wadu Chen, Embodied AI Researcher

Status: Phase 1 (UX architecture). No application code. Visual system (color, type, motion tokens): see `VISUAL_IDENTITY.md`.

Source of truth for facts: `QiangyuChen.pdf` (Chinese-language résumé, one page). Every factual claim below is traced to it. The brief governs **public name and positioning**; the PDF governs **facts**.

---

## 0. Identity mapping and privacy

| Field | Value | Source |
|---|---|---|
| Public name | **Wadu Chen** | Brief |
| Legal name | 陈锵宇 (Chen Qiangyu / **Qiangyu Chen**) | PDF header |
| Public role | **Embodied AI Researcher** | Brief |
| Name on publications | Papers are indexed under the legal name. Publication cards must say *"published as Qiangyu Chen"* so citations remain verifiable. | Derived rule |

**Privacy: never render these on the site.**
- Phone number (PDF header). Private.
- `qiangyuchen516@gmail.com` (PDF header). A personal Gmail address, not an institutional or professional one, so it is **not** exposed by default. Julie can opt in explicitly (see §8).
- No home address appears in the PDF. Do not add one.

---

## 1. Page structure (decision)

**Single long page with anchored sections.** No separate writing index at launch.

Rationale:
- The real written output is **4 papers + 1 research-project award**. That fits comfortably in one section; a separate `/writing` index would be mostly empty.
- One page gives a research-lab first impression: identity → research agenda → evidence → people → contact.
- Fully static and hash-anchored, so it works with GitHub Pages and `output: 'export'`, with no client routing edge cases.

**Deferred route (only when real content exists):** `/notes/` plus `/notes/[slug]/` for research notes. Do not ship an empty route; the Writing section shows an honest "notes forthcoming" line instead (§6).

---

## 2. Sitemap and navigation

```
/                        (single page)
├── #top        Hero
├── #research   Research
├── #projects   Projects
├── #engineering Engineering
├── #writing    Writing        (papers + notes state)
├── #community  Community      (Lumina)
└── #contact    Contact
/404.html                 static not-found (required by GitHub Pages)
[deferred] /notes/, /notes/[slug]/
```

**Nav labels** (short, lab voice, lowercase optional per `VISUAL_IDENTITY.md`):

| Anchor | Label |
|---|---|
| `#research` | Research |
| `#projects` | Projects |
| `#engineering` | Systems |
| `#writing` | Papers |
| `#community` | Lumina |
| `#contact` | Contact |

Notes on labels:
- "Systems" instead of "Engineering" reads as lab infrastructure rather than a job title. Section heading on the page stays **Engineering**.
- "Papers" instead of "Writing" because every current item is a paper. Rename the nav label to **Writing** once notes exist.
- "Lumina" is the proper name; the section heading gives context ("Lumina Embodied AI Community").
- The wordmark "Wadu Chen" links to `#top`. No "Home" link.

Section order follows how a research visitor reads: *what do you work on → what have you built → can you build real systems → what have you published → who do you work with → how to reach you.*

---

## 3. Evidence ledger (what the résumé actually supports)

Every card, tag, and sentence must cite one of these IDs in the content file (`evidence` field, see schemas in `COMPONENT_ARCHITECTURE.md`). Anything without an ID is **directional** and must be visibly labeled.

### Education
| ID | Fact (translated) | Dates |
|---|---|---|
| `EDU-SZU` | Shenzhen University: B.Eng., Computer Science and Technology. Core courses: Algorithm Design & Analysis, Data Structures, Computer Systems, **Microprocessors & Robotics**, **Computer Vision**. | 2021.09 – 2025.06 |
| `EDU-SZU-AWD` | Silver prize, preliminary round, National Algorithm Elite Contest (China Computer Application Technology Competition); Top Talent Innovation Award; Outstanding Student Cadre. | — |
| `EDU-CITYU` | City University of Hong Kong: M.Sc., **Data Science** (in progress). Core courses: **Dynamic Programming & Reinforcement Learning**, **Embodied AI & Applications**, Time Series & Neural Networks, Machine Learning. | in progress |
| `EDU-CITYU-AWD` | **Outstanding Research Project Award 2026**, for *Data-Dependent Thresholds and Structured Non-Monotonicity in Low-Rank MERA Image Fitting*. | 2026 |

### Roles
| ID | Organization | Role | Dates | Supported claims |
|---|---|---|---|---|
| `EXP-XJGN` | Shenzhen Xingji Guangnian Technology Co., Ltd. (深圳星际光年科技有限公司) | R&D Intern | 2024.09 – 2025.01 | Deeply involved in the company's early-generation **dexterous hand** development; built the hand's basic **control framework on embedded hardware/software**; designed **dexterous-hand control algorithms**; designed and implemented algorithms for the hand's **functional demo**. Product/team outcomes: product selected for **HK DeepTech100** and the **Google Cloud startup program**; **1st prize, XbotMan-2024 Lianghu Hard-Tech Startup Competition**. |
| `EXP-MMHAND` | Shenzhen Hetao Institute × **HKU MMLab** | Design Consultant | 2025.08 – 2026.05 | Proposed multiple **mechanical design** concepts (high adoption rate); **embedded software debugging**; **control algorithm and state-machine design**. Outcome: **MM-Hand 1.0**. |
| `EXP-PARAMI` | Parami AI (HK) | Development Intern & Teaching Assistant | 2025.09 – 2026.04 | **Technical lead** for the **LeRobot single- and dual-arm** HKAGE course. |
| `EXP-AGILEX` | AgileX Robotics (松灵机器人), R&D | Assistant Development Engineer | 2024.08 – 2024.09 | Training competition: **ROS2-based driverless car development**, **ranked 1st of 8 teams**; **assisted with parts of RoboTwin 1.0**; maintained the front-end interface for asset display. |

> Company-level outcomes for `EXP-XJGN` (DeepTech100, Google Cloud program, XbotMan prize) are **product/team achievements** and must be phrased that way ("the product was selected…"), never as personal awards.

### Research and publications
| ID | Title | Venue / outcome as listed in PDF | Author position stated | Dates |
|---|---|---|---|---|
| `PUB-ROBOTWIN2` | RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation | **ICML 2026**; **Best Poster, RoDGE Workshop @ IROS 2025**; Excellent Poster, China Spatial Intelligence Conference | Not stated → show as "co-author" only after Julie confirms | 2025.04 – 2025.07 |
| `PUB-G3FLOW` | G3Flow: Generative 3D Semantic Flow for Pose-aware and Generalizable Object Manipulation | **CVPR 2025** (accepted) | Not stated → "co-author" pending confirmation | 2024.08 – 2024.11 |
| `PUB-CAPRO` | CaPro: Curvilinear-aware Prompt Learning with Single Unlabeled Image for Cost-effective Curvilinear Structure Segmentation | **AAAI 2026**, poster | **Co-first author** | 2024.07 – 2025.03 |
| `PUB-AICL` | Attack-inspired Calibration Loss for Calibrating Crack Recognition | **AAAI 2025**, poster | **Second author** | 2024.03 – 2024.07 |
| `CHL-MARS` | MARS 2025 Challenge on SpaVLE @ NeurIPS 2025, Track 2 | **Champion (1st place)** | Team member: collected **simulation data**, ran validation experiments, **tuned policy configurations to raise success rate** | 2025.09 – 2025.11 |
| `RES-MERA` | Low-Rank MERA Image Fitting (research project) | Outstanding Research Project Award 2026 (CityU) | — | 2026 |

**Verification flags for Julie before launch.** Show these as-is or confirm; never "upgrade" them.
1. RoboTwin 2.0: the PDF writes "ICML26" without "accepted". Display **"ICML 2026"** exactly as listed; confirm status (accepted / to appear) and author position.
2. G3Flow: confirm author position.
3. "SpaVLE": do not expand the acronym on the site unless Julie supplies the official expansion.
4. Paper links (arXiv / DOI / project page): the PDF has none. Leave `links` empty until Julie supplies them; the card renders without a link rather than with a guessed URL.

### Community and other
| ID | Fact |
|---|---|
| `COM-LUMINA` | **Founder / lead organizer (主理人) of the Lumina Embodied AI Community.** No activities, events, or member counts are stated. |
| `LANG` | English: CET-6; IELTS 6.5. *(Not surfaced on the site; résumé detail, not research identity.)* |

### Not in the résumé (never claim)
- Humanoid robot locomotion work of any kind.
- A trained or released **VLA model**.
- A **reinforcement learning** project (only coursework `EDU-CITYU`).
- **Model deployment** to production or onboard compute.
- Specific simulators (Isaac, MuJoCo, SAPIEN…), frameworks (PyTorch, JAX…), or languages. The PDF names **ROS2, LeRobot, Segment Anything Model, embedded hardware/software, multimodal LLMs (in RoboTwin 2.0), domain randomization** only.
- Any quantitative result (success rates, accuracy, speedups, dataset sizes).
- Blog posts, talks, invited lectures, media coverage.
- Lumina member counts, events, partners, sponsors.
- Google Scholar, LinkedIn, X/Twitter, or personal GitHub URLs (none in PDF; see §8).

---

## 4. Content rules (hard constraints)

1. **No fabrication.** No invented papers, employers, affiliations, awards, metrics, dates, co-authors, links, or quotes.
2. **Every factual sentence carries an evidence ID** in the content file. Build-time lint (see `TECHNOLOGY.md`) fails if a `Project` or `EngineeringItem` has `status: "evidenced"` and an empty `evidence` array.
3. **Directional content is labeled on screen**, not just in data: a visible `Direction` badge plus copy phrased as intent ("I'm interested in…", "Open question:"). A direction never has a `keyResults` field.
4. **Team vs. individual.** Use "contributed to", "was part of the team that…" unless the PDF states the individual contribution (e.g. "co-first author", "technical lead", "designed control algorithms").
5. **Venue strings exactly as in the PDF**, normalized only for format ("AAAI26" → "AAAI 2026"). No "oral", "spotlight", or "accepted" unless stated.
6. **Tool tags come from a closed vocabulary** (§5.3) and each tag must be justified by the item's evidence.
7. **Legal name appears only** in publication author context ("published as Qiangyu Chen") and in page metadata `alternateName`. Everywhere else: Wadu Chen.
8. **No private contact data** (§0).
9. **No résumé artifacts** on the page: no GPA, no language scores, no "Skills" bar charts, no "Objective".
10. **Tone:** first person, sparse, declarative. No superlatives ("passionate", "cutting-edge", "world-class"). Awards are stated plainly, once.

---

## 5. Section-by-section content

Copy below is **draft copy**, ready to paste into the content layer. Bracketed IDs are evidence references and are not rendered.

### 5.1 Hero (`#top`)

- **Eyebrow:** Embodied AI · Robot Learning · Manipulation
- **Name (H1):** Wadu Chen
- **Role line:** Embodied AI Researcher
- **Statement (≤ 2 sentences):**
  > I build intelligent robotic systems through robot learning, simulation, perception, and control, from dexterous hands on the bench to scalable simulated data for bimanual manipulation.
  *(Grounded: dexterous hands `EXP-XJGN`, `EXP-MMHAND`; simulation data `PUB-ROBOTWIN2`, `CHL-MARS`; perception `PUB-G3FLOW`, `PUB-CAPRO`; control `EXP-XJGN`, `EXP-MMHAND`.)*
- **Affiliation line (factual, small):** M.Sc. Data Science, City University of Hong Kong `EDU-CITYU`
- **Signal strip:** three short proof points, not a stats counter:
  - `RoboTwin 2.0 · ICML 2026 · IROS 2025 RoDGE Workshop Best Poster` `PUB-ROBOTWIN2`
  - `G3Flow · CVPR 2025` `PUB-G3FLOW`
  - `MARS @ NeurIPS 2025 · Track 2 Champion` `CHL-MARS`
- **Actions:** `Research ↓` (anchor) · `Papers ↓` (anchor) · `GitHub ↗` (only if Julie confirms the handle, §8)
- **Visual role:** calm, lab-like first frame. A single restrained motion element (e.g. slow line-field or point-cloud drift) suggests embodiment without stock robot imagery. No photo required. Imagery rules: see `VISUAL_IDENTITY.md`.

### 5.2 Research (`#research`)

**Section intro:**
> My work sits where learning meets hardware: how robots acquire manipulation skills from data, how simulation can generate that data at scale, and how those skills survive the jump to the real world.

Five topics. Each gets a short explanation, a status (`evidenced` or `direction`), related work linked to project cards by ID, and a visual role.

| # | Topic | Status | Explanation (draft) | Related (links to cards) | Visual role |
|---|---|---|---|---|---|
| 1 | **Robot Learning** | evidenced | Learning manipulation policies from demonstrations and synthetic data, and building the data and evaluation pipelines that make that learning reliable. | `proj-robotwin2`, `proj-mars`, `proj-g3flow`; engineering `eng-lerobot` | Anchor topic, shown first and largest |
| 2 | **Vision-Language-Action Models** | direction | Grounding language and vision in physical action. I've worked on vision-language-embodied evaluation in simulation and on MLLM-driven data generation; policies that map language and pixels directly to action are where I'm heading. | Conceptual link: `proj-mars` (vision-language embodied challenge), `proj-robotwin2` (MLLM-assisted data generation). Label: *"related work, not a VLA model"* | Direction badge; lighter weight |
| 3 | **Dexterous Manipulation** | evidenced | Multi-fingered hands: mechanism design, embedded control, state machines, and control algorithms that turn a mechanism into a usable manipulator. | `proj-dexhand-xjgn`, `proj-mmhand` | Hardware-forward visual (hand schematic / line art) |
| 4 | **Reinforcement Learning** | direction | Studying dynamic programming and RL formally (M.Sc. coursework), with the goal of combining RL fine-tuning with large-scale simulated data for contact-rich control. | No project cards. Shows *"Direction · coursework foundation"* `EDU-CITYU` | Direction badge; text-only |
| 5 | **Sim2Real Transfer & Simulation Data Generation** | evidenced | Using domain randomization and scalable synthetic data so that policies trained in simulation hold up on real robots with little real data. | `proj-robotwin2`, `proj-mars`; engineering `eng-sim` | Diagram: sim → randomization → real |

Rules:
- Direction topics render **no** result lines and **no** tool tags.
- The "Perception" thread (G3Flow, CaPro, AICL) is not a sixth topic. It surfaces through project cards and Papers and supports the Hero's "perception" claim.

### 5.3 Projects (`#projects`)

**Section intro:**
> Selected work. Results are stated as published or awarded; team efforts are marked as such.

**Card fields:** Title · Context line (org / venue · dates) · Research Question · Technical Approach · Key Results · Tools · Role · Links · Status.

**Closed tool vocabulary.** Allowed tags, each needing evidence on the card:
`Dexterous Hands` · `Embedded Control` · `Mechanical Design` · `State Machines` · `Simulation` · `Domain Randomization` · `Synthetic Data` · `Bimanual Manipulation` · `Multimodal LLMs` · `3D Vision` · `Computer Vision` · `Segmentation` · `Foundation Models (SAM)` · `ROS2` · `LeRobot` · `Policy Evaluation`
Brief-requested tags **`RL`** and **`VLA`** exist in the vocabulary but **no evidenced card may use them** today.

**Mapping from the user's example directions:**
| User example | Decision |
|---|---|
| Dexterous Hand Manipulation | **Supported** → cards `proj-dexhand-xjgn`, `proj-mmhand` |
| Humanoid Robot Locomotion | **No résumé evidence → omitted.** Not shown as a card or a direction. Reintroduce only with real work. |
| Vision-based Object Understanding | **Supported** → `proj-g3flow` (primary), CaPro/AICL in Papers |
| Robot Learning Pipeline | **Supported** → `proj-robotwin2`, `proj-mars` |

**Card order (featured first):**

**① `proj-robotwin2`: RoboTwin 2.0** · featured
- Context: ICML 2026 · Best Poster, RoDGE Workshop @ IROS 2025 · 2025.04–2025.07
- Research question: How can we generate large, diverse synthetic data that makes bimanual manipulation policies robust enough to transfer to the real world?
- Approach: A simulation framework that automatically generates large-scale, diverse synthetic data for dual-arm manipulation, combining multimodal large language models with five-dimensional domain randomization.
- Key results (as stated): Improved policy robustness and sim-to-real transfer, with large gains from only a small amount of real data *(qualitative, as in the PDF; no numbers)*. Best Poster, RoDGE Workshop @ IROS 2025. Excellent Poster, China Spatial Intelligence Conference. ICML 2026.
- Tools: `Simulation` `Domain Randomization` `Synthetic Data` `Bimanual Manipulation` `Multimodal LLMs`
- Role: Co-author *(pending confirmation)*. Earlier contribution to RoboTwin 1.0 at AgileX `EXP-AGILEX`.
- Evidence: `PUB-ROBOTWIN2`, `EXP-AGILEX`

**② `proj-dexhand-xjgn`: Dexterous Hand Control, Early-Generation Product**
- Context: R&D Intern, Shenzhen Xingji Guangnian Technology · 2024.09–2025.01
- Research question: What control architecture lets an early-stage dexterous hand move from prototype hardware to a reliable, demonstrable manipulator?
- Approach: Built the hand's basic control framework on embedded hardware and software; designed dexterous-hand control algorithms; designed and implemented the algorithms behind the product's functional demo.
- Key results (product/team): The product was selected for HK DeepTech100 and the Google Cloud startup program, and won 1st prize at the XbotMan-2024 Lianghu Hard-Tech Startup Competition.
- Tools: `Dexterous Hands` `Embedded Control`
- Role: R&D Intern, control framework and algorithms
- Evidence: `EXP-XJGN`

**③ `proj-mmhand`: MM-Hand 1.0**
- Context: Design Consultant, Shenzhen Hetao Institute × HKU MMLab · 2025.08–2026.05
- Research question: How should a research dexterous hand be designed mechanically and in control logic so it's dependable for lab manipulation research?
- Approach: Proposed multiple mechanical structure concepts (widely adopted), debugged embedded software, and designed control algorithms and the hand's state machine.
- Key results: MM-Hand 1.0 delivered.
- Tools: `Dexterous Hands` `Mechanical Design` `Embedded Control` `State Machines`
- Role: Design Consultant
- Evidence: `EXP-MMHAND`

**④ `proj-g3flow`: G3Flow**
- Context: CVPR 2025 · 2024.08–2024.11
- Research question: How can a robot keep an up-to-date, pose-aware semantic understanding of objects to generalize manipulation without manual annotation?
- Approach: Combines 3D generative models, vision foundation models, and robust pose tracking into a dynamic 3D semantic flow whose semantic features update in real time, with no manual annotation.
- Key results: Accepted at CVPR 2025.
- Tools: `3D Vision` `Computer Vision`
- Role: Co-author *(pending confirmation)*
- Evidence: `PUB-G3FLOW`

**⑤ `proj-mars`: MARS 2025 Challenge (SpaVLE), Track 2**
- Context: NeurIPS 2025 workshop challenge · 2025.09–2025.11
- Research question: What data and policy configuration choices most improve embodied task success in simulation?
- Approach: Collected simulation data, ran validation experiments, and tuned policy configurations to increase success rate.
- Key results: Champion (1st place), Track 2.
- Tools: `Simulation` `Synthetic Data` `Policy Evaluation`
- Role: Team member, simulation data and policy tuning
- Evidence: `CHL-MARS`

**⑥ `proj-capro`: CaPro** · compact card (perception)
- Context: AAAI 2026 (poster) · co-first author · 2024.07–2025.03
- Research question: Can a segmentation foundation model be adapted to thin, curvilinear structures using just one unlabeled image?
- Approach: Adapts the Segment Anything Model with automatically generated and refined visual prompts, learned from a single unlabeled image.
- Key results: Strong performance on medical and crack segmentation tasks *(qualitative, as in PDF)*. AAAI 2026.
- Tools: `Computer Vision` `Segmentation` `Foundation Models (SAM)`
- Evidence: `PUB-CAPRO`

*(AICL appears in Papers only; it is a calibration/recognition paper and adds little to the embodied narrative as a card.)*

### 5.4 Engineering (`#engineering`, nav "Systems")

**Section intro:**
> Research on robots is only as good as the systems underneath it. This is the hardware, simulation, and teaching infrastructure I've built or run.

Five capability areas from the brief. Each shows **evidenced items** or an honest capability statement.

| Area | Status | Items |
|---|---|---|
| **Hardware integration** | evidenced | Embedded control framework for an early-generation dexterous hand `EXP-XJGN`. Mechanical design concepts, embedded debugging, and state-machine design for MM-Hand 1.0 `EXP-MMHAND`. |
| **Robot deployment** (real hardware) | evidenced | Technical lead for the LeRobot single- and dual-arm course at HKAGE (Parami AI) `EXP-PARAMI`. Functional demo algorithms on a real dexterous hand `EXP-XJGN`. ROS2-based driverless car, 1st of 8 teams `EXP-AGILEX`. |
| **Simulation environments** | evidenced | Contributed to RoboTwin 1.0 `EXP-AGILEX` and RoboTwin 2.0 `PUB-ROBOTWIN2`. |
| **Data collection** | evidenced (simulation) | Simulation data collection and validation for MARS Track 2 `CHL-MARS`. Large-scale synthetic data generation in RoboTwin 2.0 `PUB-ROBOTWIN2`. *Do not claim real-world teleoperation data collection.* |
| **Model deployment** | direction | Copy: *"Next: taking learned policies from simulation onto physical arms and hands end to end."* No items, no tools. |

Item IDs used by Research cross-links: `eng-hw-dexhand`, `eng-hw-mmhand`, `eng-lerobot`, `eng-ros2-car`, `eng-sim`, `eng-data-mars`.

Also rendered here: a compact **Timeline** of roles and education (the only "résumé-like" element, kept secondary):

```
2025.09 – 2026.04  Parami AI (HK) · Development Intern & TA · LeRobot course technical lead
2025.08 – 2026.05  Shenzhen Hetao Institute × HKU MMLab · Design Consultant · MM-Hand 1.0
2024.09 – 2025.01  Shenzhen Xingji Guangnian Technology · R&D Intern · dexterous hand control
2024.08 – 2024.09  AgileX Robotics · Assistant Development Engineer · ROS2, RoboTwin 1.0
—
in progress        City University of Hong Kong · M.Sc. Data Science
2021 – 2025        Shenzhen University · B.Eng. Computer Science and Technology
```
The asset-display front-end maintenance at AgileX is omitted from the page (true, but off-identity). It stays in the data with `display: false`.

### 5.5 Writing (`#writing`, nav "Papers")

**Section heading:** Writing
**Sub-block A: Papers** (published as Qiangyu Chen)

Order: most recent venue first.
1. **RoboTwin 2.0**: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation. *ICML 2026.* Best Poster, RoDGE Workshop @ IROS 2025.
2. **CaPro**: Curvilinear-aware Prompt Learning with Single Unlabeled Image for Cost-effective Curvilinear Structure Segmentation. *AAAI 2026, poster.* Co-first author.
3. **G3Flow**: Generative 3D Semantic Flow for Pose-aware and Generalizable Object Manipulation. *CVPR 2025.*
4. **Attack-inspired Calibration Loss for Calibrating Crack Recognition.** *AAAI 2025, poster.* Second author.

Each `PublicationCard`: title, venue + year, honors, author-position note (only if stated), `[Paper] [Project] [Code]` links **only if supplied**.

**Sub-block B: Research recognition**
- Outstanding Research Project Award 2026 (CityU): *Data-Dependent Thresholds and Structured Non-Monotonicity in Low-Rank MERA Image Fitting.* Present as a research project, not a paper.
- Champion, MARS 2025 Challenge (SpaVLE) Track 2 @ NeurIPS 2025 (links to project card).

**Sub-block C: Notes** (empty-honest state)
> **Research notes: forthcoming.** Short write-ups on dexterous hand control, simulation data generation, and sim-to-real will appear here.

No fake titles, no "coming soon" cards with invented headlines. When the first real note exists, create `/notes/` and change the nav label to **Writing**.

### 5.6 Community (`#community`, nav "Lumina")

**Section heading:** Lumina Embodied AI Community
**Body (draft, introduction only):**
> Lumina is an open community for people working on embodied AI: robot learning, manipulation, simulation, and the hardware that makes them real. It's a place to share papers, compare notes on real-robot setups, and help newcomers find their way into the field. I founded and lead it.

Evidence: `COM-LUMINA` supports only "founder / lead organizer". The rest is framed as purpose and intent, not reported activity.

**Must not include:** member counts, event lists, partner logos, "join 1,000+ researchers", testimonials.
**Slots (hidden when empty):** `joinUrl`, `channels[]`, `activities[]`. Render only when Julie provides real data.

**Related (factual) line:** *"I also teach: technical lead for the LeRobot single- and dual-arm course at HKAGE (Parami AI)."* `EXP-PARAMI`

### 5.7 Contact (`#contact`)

**Heading:** Contact
**Body:**
> Interested in robot learning, dexterous manipulation, or simulation for embodied AI? I'm glad to talk about research collaboration.

**Channels** (render only non-empty; see §8):
- GitHub: pending confirmation of handle
- Professional email: **not specified**. Placeholder slot until Julie supplies an institutional or dedicated research address.
- Google Scholar / LinkedIn / X: empty slots, hidden.

Footer: `© 2026 Wadu Chen` · `Built as a static site` · last updated date.

---

## 6. Empty and honest states (summary)

| Where | Condition | Rendered copy |
|---|---|---|
| Research topic | `status: direction` | Badge "Direction" + intent copy; no results/tools |
| Engineering area | no evidence | "Next: …" one-liner |
| Writing → Notes | zero notes | "Research notes: forthcoming. …" |
| Publication links | none supplied | Card with no link row (no disabled buttons) |
| Community | no activities/channels | Intro paragraph only |
| Contact | channel empty | Channel hidden; if all empty, show "Contact details coming soon." |

---

## 7. Metadata (SEO / social)

- `<title>`: Wadu Chen, Embodied AI Researcher
- `description`: Embodied AI researcher working on robot learning, dexterous manipulation, and simulation data generation for sim-to-real transfer.
- JSON-LD `Person`: `name: "Wadu Chen"`, `alternateName: ["Qiangyu Chen", "陈锵宇"]`, `jobTitle: "Embodied AI Researcher"`, `affiliation: City University of Hong Kong` (student), `knowsAbout: [Robot Learning, Dexterous Manipulation, Sim2Real, ...]`. No email or phone.
- Canonical: `https://wadu999.github.io/`

---

## 8. Contact and links: open inputs for Julie

The PDF has **no** public professional links. Before launch, Julie supplies (or leaves empty):
1. Public GitHub handle to link (`wadu999`? `QiangyuChen1`?). Must match the Pages account decision in `TECHNOLOGY.md`.
2. A professional email (e.g. a CityU address or a dedicated research inbox). Until then, no email is shown. The personal Gmail in the PDF stays off the site unless she explicitly opts in.
3. Paper URLs (arXiv / DOI / project pages) for the four papers.
4. Author positions for RoboTwin 2.0 and G3Flow; RoboTwin 2.0 ICML status.
5. Lumina channels/join link, if public.
