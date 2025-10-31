import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable')

let cached = globalThis as any

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.mongoose.conn) return cached.mongoose.conn
  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose.connect(MONGODB_URI).then(m => m)
  }
  cached.mongoose.conn = await cached.mongoose.promise
  return cached.mongoose.conn
}
