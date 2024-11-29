const mongoose = require('mongoose');

const connecToMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/quicknotes'); // Removed deprecated options
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Connection error:', err);
    }
};

module.exports = connecToMongo;
