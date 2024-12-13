import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  jwtPayload: {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string;
    isActive: boolean;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
