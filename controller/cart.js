
const Cart=require('../model/cart'); 


const addCart=async(req,res)=>{
    
    const { userId, productId,  price, quantity } = req.body;

    if (!userId || !productId || !price || !quantity) {
        return res.status(400).json({ error: "All fields (userId, productId, price, quantity) are required" });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
        }

        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += Number(quantity);
        } else {
            cart.items.push({ productId, price: Number(price), quantity: Number(quantity) });
        }

        cart.totalPrice = cart.items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const removeCart=async(req,res)=>{
    const {userId,productId}=req.body; 

    try {
        let cart=await Cart.findOne({userId}) 
        if(!cart)
            return res.status(400).json({message:'cart not found'}); 
            cart.items=cart.items.filter(item=>item.productId !=productId) 
            cart.totalPrice=cart.items.reduce((sum,item)=> sum + item.price * item.quantity,0); 
            
            await cart.save();
            res.json(cart);

        

    } catch (error) {
        console.log(error);
        
        res.status(500).json({error:error.message})
    }
}

const clearCart=async(req,res)=>{
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "userId is required" });
    }

    try {
        const deletedCart = await Cart.findOneAndDelete({ userId });

        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports={addCart,removeCart,clearCart}