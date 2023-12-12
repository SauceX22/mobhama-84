import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import ProjectCard from "@/app/(dashboard)/dashboard/projects/_components/project-card";
import { type Project } from "@/server/api";

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
  },
  {
    id: "item2",
    title: "Project B",
    avatarFallback: "PB",
    description: "Description of Project B.",
  },
  {
    id: "item3",
    title: "Project C",
    avatarFallback: "PC",
    description: "Description of Project C.",
  },
  {
    id: "item4",
    title: "Project D",
    avatarFallback: "PD",
    description: "Description of Project D.",
  },
  {
    id: "item5",
    title: "Project E",
    avatarFallback: "PE",
    description: "Description of Project E.",
  },
  {
    id: "item6",
    title: "Project F",
    avatarFallback: "PF",
    description: "Description of Project F.",
  },
  {
    id: "item7",
    title: "Project G",
    avatarFallback: "PG",
    description: "Description of Project G.",
  },
  {
    id: "item8",
    title: "Project H",
    avatarFallback: "PH",
    description: "Description of Project H.",
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
