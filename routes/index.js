const express=require('express')
const router=express.Router()

const userController=require('../controller/user')
const productController=require('../controller/product')
const cartController=require('../controller/cart')
const auth = require('../middleware/auth')
const orderController=require('../controller/order')
const checkoutController=require('../controller/checkout')

//user routes

router.post('/newuser',userController.postUser)
router.post('/login',userController.loginUser)

//product routes

router.get('/allproduct',productController.allProduct)
router.post('/newproduct',productController.newProduct)
router.put('/updateproduct/:id',productController.editProduct)
router.delete('/deleteproduct/:id',productController.deleteProduct) 

//cart routes
router.post('/addcart',auth,cartController.addCart)
router.post('/removecart',auth,cartController.removeCart)
router.post('/clearcart',auth,cartController.clearCart)

//order routes
router.get('/allOrder/:userId',orderController.allOrder)
router.post('/createOrder',orderController.createOrder)
router.get('/orderDetails/:orderId',orderController.detailOrder)
router.post("/cancelOrder/:orderId",orderController.cancelOrder)

//checkout
router.post('/checkout',checkoutController.checkoutPayment)
module.exports =router