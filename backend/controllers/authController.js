import User from '../models/user.js';
import mongoose from 'mongoose';
//import ErrorHandler from '../utils/errorHandler.js';
//import catchAsyncError from '../middlewares/catchAsyncErrors.js'
import sendToken from '../utils/jwtToken.js';
import sendEmail from '../utils/sendEmail.js';
//register a user => /api/v1/register

const registerUser= async(req,res,next)=>{
    const { name, email, password}=req.body;
    try{
        const user=await User.create({
            name,  
            email,
            password,
            avatar:{
                public_id: 'download_qzakhe',
                url: 'https://res.cloudinary.com/dbj5bqwq3/image/upload/v1666096660/avatars/download_qzakhe.png' 
            }
                }) 

                sendToken(user, 200,res)
    }
    catch(error){
        console.log(error);
        res.status(404).json({
            success:false,
            error
        })
    }
    
    
    
    
}
// Login user => /api/v1/login
    const loginUser=async (req,res,next)=>
    {   
            const {email, password}=req.body;
            console.log(email,password)
        
    // checks if email and password is entered by user
    if (!email || !password ){
        console.log("erreur")
        res.status(400).json({
            success:false,
            error
        })    }
   
    //finding user in database
    const user=await User.findOne( {email}).select('+password')
    if (!user){
        res.status(401).json({
           success:false
        }) 
    }
    //checks if password is correct or not
    const isPasswordMatched= await user.comparePassword(password);
    if(!isPasswordMatched){
         res.status(401).json({
            success:false
        }) ;
    }   
    sendToken(user, 200,res)

}
// Get currently logged in user details => /api/v1/me
const getUserProfile= async (req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user 
    })
}
// Update/Change password => /api/v1/password/update
const updatePassword=async(req,res,next)=>{
    const user=await User.findById(req.user.id).select('+password')
    // Check previous user password
   const isMatched=await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        console.log()
        res.status(400).json({
               error:'L\'ancien mot de passe que vous avez entré est incorrect'
                    })
    
                }
    user.password=req.body.password; 
    await user.save();
    sendToken(user,200,res);
}
//Forgot password => /api/v1/password/forgot
const forgotPassword= async(req,res,next)=>{
    const user= await User.findOne({email: req.body.email})
        if(!user){
        res.status(400).json({
            message:"user not found with this email"
        })
        }
        //get reset token
        const resetToken= user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false})

        // Create reset password url
        const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
        const message=`Your password reset token is as follow:\n\n${resetUrl}\n\n If you have not requested this email,then ignore it`;
        try{
                  await sendEmail({
                    email: user.email,
                    subject: 'ShopIT Password Recovery',
                    message
                  })
                  res.status(200).json({
                    success:true,
                    messag:`Email sent to: ${user.email}`
                  })
        }catch(error){
          user.resetPasswordToken=undefined;
          user.resetPasswordExpire=undefined; 
          await user.save({ validateBeforeSave: false});
          return next(res.status(500).json({message:error}))

        }
}        
//Update user profile => /api/v1/me/update
const updateProfile=async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    }
    //update avatar:TODO

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success:true,
    })
}
// logout user => /api/v1/logout
const logout=async(req,res,next)=>{
    res.cookie('token',null,{
        expires:  new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
}
//Admin Routes
//Get all users => /api/v1/admin/users
const allUsers=async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users
    })
}
//Get user details => /api/v1/admin/user/:id
const getUserDetails=async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        res.status(404).json({
            error:`User  not found with id: ${req.params.id} `
        })}
        res.status(200).json({
            success:true,
            user
        })
    
}
// Update user profile => /api/v1/admin/user/:id
const updateUser=async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role: req.body.role
    } 
    //update avatar:TODO

    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success:true,
    })
}
//delete user => /api/v1/admin/user/:id
const deleteUser=async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        res.status(404).json({
            error:`User  not found with id: ${req.params.id} `
        })}
        // Remove avatar from cloudinary TODO
        await user.remove();
        res.status(200).json({
            success:true
        })
    
}
export {registerUser,loginUser,logout,getUserProfile,forgotPassword,updatePassword,deleteUser,updateProfile,allUsers,getUserDetails,updateUser}