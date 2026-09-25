"use server";

export const loginAction = async (formData: FormData) => {
  //   console.log(fromData);

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

  const result = await res.json();

  console.log(result);
};
