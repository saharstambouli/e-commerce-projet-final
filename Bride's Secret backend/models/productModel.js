const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        unique: true,
    },
    price:
    {
        type: Number,
        
    },
     onSale:
    {
        type: Number
    },
    image:
    {
        type: String
    },
    
    category: {
        type: String,
        enum: ['rent', 'sale'], 
        required: true
    },
    subcategory: {
        type: String,
        enum: ['mariage', 'oriental', 'cocktail'], 
        required: true
    },
    style:
    {
        type: String    // sirene cloche simple chargé 
    },
    quantity: {
        type: Number,
        
    },
},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('product', productSchema);