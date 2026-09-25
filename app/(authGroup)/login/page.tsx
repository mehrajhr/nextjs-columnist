import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "../_components/LoginForm";
import LoginButton from "../_components/LoginButton";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
        </CardHeader>
        <CardContent>
          <LoginForm></LoginForm>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <LoginButton></LoginButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
