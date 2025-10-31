import jwt, { Secret, SignOptions } from "jsonwebtoken";

const SECRET: Secret = process.env.JWT_SECRET || "default_secret";

// ✅ use StringValue object type for expiresIn
export function signToken(payload: object, expiresIn: string = "7d") {
  const options: SignOptions = {
    expiresIn: expiresIn as unknown as number | undefined, // type cast fix for v9
  };
  return jwt.sign(payload, SECRET, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
