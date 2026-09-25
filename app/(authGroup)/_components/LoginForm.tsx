"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import { loginAction } from "../_actions/authAction";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, false);
  const router = useRouter();

  useEffect(() => {
    if (!state || pending) {
      return;
    }

    if (state.success) {
      toast.success(state.message || "Login successfully");

    //   client side navigation redirecting 
      router.replace("/dashboard");
    } else {
      toast.error(state.message || "Login failed");
    }
  });
  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        {pending ? "Submitting..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
