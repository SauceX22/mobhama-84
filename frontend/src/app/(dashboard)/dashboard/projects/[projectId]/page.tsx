import React from "react";

type Props = {
  params: { projectId: string };
};

const ProjectDetailsPage = ({ params, ...props }: Props) => {
  return <div>{params.projectId}</div>;
};

export default ProjectDetailsPage;
