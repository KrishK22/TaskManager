import express from 'express'
import dotenv from 'dotenv'
import cookieParse from 'cookie-parser'

import { connectDB } from './lib/connectDB'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(cookieParse())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())



app.use('/api/auth', authRoute)






app.listen(PORT, () => {
    console.log(`listerning at port ${PORT}`)
    connectDB()
})