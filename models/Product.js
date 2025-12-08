import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: {type:String, required: true, ref:"user"},
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Array, required: true },
    price: { type: Number, required: true },
    Category: { type: String, required: true },
    data: { type: Number, default: Date.now }

})

const Product = mongoose.models.product || mongoose.model('product', productSchema);

export default Product