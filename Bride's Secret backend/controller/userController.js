
const userService = require("../services/userService");
const productService = require("../services/productService");



exports.register =async (req,res) => {

try {
 const {UserName,email,password} = req.body;
 if ( await userService.checkUserExists(email)){
    return res.status(409).json({message:'User with this email already exists'})
 }

 const registered= await userService.register(UserName,email,password);
 if (!registered){
    return res.status(400).json({message:'Registration error'})
 }
 return res.status(201).json({message:'User Registered Successfully'})


    
} catch (error) {
    console.log('Controller error : ' + error);
}

}

exports.getUser = async (req, res) => {
   try {
       const user = await userService.getuserbyID(req.userID);
       return res.status(200).send(user);
   }
   catch (error) {
       console.log('controller error : ' + error);
   }
}

exports.addToCart = async (req, res) => {
    try {
        const { productID, quantity } = req.body;

        if (! await productService.checkProduct(productID)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }
        if (! await productService.checkStock(quantity, productID)) {
            return res.status(400).json({ message: "Quantity out of stock" })
        }
        const added = await userService.addToCart(productID, quantity, req.userID)
        if (!added)
            return res.status(400).json({ message: "Error While adding to cart" })
        return res.status(201).json({ message: "Added to cart successfully" });
    }
    catch (error) {
        console.log(error);
    }
}



exports.toggleWishList = async (req, res) => {
    try {
        const { productID } = req.body
        if (! await productService.checkProduct(productID)) {
            return res.status(404).json({ message: "product not found" });
        }
        const toggled = await userService.toggleWishList(req.userID, productID);
        if (!toggled) {
            return res.status(400).json({ message: "Toggle Failed" });
        }
        return res.status(200).json({ 
            message: `Product ${productID} ${toggled ? 'added to' : 'removed from'} wishlist successfully`, 
            wishList: toggled 
        });
    } catch (error) {

    }
}