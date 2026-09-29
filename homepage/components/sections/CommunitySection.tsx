import type { Community, SectionCopy } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { TagList } from "@/components/ui/Tag";
import { ButtonLink, LinkRow } from "@/components/ui/Links";
import { Mark } from "@/components/ui/Mark";

interface CommunitySectionProps {
  copy: SectionCopy;
  community: Community;
  organizer: string;
}

export function CommunitySection({ copy, community, organizer }: CommunitySectionProps) {
  const activities = community.activities ?? [];
  return (
    <Section id="community">
      <div className="grid grid-cols-4 gap-x-4 gap-y-12 sm:grid-cols-8 sm:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
        <Reveal className="col-span-4 sm:col-span-8 lg:col-span-6">
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h2 id="community-title" className="text-h2 mt-4 max-w-[32ch] text-balance text-ink">
            {copy.title}
          </h2>
          <p className="text-mono-sm mt-4 text-muted">
            {community.role} — {organizer}
          </p>
          <p className="text-lead mt-6 max-w-[60ch] text-secondary">{community.intro}</p>

          {(community.joinUrl || (community.channels && community.channels.length > 0)) && (
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {community.joinUrl && (
                <ButtonLink href={community.joinUrl} variant="text">
                  Get involved
                </ButtonLink>
              )}
              <LinkRow links={community.channels ?? []} />
            </div>
          )}

          {activities.length > 0 && (
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {activities.map((a) => (
                <li key={a.title} className="text-body-sm flex justify-between gap-4 py-3 text-secondary">
                  {a.href ? (
                    <a href={a.href} className="link-underline text-ink">
                      {a.title}
                    </a>
                  ) : (
                    <span>{a.title}</span>
                  )}
                  {a.date && <span className="text-mono-sm text-muted">{a.date}</span>}
                </li>
              ))}
            </ul>
          )}

          {community.relatedTeaching && (
            <p className="text-body-sm mt-8 max-w-[60ch] text-muted">{community.relatedTeaching.text}</p>
          )}
        </Reveal>

        <Reveal index={1} className="col-span-4 sm:col-span-8 lg:col-span-5 lg:col-start-8">
          <Card hover={false}>
            {community.mark && (
              <div className="flex items-center gap-4 border-b border-line pb-6">
                <Mark media={community.mark} className="h-14" />
                <div>
                  <p className="text-h4 text-ink">{community.shortName}</p>
                  <p className="text-caption text-muted">{community.name.replace(`${community.shortName} `, "")}</p>
                </div>
              </div>
            )}
            <dl>
              <div className="pt-5">
                <dt className="text-xs font-medium text-muted">Topics</dt>
                <dd className="mt-3">
                  <TagList items={community.focusAreas} />
                </dd>
              </div>
            </dl>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
