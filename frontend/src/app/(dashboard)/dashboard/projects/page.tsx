import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { UserNameForm } from "@/components/user-name-form";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export const metadata = {
  title: "Projects",
  description: "Manage account and website projects.",
};

const projects = [
  {
    title: "Project A",
    avatarFallback: "PA",
    description: "Description of Project A.",
    owner: "Project Owner A",
  },
  {
    title: "Project B",
    avatarFallback: "PB",
    description: "Description of Project B.",
    owner: "Project Owner B",
  },
  {
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
          <Card
            key={index}
            className="w-full min-w-max transition-colors hover:cursor-pointer hover:bg-secondary "
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{project.title}</CardTitle>
              <Badge>Active</Badge>
            </CardHeader>
            <CardContent className="h-20">
              <p>{project.description}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-start gap-2">
              <Avatar>
                <AvatarImage
                  alt="Placeholder"
                  src={`/placeholder.svg?height=32&width=32`}
                />
                <AvatarFallback>{project.avatarFallback}</AvatarFallback>
              </Avatar>
              <span>{project.owner}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}

import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ExternalIconType = React.HTMLAttributes<HTMLOrSVGElement>;

function ExternalLinkIcon(props: ExternalIconType) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}
