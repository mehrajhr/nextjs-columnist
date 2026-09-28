"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState, useEffect } from "react";
import { registerAction } from "../_actions/authAction";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, false);
  const router = useRouter();

  useEffect(() => {
    if (!state || pending) {
      return;
    }

    if (state.success) {
      toast.success(state.message || "Account created successfully!");
      router.replace("/login"); // Redirect to login page after successful registration
    } else {
      toast.error(state.message || "Registration failed");
    }
  }, [state, pending, router]);

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="John Doe"
            required
          />
        </div>
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
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profilePhoto">Profile Photo URL (Optional)</Label>
          <Input
            name="profilePhoto"
            type="url"
            placeholder="https://example.com/photo.jpg"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        {pending ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;