const User=require('../model/user')

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

module.exports={postUser}