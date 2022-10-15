import  Router from "express";
import  {getProducts, newProduct} from '../controllers/productController.js';

const router= Router();


router.get('/products',getProducts);
router.post('/product/new',newProduct);
export default router;
