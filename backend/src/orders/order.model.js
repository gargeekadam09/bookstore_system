const mongoose = require ('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
       type: String,
        required: true,
    },
    address: {
        city: {
            type: String,
        required: true,
        },
        country: String,
        state: String,
        zipcode: String,
    },
    phone: {
        type: Number,
        required: true,
    },
    productIds: [
        {
            productId: {
                type: mongoose.Schema.Types.Mixed,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalPrice:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;