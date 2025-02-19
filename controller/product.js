const Product=require('../model/product')

const allProduct=async(req,res)=>{
    const allproduct=await Product.find()
     res.status(200).json({data:allproduct})
}
const newProduct=async(req,res)=>{
    try {
        const{name,desc,price}=req.body 
        if(!name,!desc,!price){return res.status(400).json({message:'every fields required'})}
        const createProduct=await Product.create({name,desc,price})
        res.status(200).json(createProduct) 
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
   
}

const editProduct=async(req,res)=>{
    try {
        const{id}=req.params 
        const{name,desc,price}=req.body 
        const existingProd=await Product.findById(id)
        if(!existingProd){
            res.status(400).json({message:'id is not found'})
        }
         
        const updateProduct=await Product.findByIdAndUpdate(id,{name,desc,price},{new:true})
       return  res.status(201).json({data:updateProduct})    
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
    
}

const deleteProduct=async(req,res)=>{
    try {
        const{id}=req.params 

        const existingProd=await Product.findById(id)
        if(!existingProd){
           return res.status(400).json({message:'id is not found'})
        }
        const deleteProd = await Product.findByIdAndDelete(id)
        return res.status(200).json({message:"product is successfully deleted",data:deleteProd})
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}
module.exports={allProduct,newProduct,editProduct,deleteProduct}