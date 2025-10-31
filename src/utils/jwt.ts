import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'dev_secret'

export function signToken(payload: object, expiresIn = '7d') {
  return jwt.sign(payload, SECRET, { expiresIn })
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as any
}
