import { profile } from "@/content/profile";
import { footer, navItems, sections } from "@/content/site";
import { researchTopics } from "@/content/research";
import { projects } from "@/content/projects";
import { engineeringNext, timeline } from "@/content/engineering";
import { writing } from "@/content/writing";
import { community } from "@/content/community";
import { hasContactChannels } from "@/lib/contact";
import { Hero } from "@/components/Hero";
import { ResearchSection } from "@/components/ResearchSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { EngineeringSection } from "@/components/EngineeringSection";
import { WritingSection } from "@/components/WritingSection";
import { CommunitySection } from "@/components/CommunitySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const titlesById: Record<string, string> = Object.fromEntries(
  projects.map((p) => [p.id, p.title.replace(/,.*$/, "")]),
);

const showContact = hasContactChannels(profile.contact);
const visibleNav = navItems.filter((n) => n.id !== "contact" || showContact);

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero
          profile={profile}
          actions={[
            { label: "View research", href: "#research" },
            { label: "Papers", href: "#writing" },
          ]}
        />
        <ResearchSection copy={sections.research} topics={researchTopics} titlesById={titlesById} />
        <WritingSection copy={sections.writing} writing={writing} />
        <ProjectsSection copy={sections.projects} projects={projects} />
        <EngineeringSection copy={sections.engineering} next={engineeringNext} timeline={timeline} />
        <CommunitySection copy={sections.community} community={community} organizer={profile.publicName} />
        {showContact && <ContactSection copy={sections.contact} contact={profile.contact} />}
      </main>
      <Footer
        name={profile.publicName}
        updated={footer.updated}
        place={footer.place}
        affiliation={showContact ? undefined : profile.affiliationLine}
        links={visibleNav}
      />
    </>
  );
}
