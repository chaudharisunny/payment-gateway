const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true 
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product",
                required:true 
            },
            price:{
                type:Number,
                required:true 
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }
    ],
    totalPrice:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("cart",cartSchema)