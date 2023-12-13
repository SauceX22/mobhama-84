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
import { api } from "@/trpc/server";

type Props = {
  //
};

const UsersManagementPage = async (props: Props) => {
  const users = await api.user.getUsers.query();

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
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        alt={`${user.name}'s avatar`}
                        src="/placeholder-avatar.jpg"
                      />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.role}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.status}
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
