const mongoose = require('mongoose');

const Cart= new mongoose.Schema({
    
        user: {
            type: mongoose.Schema.Types.ObjectId
        },
        products: [
            {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            }
        ],
        updatedAt: {
            type: Date,
            default: Date.now
        }
     }
     );
  

module.exports = mongoose.model('Cart', Cart);