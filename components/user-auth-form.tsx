"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/validations/auth";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Icons } from "./icons";
import Cookies from "js-cookie";

type FormData = z.infer<typeof userAuthSchema>;

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const login = await authService.login(data.email, data.password);
    setIsLoading(false);
    if (!login.error) {
      const user = {
        "name": login.name,
        "username": login.username
      }
      localStorage.setItem("user",JSON.stringify(user))
      Cookies.set("access_token", login.token, {
        sameSite: "Lax",
        secure: true,
        expires: 30,
      });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: login.error,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
    >
      <Input type="email" placeholder="Email" {...register("email")} />
      <Input type="password" placeholder="Password" {...register("password")} />
      <Button disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>
      {errors?.email && (
        <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
      )}
    </form>
  );
}
