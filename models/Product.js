// const mongoose = require('mongoose');

// const Product= new mongoose.Schema({ 
//     name: {
//     type: String,
//     required: true
// },
// description: {
//     type: String
// },
// price: {
//     type: Number,
//     required: true
// },
// category: {
//     type: String,
//     required: true
// },
// // images: [{
// //     type: String
// // }],
// createdAt: {
//     type: Date,
//     default: Date.now
// },
// updatedAt: {
//     type: Date
// },
// createdBy: {
//     type: mongoose.Schema.Types.ObjectId
// },
// updatedBy: {
//     type: mongoose.Schema.Types.ObjectId
// }
// }
// );
  
// module.exports = mongoose.model('Product', Product);

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    stock: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
