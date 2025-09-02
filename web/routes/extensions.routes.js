import express from 'express'
const router = express.Router()
import { checkoutController, getCustomerWishlist, updateCustomerWishlist,deleteCustomerWishlist,deleteAllCustomerWishlist, getProducts } from '../controllers/extensions.controller.js';

router.get('/getAddresses',checkoutController);
router.get('/getProducts',getProducts)
router.get('/wishlist/listProducts',getCustomerWishlist)
router.patch('/wishlist/addProducts',updateCustomerWishlist)
router.delete('/wishlist/removeProducts',deleteCustomerWishlist)
router.delete('/wishlist/removeAllProducts',deleteAllCustomerWishlist)

export default router