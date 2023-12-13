"use client";

import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React from "react";
import { api } from "@/trpc/react";

type Props = {
  //
};

const UsersManagementPage = (props: Props) => {
  const { data: members } = api.user.getUsers.useQuery();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Overview"
        text="Have a general look at this week's schedule."
      />
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
          <Button className="ml-auto" size="sm" variant="outline">
            Add New User
          </Button>
        </div>
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Avatar</TableHead>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members?.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        alt={`${member.name}'s avatar`}
                        src="/placeholder-avatar.jpg"
                      />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {member.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {member.role}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {member.status}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button className="ml-2" size="sm" variant="outline">
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardShell>
  );
};

export default UsersManagementPage;
