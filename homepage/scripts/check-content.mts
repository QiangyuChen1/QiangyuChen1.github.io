import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { evidence } from "../content/evidence.ts";
import { profile } from "../content/profile.ts";
import { workDirections } from "../content/work.ts";
import { projects } from "../content/projects.ts";
import { timeline } from "../content/engineering.ts";
import { community } from "../content/community.ts";
import type { DateRange, MediaRef } from "../content/types.ts";

const errors: string[] = [];
const warnings: string[] = [];
const fail = (msg: string) => errors.push(msg);

const publicDir = fileURLToPath(new URL("../public", import.meta.url));
const knownEvidence = new Set(Object.keys(evidence));
const projectIds = new Set(projects.map((p) => p.id));
const restrictedTools = new Set(["RL", "VLA"]);
const accentWorthy = /best paper|best poster|champion/i;
const yearMonth = /^\d{4}\.(0[1-9]|1[0-2])$/;

function checkEvidence(where: string, ids: string[]) {
  for (const id of ids) if (!knownEvidence.has(id)) fail(`${where}: unknown evidence ID "${id}"`);
}

function checkLinks(where: string, links: { href: string }[]) {
  for (const l of links) {
    if (/^(https:\/\/|mailto:)/.test(l.href)) continue;
    if (l.href.startsWith("/")) {
      checkLocalFile(where, l.href);
      continue;
    }
    fail(`${where}: link "${l.href}" is not an absolute https/mailto URL or a file under public/`);
  }
}

function checkLocalFile(where: string, path: string) {
  if (!path.startsWith("/")) fail(`${where}: "${path}" must be a path under public/`);
  else if (!existsSync(publicDir + path)) fail(`${where}: file public${path} does not exist`);
}

function checkMedia(where: string, media: MediaRef | undefined) {
  if (!media) return;
  checkLocalFile(where, media.src);
  if (!media.alt.trim()) fail(`${where}: image needs alt text`);
  if (media.href && !media.href.startsWith("https://")) checkLocalFile(`${where} (href)`, media.href);
}

function checkDates(where: string, d: DateRange) {
  if (d.start && !yearMonth.test(d.start)) fail(`${where}: start "${d.start}" is not YYYY.MM`);
  if (d.end && d.end !== "present" && !yearMonth.test(d.end)) fail(`${where}: end "${d.end}" is not YYYY.MM`);
  if (d.start && d.end && d.end !== "present" && d.end < d.start) fail(`${where}: ends before it starts`);
}

for (const d of workDirections) {
  const where = `work/${d.id}`;
  checkEvidence(where, d.evidence);
  checkMedia(`${where}/media`, d.media);
  if (d.evidence.length === 0) fail(`${where}: direction without evidence`);
  if ((d.signals?.length ?? 0) > 2) fail(`${where}: at most 2 signals`);
  if (d.relatedProjects.length > 2) fail(`${where}: at most 2 related projects`);
  for (const p of d.relatedProjects) if (!projectIds.has(p)) fail(`${where}: unknown project "${p}"`);
}

for (const p of projects) {
  const where = `projects/${p.id}`;
  checkEvidence(where, p.evidence);
  checkLinks(where, p.links);
  checkDates(where, p.dates);
  checkMedia(`${where}/media`, p.media);
  for (const [i, a] of (p.awards ?? []).entries()) checkMedia(`${where}/awards[${i}]`, a);
  const awardTargets = (p.awards ?? []).map((a) => a.href ?? a.src);
  if (new Set(awardTargets).size !== awardTargets.length) fail(`${where}: two award chips open the same file`);
  if (!p.media) warnings.push(`${where}: no teaser; the card falls back to a text-only layout`);
  if (p.status === "evidenced" && p.evidence.length === 0) fail(`${where}: evidenced project without evidence`);
  if (p.status === "direction" && (p.outcome || p.tools.length))
    fail(`${where}: direction project must not have an outcome or tools`);
  if (p.tools.length > 3) fail(`${where}: at most 3 tool tags`);
  for (const tool of p.tools)
    if (restrictedTools.has(tool)) fail(`${where}: tool "${tool}" is not supported by any evidence`);
  if (p.highlight && !accentWorthy.test(p.highlight)) fail(`${where}: accent highlight is reserved for Best Paper, Best Poster, or Champion`);
  if (p.outcome && p.context && p.outcome.replace(/[.\s]/g, "") === p.context.replace(/[.\s]/g, ""))
    fail(`${where}: outcome only restates the venue`);
}

for (const t of timeline) {
  const where = `timeline/${t.id}`;
  checkEvidence(where, t.evidence);
  checkDates(where, t.dates);
  checkMedia(`${where}/mark`, t.mark);
  if (t.evidence.length === 0) fail(`${where}: entry without evidence`);
}

checkEvidence("community", community.evidence);
checkLinks("community", community.channels ?? []);
checkMedia("community/mark", community.mark);
if (community.relatedTeaching) checkEvidence("community/teaching", community.relatedTeaching.evidence);

const c = profile.contact;
if (c.email && /gmail\.com$/i.test(c.email) && !c.allowPersonalEmail)
  fail("contact: personal Gmail must not be published without allowPersonalEmail");
checkLinks("contact", [c.github, c.scholar, c.linkedin, c.x, c.wechat, c.rednote].filter((l) => l !== undefined));
const personalOnly = c.email && /gmail\.com$/i.test(c.email) && !c.allowPersonalEmail;
if ((!c.email || personalOnly) && !c.github && !c.scholar && !c.linkedin && !c.x)
  warnings.push(
    "contact: no approved public channel. The Contact section and nav item are hidden. Add a confirmed GitHub/Scholar URL or a professional email in content/profile.ts.",
  );
if (profile.worksFor?.url) checkLinks("profile/worksFor", [{ href: profile.worksFor.url }]);

for (const s of profile.signals) checkEvidence(`profile/signal "${s.work}"`, s.evidence);
if (profile.signals.length > 3) fail("profile: at most 3 hero signals");

for (const w of warnings) console.warn(`⚠ Content warning: ${w}`);
if (errors.length) {
  console.error(`Content check failed (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(
  `Content check passed: ${workDirections.length} work directions, ${projects.length} projects, ${timeline.length} timeline entries.`,
);
