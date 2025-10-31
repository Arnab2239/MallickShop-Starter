import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { signToken } from '@/utils/jwt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if (req.method !== 'POST') return res.status(405).end()
  const { name, email, password } = req.body
  const exists = await User.findOne({ email })
  if (exists) return res.status(400).json({ error: 'Email already registered' })
  const hashed = await bcrypt.hash(password, 10)
  const user = new User({ name, email, password: hashed })
  await user.save()
  const token = signToken({ id: user._id, email: user.email })
  res.status(201).json({ ok: true, token })
}
