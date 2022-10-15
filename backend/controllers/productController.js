import Product from '../models/product.js'
import mongoose from 'mongoose';
//create new product 
const newProduct= ()=>{
    /* try{
        const product= await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
         })
     } 
   catch(error){
    res.status(404).json({
        error
            })
   }*/
   console.log("mariem")
}
const getProducts = async (req,res)=>{
     res.status(200).json({
        success:true,
        message: 'This route will show all products in database'

     })
}
export { getProducts, newProduct }  