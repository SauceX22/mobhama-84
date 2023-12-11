"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "lucide-react";
import React from "react";
import { type Project } from "@/types";
import { useRouter } from "next/navigation";

type Props = React.HTMLAttributes<HTMLDivElement> & { project: Project };

const ProjectCard = ({ project, ...props }: Props) => {
  const router = useRouter();
  return (
    <Card
      className="w-full min-w-max transition-colors hover:cursor-pointer hover:bg-secondary"
      onClick={() => router.push(`/dashboard/projects/${project.id}`)}
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
            // TODO add placeholder image url thing
            src={`/placeholder.svg?height=32&width=32`}
          />
          <AvatarFallback>{project.avatarFallback}</AvatarFallback>
        </Avatar>
        <span>{project.owner}</span>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
