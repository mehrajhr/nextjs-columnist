"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  console.log(accessToken);

  if (!accessToken) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const res = await fetch(`${process.env.API_BACKEND_URL}/api/users/me`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  const result = res.json();

  console.log(result);

  return result;
};
