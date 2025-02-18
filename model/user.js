const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();

    try {
        const saltRounds=10;
        this.password=await bcrypt.hash(this.password,saltRounds);
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}
module.exports=mongoose.model('users',userSchema)