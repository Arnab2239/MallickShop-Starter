import jwt, { Secret, SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as Secret;

export function signToken(payload: object, expiresIn = '7d') {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
