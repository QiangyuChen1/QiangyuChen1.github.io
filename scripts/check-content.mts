import { evidence } from "../content/evidence.ts";
import { profile } from "../content/profile.ts";
import { researchTopics } from "../content/research.ts";
import { projects } from "../content/projects.ts";
import { timeline } from "../content/engineering.ts";
import { writing } from "../content/writing.ts";
import { community } from "../content/community.ts";

const errors: string[] = [];
const warnings: string[] = [];
const fail = (msg: string) => errors.push(msg);

const knownEvidence = new Set(Object.keys(evidence));
const projectIds = new Set(projects.map((p) => p.id));
const restrictedTools = new Set(["RL", "VLA"]);
const accentWorthy = /best paper|champion/i;

function checkEvidence(where: string, ids: string[]) {
  for (const id of ids) if (!knownEvidence.has(id)) fail(`${where}: unknown evidence ID "${id}"`);
}

function checkLinks(where: string, links: { href: string }[]) {
  for (const l of links) {
    if (!/^(https:\/\/|mailto:)/.test(l.href)) fail(`${where}: link "${l.href}" is not an absolute https/mailto URL`);
  }
}

for (const t of researchTopics) {
  const where = `research/${t.id}`;
  checkEvidence(where, t.evidence);
  if (t.status === "evidenced" && t.evidence.length === 0) fail(`${where}: evidenced topic without evidence`);
  if (t.status === "direction" && t.signals?.length) fail(`${where}: direction topic must not show result signals`);
  if (t.status === "direction" && t.relatedProjects.length > 0 && !t.relationNote)
    fail(`${where}: direction topic with related projects needs a relationNote`);
  if ((t.signals?.length ?? 0) > 2) fail(`${where}: at most 2 signals`);
  if (t.relatedProjects.length > 2) fail(`${where}: at most 2 related projects`);
  for (const p of t.relatedProjects) if (!projectIds.has(p)) fail(`${where}: unknown project "${p}"`);
}

for (const p of projects) {
  const where = `projects/${p.id}`;
  checkEvidence(where, p.evidence);
  checkLinks(where, p.links);
  if (p.status === "evidenced" && p.evidence.length === 0) fail(`${where}: evidenced project without evidence`);
  if (p.status === "direction" && (p.outcome || p.tools.length))
    fail(`${where}: direction project must not have an outcome or tools`);
  if (p.tools.length > 3) fail(`${where}: at most 3 tool tags`);
  for (const tool of p.tools)
    if (restrictedTools.has(tool)) fail(`${where}: tool "${tool}" is not supported by any evidence`);
  if (p.highlight && !accentWorthy.test(p.highlight)) fail(`${where}: accent highlight is reserved for Best Paper / Champion`);
  if (p.outcome && p.context && p.outcome.replace(/[.\s]/g, "") === p.context.replace(/[.\s]/g, ""))
    fail(`${where}: outcome only restates the venue`);
}

for (const t of timeline) checkEvidence(`timeline/${t.id}`, t.evidence);

for (const w of [...writing.papers, ...writing.recognition]) {
  const where = `writing/${w.id}`;
  checkEvidence(where, w.evidence);
  checkLinks(where, w.links);
  if (w.kind === "paper" && (!w.venue || w.evidence.length === 0)) fail(`${where}: paper needs venue and evidence`);
  if (w.relatedProject && !projectIds.has(w.relatedProject)) fail(`${where}: unknown project "${w.relatedProject}"`);
  if (w.highlight && !accentWorthy.test(w.highlight)) fail(`${where}: accent highlight is reserved for Best Paper / Champion`);
}

checkEvidence("community", community.evidence);
if (community.relatedTeaching) checkEvidence("community/teaching", community.relatedTeaching.evidence);

const c = profile.contact;
if (c.email && /gmail\.com$/i.test(c.email) && !c.allowPersonalEmail)
  fail("contact: personal Gmail must not be published without allowPersonalEmail");
checkLinks("contact", [c.github, c.scholar, c.linkedin, c.x].filter((l) => l !== undefined));
const personalOnly = c.email && /gmail\.com$/i.test(c.email) && !c.allowPersonalEmail;
if ((!c.email || personalOnly) && !c.github && !c.scholar && !c.linkedin && !c.x)
  warnings.push(
    "contact: no approved public channel. The Contact section and nav item are hidden. Add a confirmed GitHub/Scholar URL or a professional email in content/profile.ts.",
  );

for (const s of profile.signals) checkEvidence(`profile/signal "${s.work}"`, s.evidence);
if (profile.signals.length > 3) fail("profile: at most 3 hero signals");

for (const w of warnings) console.warn(`⚠ Content warning: ${w}`);
if (errors.length) {
  console.error(`Content check failed (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(
  `Content check passed: ${researchTopics.length} topics, ${projects.length} projects, ${timeline.length} timeline entries, ${writing.papers.length} papers.`,
);
