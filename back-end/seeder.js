import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

//to import sample data


dotenv.config()

connectDB()
//dealing with database so asynchronous
const importData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
//Given an array of documents, insertMany() inserts each document in the array into the collection.
        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return {
                ...product,user: adminUser
            }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported'.green.inverse)
        process.exit()
    }catch(error){
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}
const destroyData = async () => {
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        

        console.log('Data Destroyed'.red.inverse)
        process.exit()
    }catch(error){
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}
/*The process.argv property returns an array containing the command-line arguments
 passed when the Node.js process was launched.  
 process.argv[0] == '/usr/local/bin/node'
process.argv[1] == '/Users/maerics/src/js/sum-process-argv.js'
process.argv[2] == '1'
process.argv[3] == '2'
process.argv[4] == '3'
Output:-1 2 3
elements 0 and 1 are arguments to the shell. The rest are arguments to node.js
 */
if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}