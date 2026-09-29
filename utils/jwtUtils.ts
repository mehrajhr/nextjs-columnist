import jwt from "jsonwebtoken";

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken,
    };
  } catch {
    return {
      success: false,
      message: "Invalid Token",
    };
  }
};

export const jwtUtils = {
  verifyToken,
};
