const productModel = require("../models/productModel");

// Service: getProducts
exports.getProducts = async () => {
    try {
        const products = await productModel.find();  // Query the database for products
        if (!products || products.length === 0) {
            return [];  // Return empty array if no products are found
        }
        return products;
    } catch (error) {
        console.log("Error in service:", error);
        throw new Error("Database query failed");  // Throw error so it can be caught by the controller
    }
};

exports.addProduct = async (name, price, category, subcategory, style, image) => {
    try {
        // Assuming 'image' is coming from the request (e.g., req.file)
        const newProduct = new productModel({
            name,
            price,
            category,
            subcategory,
            style,
            image: `http://localhost:5000/uploads/${image.filename}`
        });

        await newProduct.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}



exports.checkStock = async (quantity, productID) => {
    try {
        const product = await productModel.findById(productID)
        return product.quantity >= quantity;
    }
    catch (error) {
        console.log(error);
    }
}

exports.checkProduct=async(productID)=>
{
    try {
        const product=await productModel.findById(productID);
        return !!product;
    } catch (error) {
        console.log(error);
    }
}

exports.getProduct=async(productID)=>
    {
        try {
            const product =await productModel.findById(productID);
            return product;
        } catch (error) {
            return false;
        }
    }



    exports.getProductsByCategory = async (category) => {
        try {
            console.log(`Fetching products for category: ${category}`);  // Log the category
    
            // Query the products based on the category
            const products = await productModel.find({ category });
    
            if (products.length === 0) {
                console.log(`No products found for category: ${category}`);  // Log when no products are found
            }
    
            return products;
        } catch (error) {
            console.error('Error during database query:', error);  // Log the actual error
            throw new Error('Database query failed');
        }
    };
    