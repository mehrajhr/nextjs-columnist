"use server";

import { cookies } from "next/headers";

export const refreshAccessToken = async () => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh token not found",
    };
  }

  const res = await fetch(
    `${process.env.API_BACKEND_URL}/api/auth/refresh-token`,
    {
      headers: {
        Authorization: `${refreshToken}`,
      },
      method: "POST",

      cache: "no-cache",
    },
  );

  const result = res.json();

  console.log(result);

  return result;
};
