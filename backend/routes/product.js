import  Router from "express";
import  {getProducts,deleteReview, newProduct,createProductReview, getSingleProduct,deleteProduct, updateProduct,getProductReviews } from '../controllers/productController.js';
import   {isAuthenticatedUser,authorizeRoles} from '../middlewares/auth.js';
const router= Router();


router.get('/products',isAuthenticatedUser,getProducts);
router.get('/product/:id',getSingleProduct);


router.post('/admin/product/new',isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.put('/admin/product/:id',isAuthenticatedUser,authorizeRoles('admin'),updateProduct);
router.delete('/admin/product/:id',isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);
router.put('/review',isAuthenticatedUser,createProductReview)
router.get('/review',isAuthenticatedUser,getProductReviews)
router.delete('/review',isAuthenticatedUser,deleteReview)

export default router;
