import express from 'express';
import mongoose from 'mongoose'; 
import products from "./routes/product.js";
import auth from './routes/auth.js';
import order from './routes/order.js'
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errors.js'
import * as dotenv from 'dotenv' 
import  'dotenv/config'
import cors from 'cors';
dotenv.config({path :'./config.env'})

const app= express();
app.use(cookieParser())
app.use(fileUpload())
app.use(cors())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())
//Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
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
