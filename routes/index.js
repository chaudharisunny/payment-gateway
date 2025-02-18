const express=require('express')
const router=express.Router()
const userController=require('../controller/user')

router.post('/newuser',userController.postUser)
router.post('/login',userController.loginUser)

module.exports =router