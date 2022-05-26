const mongoose = require('mongoose');



const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const productSchema = new Schema({
    id: ObjectId,
    productName: { type: String },
    quantity: { type: Number },
})

module.exports = mongoose.model('product', productSchema);