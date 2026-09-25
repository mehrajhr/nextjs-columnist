"use server";

import { cookies } from "next/headers";

type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const loginAction = async (
  prevState: LoginState,
  formData: FormData,
) => {
  //   console.log(fromData);
  console.log(prevState, "Prevstate");

  const email = formData.get("email");
  const password = formData.get("password");

  //   console.log(email, password);

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.API_BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: LoginState = await res.json();

  console.log(result);

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  return result;
};
