import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import ProjectCard from "@/app/(dashboard)/dashboard/projects/_components/project-card";
import { type Project } from "@/types";

export const metadata = {
  title: "Projects",
  description: "Manage account and website projects.",
};

const projects: Project[] = [
  {
    id: "item1",
    title: "Project A",
    avatarFallback: "PA",
    description: "Description of Project A.",
    owner: "Project Owner A",
  },
  {
    id: "item2",
    title: "Project B",
    avatarFallback: "PB",
    description: "Description of Project B.",
    owner: "Project Owner B",
  },
  {
    id: "item3",
    title: "Project C",
    avatarFallback: "PC",
    description: "Description of Project C.",
    owner: "Project Owner C",
  },
];

export default async function ProjectsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Projects"
        text="Manage account and website projects."
      />
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:p-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </DashboardShell>
  );
}
