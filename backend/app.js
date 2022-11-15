import express from 'express';
import mongoose from 'mongoose'; 
import products from "./routes/product.js";
import auth from './routes/auth.js';
import order from './routes/order.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errors.js'
import * as dotenv from 'dotenv' 
import  'dotenv/config'
dotenv.config({path :'./config.env'})

const app= express();
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)

app.use(errorMiddleware);

const MONGO_URI="mongodb+srv://meriamcherif:meriamcherif@cluster0.lsfa7uu.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5001;
const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`))

    } catch(err){
            console.error("connection to mongoDB failed", err.message);
    } 
}
connectDB();
mongoose.connection.on("open", () => console.log("connection to database has been established successfully "))
mongoose.connection.on("error", (err) => console.log(err))
