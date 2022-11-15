import  Router  from "express";
const router= Router();
import {registerUser, updateUser,deleteUser}  from '../controllers/authController.js';
import {loginUser}  from '../controllers/authController.js';
import {logout, forgotPassword,updatePassword,updateProfile,getUserDetails, getUserProfile,allUsers} from '../controllers/authController.js'
import {isAuthenticatedUser,authorizeRoles} from '../middlewares/auth.js';
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',logout);
router.post('/password/forgot',forgotPassword)
router.put('/password/update',isAuthenticatedUser,updatePassword)
router.get('/me',isAuthenticatedUser,getUserProfile)
router.put('/me/update',isAuthenticatedUser,updateProfile)

router.get('/admin/users',isAuthenticatedUser,authorizeRoles('admin'),allUsers)
router.get('/admin/user/:id',isAuthenticatedUser,authorizeRoles('admin'),getUserDetails)
router.put('/admin/user/:id',isAuthenticatedUser,authorizeRoles('admin'),updateUser)
router.delete('/admin/user/:id',isAuthenticatedUser,authorizeRoles('admin'),deleteUser)

export default router;
