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

const app = express()
const PORT = process.env.PORT || 1337


app.use(express.json()) // Middleware to parse JSON bodies
app.use(cookieParser()) // Middleware to parse cookies


app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectToDatabase()
})

dotenv.config()