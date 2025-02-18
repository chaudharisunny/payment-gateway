const { createToken } = require('../middleware/createToken')
const User=require('../model/user')
const bcrypt=require('bcrypt')

const postUser=async(req,res)=>{
    try {
        const{username,email,password}=req.body 
        if(!username,!email,!password){return res.status(400).json({message:'every field required'})}

        const newUser=await User.create({username,email,password})
        return res.status(201).json(newUser)
    } catch (error) {
        
        res.status(500).json({message:error})
    }
}

const loginUser=async(req,res)=>{
    try {
        const{email,password}=req.body 
        const user =await User.findOne({email:email}) 
        if(!user){return res.status(400).json({message:'invalid credential'})}
        const isPassword=await user.comparePassword(password)
        if(!isPassword){return res.json.status(400).json({message:'invalid email and password'})}

        const token=createToken(user)
        res.status(200).json({message:'login succssfull',token})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message:error})
    }
}
module.exports={postUser,loginUser}