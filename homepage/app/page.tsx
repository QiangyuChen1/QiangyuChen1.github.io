import { profile } from "@/content/profile";
import { footer, navItems, sections } from "@/content/site";
import { workDirections } from "@/content/work";
import { projects } from "@/content/projects";
import { engineeringNext, timeline } from "@/content/engineering";
import { community } from "@/content/community";
import { hasContactChannels } from "@/lib/contact";
import { Hero } from "@/components/sections/Hero";
import { WorkSection } from "@/components/sections/WorkSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { EducationSection, ExperienceSection } from "@/components/sections/EngineeringSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

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
            { label: "View work", href: "#work" },
            { label: "Projects", href: "#projects" },
          ]}
        />
        <WorkSection copy={sections.work} directions={workDirections} titlesById={titlesById} />
        <ProjectsSection copy={sections.projects} projects={projects} />
        <ExperienceSection
          copy={sections.experience}
          next={engineeringNext}
          entries={timeline.filter((entry) => entry.kind === "role")}
        />
        <EducationSection copy={sections.education} entries={timeline.filter((entry) => entry.kind === "education")} />
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
