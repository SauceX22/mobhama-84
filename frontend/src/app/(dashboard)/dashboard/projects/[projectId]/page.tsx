"use client";
import React from "react";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

import { Badge } from "@/components/ui/badge";
import { CardContent, Card } from "@/components/ui/card";
import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard,
} from "@/components/ui/hover-card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { type Reservation } from "@/server/api";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { env } from "@/env.mjs";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import TimeTable from "@/components/timetable";

type Props = {
  params: { projectId: string };
};

const reservations: Reservation[] = [];

const ProjectDetailsPage = ({ params, ...props }: Props) => {
  const router = useRouter();

  // const { data: reservations } = useQuery<Reservation[]>({
  //   queryKey: ["reservations", params.projectId],
  //   suspense: true,
  //   queryFn: async () =>
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //     await fetch(`$localhost:8080?projectId=${params.projectId}`).then(
  //       (res) => res.json(),
  //     ),
  //   onError(error) {
  //     toast({
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //       title:
  //         "Error: " +
  //         (error instanceof Error
  //           ? error.message
  //           : "fetch reservations failed"),
  //       description: "Failed to fetch reservations.",
  //       variant: "destructive",
  //     });
  //   },
  // });

  return (
    <DashboardShell>
      <DashboardHeader
        // TODO get the project name using id
        heading={`Project ${params.projectId}`}
        text="Explore and manage project details."
      >
        <Button
          className="ml-4"
          variant="outline"
          onClick={() =>
            router.push(`/dashboard/projects/${params.projectId}/settings`)
          }
        >
          Edit Project Settings
          <Icons.settings className="ml-2 h-4 w-4 opacity-70" />
        </Button>
      </DashboardHeader>
      <div className="flex flex-col gap-4">
        <TimeTable />
        <section className="flex w-full flex-col gap-2 px-2 py-4">
          {reservations?.map((reservation, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <Card className="group relative overflow-hidden rounded-lg">
                  <CardContent className="bg-white p-4 dark:bg-gray-950">
                    <h3 className="text-lg font-semibold md:text-xl">
                      Reservation #{reservation.id}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Booked by {reservation.bookedBy.name}
                    </p>
                    <Badge className="mt-2">{reservation.status}</Badge>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent align="start" className="w-80" side="bottom">
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage
                    // alt={reservation.bookedBy}
                    // src={reservation.avatarSrc}
                    />
                    <AvatarFallback>
                      {reservation.bookedBy.avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      {reservation.bookedBy.name}
                    </h4>
                    <p className="text-sm">
                      Reservation details for booking #{reservation.id}.
                    </p>
                    <div className="flex items-center pt-2">
                      <Icons.calendar className="mr-2 h-4 w-4 opacity-70" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Booked on {format(reservation.bookedOn, "MMM d, yyyy")}
                      </span>
                    </div>
                    <Button className="mt-2">View Details</Button>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </section>
      </div>
    </DashboardShell>
  );
};

export default ProjectDetailsPage;
