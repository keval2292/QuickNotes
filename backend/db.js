const mongoose = require('mongoose');

const connecToMongo = async () => {
    try {
        await mongoose.connect('mongodb+srv://kevalnramanikr:ReCH9dOEEqJh4mah@cluster0.adhmz.mongodb.net/quicknote?retryWrites=true&w=majority&appName=Cluster0'); // Removed deprecated options
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Connection error:', err);
    }
};

module.exports = connecToMongo;
