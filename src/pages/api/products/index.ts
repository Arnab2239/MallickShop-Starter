import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/lib/db'
import Product from '@/models/Product'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if (req.method === 'GET') {
    const products = await Product.find().limit(50)
    return res.status(200).json({ ok: true, products })
  }
  if (req.method === 'POST') {
    const body = req.body
    const p = new Product(body)
    await p.save()
    return res.status(201).json({ ok: true, product: p })
  }
  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
