const express=require('express')
const router=express.Router()
const userController=require('../controller/user')

router.post('/newuser',userController.postUser)

module.exports =router