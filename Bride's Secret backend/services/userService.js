const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const userCart= require("../models/userCart");

const bcrypt = require('bcrypt');

exports.checkUserExists = async (email) => {
    try {
        const user = await userModel.findOne({ email: email });

        return !!user;
    } catch (error) {
        console.log(error);
    }
};

exports.register =async (UserName,email,password) => {
 try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ UserName, email, password: hashedPassword });
    await newUser.save();
    return true;

 }

 catch (error) {
     console.log(error);
 }

}

exports.getuserbyID =async(id ) => {

    try {
  const user = await userModel.findById(id).select('UserName email password');
return user ; 
    }
    catch(error ) {

        console.log(error)
    }
}

exports.updateUser=async (email,key,value)=>
    {
        try
        {
            const user=await userModel.findOne({email});
            user[key]=value;
            await user.save();
            return true;
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
    }
    
    
    exports.getUserbyProp=async(prop,value)=>
        {
            try
            {   const selections='firstName lastName email cart favorites'
                const user=await userModel.findById(id).select(selections);
                return user;
            }
            catch(error)
            {
                console.log(error);
            }
        }

    
        exports.addToCart = async (productID, quantity, userID) => {
            try {
                const user = await userModel.findById(userID);
                const product = await productModel.findById(productID);
                const existingSubCart = await userCart.findOne({ userID, product });
                if (existingSubCart) {
                    existingSubCart.quantity += quantity;
                    await existingSubCart.save();
                    return true;
                }
                const newSubCart = new userCart({ userID: user, product, quantity });
                await newSubCart.save();
                user.cart.push(newSubCart);
                await user.save();
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        }
        
        
        exports.toggleWishList = async (userID, productID) => {
            try {
                // Find the user by ID
                const user = await userModel.findById(userID);
                if (!user) {
                    console.log("User not found");
                    return null;
                }
        
                // Find the product in the user's favorites list
                const foundProduct = user.favorites.findIndex((product) => product._id.toString() === productID);
        
                let msg = "";
                
                // If the product is already in the favorites list, remove it
                if (foundProduct !== -1) {
                    user.favorites.splice(foundProduct, 1);
                    msg = "Removed from";
                } else {
                    // If the product is not in the favorites, add it
                    const product = await productModel.findById(productID);
                    if (!product) {
                        console.log("Product not found");
                        return null;
                    }
                    user.favorites.push(product);
                    msg = "Added to";
                }
        
                // Save the updated user document
                await user.save();
        
                // Return the updated favorites list to the frontend
                return user.favorites; // Returning the updated list for frontend
            } catch (error) {
                console.log("Error in toggleWishList:", error);
                return null;
            }
        };
        