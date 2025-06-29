import express from 'express'
import dotenv from 'dotenv'
import cookieParse from 'cookie-parser'
import cors from 'cors'

import authRoute from './routes/authRoute.js'
import taskRoute from './routes/taskRoute.js'
import { connectDB } from './lib/connectDB.js'
import { protectedRoute } from './middleware/protectedRoute.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT
console.log("hello users")

app.use(cookieParse())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())



app.use('/api/auth', authRoute)
app.use('/api/task', protectedRoute, taskRoute)



app.listen(PORT, () => {
    console.log(`listerning at port ${PORT}`)
    connectDB()
})
