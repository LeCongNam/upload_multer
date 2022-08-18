const mongoose = require('mongoose')

const connect = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/products');
        console.log('Connect DB successfully');
    } catch (error) {
        console.log('Connect DB Failse: ', error);
    }
}


module.exports = { connect }