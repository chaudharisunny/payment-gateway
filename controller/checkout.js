require('dotenv').config()
const Stripe=require("stripe")(process.env.Stripe_Secret_key)
const Cart=require('../model/cart')

const checkoutPayment=async(req,res)=>{

    const{userId}=req.body
    
    try {
        const cart=await Cart.findOne({userId}).populate("items.productId"); 
        if(!cart||cart.items.length===0)return res.status(400).json({error:"cart is item empty"})

            const session=await Stripe.checkout.sessions.create({
                payment_method_types:["card"],
                line_items: cart.items.map(item => ({
                    price_data: {
                        currency: "INR",
                        product_data: { name: item.productId.name },
                        unit_amount: item.productId.price * 100,
                    },
                    quantity: item.quantity,
                })),
                mode: "payment",
            success_url: `https://localhost:3000/success.html`,
            cancel_url: `https://localhost:3000/cancel.html`,
        });
        res.json({ id: session.id });         
    } catch (error) {
        console.log(error)
      
        
        res.status(500).json({error:error.message}) 
    }
}


module.exports={checkoutPayment}
