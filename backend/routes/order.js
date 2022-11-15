import  Router  from "express";
const router= Router();
import {isAuthenticatedUser,authorizeRoles} from'../middlewares/auth.js'
import {newOrder,getSingleOrder,myOrders,allOrders,updateOrder,deleteOrder}  from '../controllers/orderController.js';

router.post('/order/new',isAuthenticatedUser,newOrder);
router.get('/orders/:id',isAuthenticatedUser,getSingleOrder)
router.get('/orders/me',isAuthenticatedUser,myOrders)

router.get('/admin/orders/',isAuthenticatedUser,authorizeRoles('admin'),allOrders)
router.put('/admin/order/:id',isAuthenticatedUser,authorizeRoles('admin'),updateOrder);
router.delete('/admin/order/:id',isAuthenticatedUser,authorizeRoles('admin'),deleteOrder);

export default router;