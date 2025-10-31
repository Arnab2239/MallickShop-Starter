import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable')

let cached = globalThis as any

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null }
}
