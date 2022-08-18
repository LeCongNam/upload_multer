const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Product = new Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    type: { type: String, required: true },
},{
    timestamps: true
});

module.exports = mongoose.model('Products', Product);

