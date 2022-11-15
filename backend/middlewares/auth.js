import user from "../models/user.js"

import  Jwt  from "jsonwebtoken"
// checks if user is authenticated or not 
const isAuthenticatedUser = async(req,res, next)=>{
const { token }= req.cookies
if (!token) {
    res.status(401).json({ error:"login first to access this ressource"})

}
const decoded= Jwt.verify(token, process.env.JWT_SECRET)
req.user=await user.findById(decoded.id);
next()
}


//Handling user roles
const authorizeRoles=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403).json({
              message:`Role (${req.user.role})is not allowed to access this ressource`     })
        }
        next();
    
    }
}
export { isAuthenticatedUser,authorizeRoles};