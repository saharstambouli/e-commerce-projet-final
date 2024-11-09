const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    UserName:
    {
        type: String,
        required: true,
    },

    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "product",
        required: false
    },
    favorites:
    {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "product",
        required: false
    },

    code:
    {
        type:String,
    }
},
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('user', userSchema);


