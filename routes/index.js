const express=require('express')
const router=express.Router()

const userController=require('../controller/user')
const productController=require('../controller/product')
const cartController=require('../controller/cart')
const auth = require('../middleware/auth')

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
module.exports =router