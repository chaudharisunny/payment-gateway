const express=require('express')
const router=express.Router()
const userController=require('../controller/user')
const productController=require('../controller/product')

router.post('/newuser',userController.postUser)
router.post('/login',userController.loginUser)

router.get('/allproduct',productController.allProduct)
router.post('/newproduct',productController.newProduct)
router.put('/updateproduct/:id',productController.editProduct)
router.delete('/deleteproduct/:id',productController.deleteProduct) 


module.exports =router