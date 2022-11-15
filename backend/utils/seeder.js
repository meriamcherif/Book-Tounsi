import Product from "../models/product.js";
import dotenv from 'dotenv'
import connectDB from '../app.js';
import products from "../data/product";

//connectDB();
const seedProducts = async() =>{
    try{
        await Product.deleteMany();
        console.log("products are deleted");

        await Product.insertMany(products)
        console.log('All products are added');
    }
    catch(error){
     console.log(error)
    }

}