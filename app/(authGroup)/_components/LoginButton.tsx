"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const LoginButton = () => {
  return (
    <>
      <Button type="submit" className="w-full">
        Login
      </Button>
      {/* <Button variant="outline" className="w-full">
        Login with Google
      </Button> */}
    </>
  );
};

export default LoginButton;
