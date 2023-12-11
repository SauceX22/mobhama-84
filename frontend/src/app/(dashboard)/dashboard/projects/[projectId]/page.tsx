import React from "react";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

type Props = {
  params: { projectId: string };
};

const ProjectDetailsPage = ({ params, ...props }: Props) => {
  return (
    <DashboardShell>
      <DashboardHeader
        // TODO get the project name using id
        heading={`Project ${params.projectId}`}
        text="Explore and manage project details."
      />
      <div className="grid gap-10">tests</div>
    </DashboardShell>
  );
};

export default ProjectDetailsPage;
