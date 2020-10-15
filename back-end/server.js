import express from 'express'
import dotenv from 'dotenv'
import {notFound,errorHandler} from './middleware/middleware.js'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoute from './routes/productRoute.js'

dotenv.config()
connectDB()
const app = express()



app.get('/',(req,res)=>{
    res.send('Api')
})
app.use('/api/products',productRoute)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`server ${process.env.NODE_ENV} ${PORT}`.yellow.bold))