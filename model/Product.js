const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String ,
        required: true
    } ,
    rating: {
        type: Number,
        default: 2.5
    } ,
    price: {
        type: Number ,
        required: true 
    } ,
    company: {
        type: String ,
        enum: {
            values: ['Godrej Interio','Durian' ,'Usha','Pepperfry'] ,
            message: '{VALUE} is not supported'
        }
    } ,
    featured: {
        type: Boolean,
        default: false
    } ,
    craetedAt: {
        type: Date,
        default: Date.now()
    }
})

const Product = mongoose.model('product' , ProductSchema);
module.exports = Product;