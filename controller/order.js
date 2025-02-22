const Order=require('../model/order');
const Cart=require('../model/cart'); 
const mongoose=require('mongoose');

const allOrder= async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid userId format" });
    }

    try {
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOrder=async(req,res)=>{
    const {userId}=req.body 

    if (!userId){
        return res.status(400).json({message:'userId is required'})
    }

    
    try {
    const cart= await Cart.findOne({userId})
    
    if(!cart||cart.items.length===0){
        return res.status(400).json({message:"cart is empty"})
    }

    const order=new Order({
        userId,
        items:cart.items,
        totalPrice:cart.totalPrice,
        status:"pending"
    })

    await order.save()
    await Cart.findOneAndDelete({ userId });

    res.json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const detailOrder=async(req,res)=>{
    const {orderId}=req.params; 

    if(!mongoose.Types.ObjectId.isValid(orderId)){

    }

    try{
        const order=await Order.findById(orderId);

        if(!order){
            return res.status(404).json({error:'order not found'})
        }
        res.json(order)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const cancelOrder=async(req,res)=>{
    const { orderId } = req.params;

if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: 'Invalid orderId format' });
}

try {
    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({ error: "Order not found" });
    }

    if (order.status === "completed") {
        return res.status(400).json({ error: "Completed order cannot be cancelled" });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
} catch (error) {
    res.status(500).json({ message: error.message });
}

}
module.exports={allOrder,createOrder,detailOrder,cancelOrder}