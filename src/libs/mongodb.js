import mongoose from 'mongoose'

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB.')
  } catch (error) {
    console.log('MongoDB connection error: ', error)
  }
}

export { connectMongoDB }
