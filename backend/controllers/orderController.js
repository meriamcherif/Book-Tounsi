import order from '../models/order.js';
import Order from '../models/order.js';
import Product from '../models/product.js';


// Create a new order => /api/v1/order/new
const newOrder=async(req,res,next)=>{
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    }=req.body;

    const order= await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
   try{res.status(200).json({
    success:true,
    order
})}
catch(error){
 console.log(error)   
}
} 
//get single order => /api/v1/order/:id
const getSingleOrder=async(req,res,next)=>{
    const order= await Order.findById(req.params.id).populate('user','name email')
    if(!order){
        res.status(404).json({
            error:"no order with this ID"
        })
        }
    res.status(200).json({
        success:true,
        order
    })    
}
//get logged in user orders => /api/v1/order/me
const myOrders=async(req,res,next)=>{
    const orders= await Order.find({user:req.user.id})
    if(!orders){
        res.status(404).json({
            error:"no order with this ID"
        })
        }
    res.status(200).json({
        success:true,
        orders
    })    
}
// Get all orders => /api/v4/admin/orders/
const allOrders=async(req,res,next)=>{
    const orders= await Order.find();
    let totalAmount =0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
    
}
// update/process order only for admin => /api/v1/admin/order/:id
const updateOrder=async(req,res,next)=>{
    const order= await Order.findById(req.params.id);
   if (order.orderStatus=='Delivered'){
    return res.status(400).json({
        message:"you have already delivered this order"
    })
   }
   order.orderItems.forEach(async item =>{
    await updateStock(item.product,item.quantity)
   })
   order.orderStatus= req.body.status
   order.deliveredAt=Date.now()
   await order.save()

    res.status(200).json({
        success: true
    })
    
}
async function updateStock(id,quantity){
    const product= await Product.findById(id);
    product.stock=product.stock - quantity;
    await product.save({validateBeforeSave:false});
}
//delete single order => /api/v1/order/:id
const deleteOrder=async(req,res,next)=>{
    const order= await Order.findById(req.params.id).populate('user','name email')
    if(!order){
        res.status(404).json({
            error:"no order with this ID"
        })
        }
        await order.remove()
    res.status(200).json({
        success:true,
        order
    })    
}
export  {newOrder,getSingleOrder,myOrders,allOrders,updateOrder,deleteOrder}