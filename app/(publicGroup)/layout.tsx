import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import React from "react";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  //   console.log(user);
  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
};

export default PublicLayout;
