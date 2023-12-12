import { CardSkeleton } from "@/components/card-skeleton";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

export default function DashboardProjectsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Projects"
        text="Manage account and website projects."
      />
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:p-6 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}
