import express from 'express'
const router = express.Router()
import { checkoutController } from '../controllers/extensions.controller';

router.get('/getAddresses',checkoutController);
router.get('/wishlist/list',)
router.post('/wishlist/add',)
router.delete('/wishlist/remove',)

export default router