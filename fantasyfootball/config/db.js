const mongoose = require('mongoose');

const connectDB = async (url) => {
    if (!url) {
        throw new Error('MONGO_URL not provided');
    }

    await mongoose.connect(url);
    console.log('MongoDB connected');
};

module.exports = connectDB;