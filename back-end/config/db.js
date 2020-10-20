import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        //connecting to mongodb
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log(`Mongodb : ${conn.connection.host}`.cyan.underline)
    } catch(error){
        console.error(`${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB