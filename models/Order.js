const mongoose = require('mongoose');

const Order= new mongoose.Schema({userId: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    // required: true
},
products: [
    {
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'Product',
        // required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    }
],
totalAmount: {
    type: Number,
    // required: true
},
status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
},
createdAt: {
    type: Date,
    default: Date.now
},
updatedBy: {
    type: mongoose.Schema.Types.ObjectId
}
}

);

module.exports = mongoose.model('User', Order);