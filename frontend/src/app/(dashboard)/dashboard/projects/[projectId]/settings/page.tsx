"use client";
import React, { useState } from "react";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

import { Badge } from "@/components/ui/badge";
import { CardContent, Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/env.mjs";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

type Props = {
  params: { projectId: string };
};

const mockTeams = [
  {
    id: "1",
    name: "Team 1",
  },
  {
    id: "2",
    name: "Team 2",
  },
  {
    id: "3",
    name: "Team 3",
  },
  {
    id: "4",
    name: "Team 4",
  },
];

const project = {
  name: "Project 1",
  teamId: "1",
};

const ProjectSettingsPage = ({ params, ...props }: Props) => {
  // const { data: teams } = useQuery<
  //   {
  //     id: string;
  //     name: string;
  //   }[]
  // >({
  //   queryKey: ["teams", params.projectId],
  //   suspense: true,
  //   queryFn: async () =>
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //     await fetch(`$localhost:8080?projectId=${params.projectId}`).then((res) =>
  //       res.json(),
  //     ),
  //   select(data) {
  //     return data.map((team) => ({
  //       id: team.id,
  //       name: team.name,
  //     }));
  //   },
  //   onError(error) {
  //     toast({
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //       title:
  //         "Error: " +
  //         (error instanceof Error ? error.message : "fetch teams failed"),
  //       description: "Failed to fetch teams.",
  //       variant: "destructive",
  //     });
  //   },
  // });

  const [selectedTeam, setSelectedTeam] = useState(project.teamId);

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Project ${params.projectId}`}
        text="Explore and manage project details."
      />
      <Card className="w-full">
        <CardContent className="flex flex-col gap-2 p-4">
          {/* field to change project name */}
          {/* select menu to assign team */}
          <div className="flex w-full flex-row items-center justify-between">
            <h3 className="text-lg font-semibold">Project Name</h3>
            <Input className="w-1/3" placeholder={project.name} />
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <h3 className="text-lg font-semibold">Assigned Team</h3>
            <Select
              defaultValue={selectedTeam}
              onValueChange={setSelectedTeam}
              value={selectedTeam}
            >
              <SelectTrigger className="w-1/3">
                <SelectValue>Team</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {mockTeams?.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
};

export default ProjectSettingsPage;
