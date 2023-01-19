import Product from '../models/product.js'
import mongoose from 'mongoose';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFeatures from '../utils/apiFeatures.js';
//create new product 
const newProduct= async (req,res,next)=>{
    req.body.user=req.user.id;
    try{
       const product= await Product.create(req.body);
       res.status(201).json({
           success:true,
           product
        })
    } 
  catch(error){
  
  
  console.log(error)}

}
// Get all products 
const getProducts = async (req,res)=>{
    const resPerPage = 8;
    const productsCount=await Product.countDocuments();
    const apiFeatures= new APIFeatures(Product.find(),req.query)
               .search()
               .pagination(resPerPage)
    let products=await apiFeatures.query;
    //console.log(products)
    setTimeout(()=>{
        res.status(200).json({
            success: true,
            productsCount,
            resPerPage,
            products
        })
    },2000)
    
} 
//Get single product details => /api/v1/product/:id
const getSingleProduct=async(req,res,next)=>{
    const product =await Product.findById(req.params.id);
    if(!product){
        next(new ErrorHandler('Product not found',404))
    }
    res.status(200).json({
        success:true,
        product
    })
}

// update Product => /api/v1/product/:id
const updateProduct=async(req,res)=>{
    let product= await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
    product= await Product.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success:true,
        product
    })

}

// Delete Product 
const deleteProduct=async(req,res) => {
    const product= await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })


}
// create new review => /api/v1/review
const createProductReview = async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

}
//get product reviews => /api/v1/reviews
const getProductReviews=async(req,res,next)=>{
    const product=await Product.findById(req.query.id);
    res.status(200).json({
        success:true,
        reviews: product.reviews

    })
}
//delete product reviews => /api/v1/reviews
const deleteReview=async(req,res,next)=>{
  
    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
}

export { getProducts, newProduct,updateProduct }
export {getSingleProduct,deleteReview}  
export { deleteProduct,createProductReview,getProductReviews}
