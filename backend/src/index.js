// File: backend/src/index.js
import express from 'express'
// Importing the auth routes
import authRoutes from './routes/auth.route.js'
// Importing dotenv for environment variables
import dotenv from 'dotenv'
// Importing the database connection function
import { connectToDatabase } from './lib/db.lib.js'
// Importing cookie-parser for handling cookies
import cookieParser from 'cookie-parser';
// Importing message routes
import messageRoutes from './routes/message.route.js'
// Importing the cors middleware
import cors from 'cors';
const app = express()
const PORT = process.env.PORT || 1337


app.use(express.json()) // Middleware to parse JSON bodies
app.use(cookieParser()) // Middleware to parse cookies
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the client URL
  credentials: true, // Allow cookies to be sent with requests
}))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectToDatabase()
})

dotenv.config()