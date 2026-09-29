import type { WritingItem } from "@/content/types";
import { VenueBadge } from "./ui/Badges";
import { Tag } from "./ui/Tag";
import { LinkRow } from "./ui/Links";

interface PublicationCardProps {
  item: WritingItem;
  showPublishedAs?: boolean;
}

export function PublicationCard({ item, showPublishedAs = false }: PublicationCardProps) {
  const notes = [item.authorNote, item.format === "poster" ? "Poster" : undefined].filter(Boolean);

  return (
    <article
      id={item.id}
      className="group grid grid-cols-4 gap-x-4 gap-y-3 py-8 transition-colors duration-200 sm:grid-cols-8 sm:gap-x-5 lg:-mx-4 lg:grid-cols-12 lg:gap-x-6 lg:px-4 lg:hover:bg-subtle"
    >
      <div className="col-span-4 sm:col-span-2 lg:col-span-2">
        <VenueBadge venue={item.venue} year={item.year} />
      </div>

      <div className="col-span-4 sm:col-span-6 lg:col-span-7">
        <h3 className="text-h4 text-pretty text-ink transition-colors duration-200 group-hover:text-accent">
          {item.shortTitle ? (
            <>
              {item.shortTitle}
              <span className="font-medium text-secondary group-hover:text-accent">: {item.title}</span>
            </>
          ) : (
            item.title
          )}
        </h3>
        {showPublishedAs && <p className="text-mono-sm mt-2 text-muted">Published as {item.publishedAs}</p>}
        {item.summary && <p className="text-body-sm mt-2 text-secondary">{item.summary}</p>}
        {item.honors && item.honors.length > 0 && (
          <ul className="text-caption mt-3 space-y-1 text-secondary">
            {item.honors.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        {notes.length > 0 && <p className="text-caption mt-2 text-muted">{notes.join(" · ")}</p>}
        {item.statusNote && <p className="text-caption mt-2 text-muted">{item.statusNote}</p>}
      </div>

      <div className="col-span-4 flex flex-wrap items-start gap-2 sm:col-span-6 sm:col-start-3 lg:col-span-3 lg:col-start-auto lg:flex-col lg:items-end">
        {item.highlight && <Tag tone="accent">{item.highlight}</Tag>}
        {item.domain && <Tag>{item.domain}</Tag>}
        <LinkRow links={item.links} className="lg:justify-end" />
        {item.relatedProject && (
          <a
            href={`#${item.relatedProject}`}
            className="text-caption link-underline inline-flex min-h-11 items-center text-muted transition-colors duration-150 hover:text-ink lg:min-h-0"
          >
            See project
          </a>
        )}
      </div>
    </article>
  );
}
