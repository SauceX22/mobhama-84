"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import axios from "axios";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("username", {
      username: data.username.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") ?? "/dashboard",
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your username",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await axios.get("http://localhost:8080/login", {
              params: {
                username: "Hamoud",
              },
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                  "Origin, X-Requested-With, Content-Type, Accept, Host, Authorization, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin",
                
              },
              // Add other necessary fields if needed
            });

            // Check if the response is successful and return user data
            if (response.status === 200) {
              console.log(response.data);
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const user = response.data;
              return Promise.resolve(user);
            } else {
              return Promise.resolve(null);
            }
          } catch (error) {
            // Handle errors and return null
            console.error("Error during login:", error);
            return Promise.resolve(null);
          }
        }}
      > */}
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              {...register("username")}
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message ?? "Something went wrong."}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Username
          </button>
        </div>
      </form>
    </div>
  );
}
