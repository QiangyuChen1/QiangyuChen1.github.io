import type { Project } from "@/content/types";
import { Tag } from "./Tag";

export function ScopeBadge({ scope }: { scope?: Project["resultScope"] }) {
  if (!scope) return null;
  return <Tag tone="outline">{scope === "team" ? "Team result" : "Product outcome"}</Tag>;
}
